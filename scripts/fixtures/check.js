const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');
const path = require('node:path');
const { getFixtures } = require('./generate');

const roots = ['apps/web/public/test/', 'apps/web/test-fixtures/'];
const manifestPath = 'scripts/fixtures/reviews.json';
const maxBytes = 25 * 1024 * 1024;
const digest = (contents) =>
  createHash('sha256').update(contents).digest('hex');
const isDataset = (file) => roots.some((root) => file.startsWith(root));

function git(root, args) {
  return execFileSync('git', args, {
    cwd: root,
    maxBuffer: maxBytes,
    stdio: ['ignore', 'pipe', 'pipe'],
  });
}

function resolveCommit(root, ref) {
  return git(root, [
    'rev-parse',
    '--verify',
    '--end-of-options',
    `${ref}^{commit}`,
  ])
    .toString()
    .trim();
}

function readBlob(root, head, file) {
  const spec = `${head}:${file}`;
  // Bound the read before loading contents; do not print Git/JSON errors, which
  // can contain contributor identifiers, filenames or fragments of data.
  const entry = git(root, ['ls-tree', '-z', head, '--', `:(literal)${file}`])
    .toString()
    .split('\t')[0];
  if (!entry.startsWith('100644 blob ') && !entry.startsWith('100755 blob ')) {
    throw new Error('Expected a regular file.');
  }
  const size = Number(git(root, ['cat-file', '-s', spec]).toString());
  if (!Number.isSafeInteger(size) || size > maxBytes) {
    throw new Error('Dataset exceeds the 25 MiB review limit.');
  }
  return git(root, ['cat-file', 'blob', spec]);
}

function parseReviews(contents) {
  let manifest;
  try {
    manifest = JSON.parse(contents);
  } catch {
    throw new Error('Invalid dataset review manifest JSON.');
  }
  if (manifest?.version !== 1 || !Array.isArray(manifest.files)) {
    throw new Error('Expected review manifest version 1 and a files array.');
  }
  const reviews = new Map();
  for (const [index, entry] of manifest.files.entries()) {
    const file = entry?.path;
    if (
      typeof file !== 'string' ||
      !isDataset(file) ||
      file.includes('\\') ||
      /[\x00-\x1f\x7f*?\[\]]/.test(file) ||
      file.split('/').some((part) => !part || part === '.' || part === '..') ||
      reviews.has(file) ||
      !/^[a-f0-9]{64}$/.test(entry.sha256) ||
      !['synthetic-sample', 'runtime-data'].includes(entry.kind) ||
      ['purpose', 'provenance', 'publicationBasis'].some(
        (key) => typeof entry[key] !== 'string' || !entry[key].trim()
      )
    ) {
      throw new Error(
        `Invalid or duplicate dataset review entry #${index + 1}.`
      );
    }
    reviews.set(file, entry);
  }
  return reviews;
}

function checkChanges(root, baseRef, headRef) {
  let base, head, changed, reviews;
  try {
    base = resolveCommit(root, baseRef);
    head = resolveCommit(root, headRef);
    base = git(root, ['merge-base', base, head]).toString().trim();
    // No rename detection: moving/copying a legacy dataset to a new path must
    // receive the same review as an addition. Deletions do not need an exception.
    changed = git(root, [
      'diff',
      '--name-only',
      '--no-renames',
      '--diff-filter=ACMT',
      '-z',
      base,
      head,
      '--',
      ...roots,
    ])
      .toString()
      .split('\0')
      .filter(Boolean);
    reviews = parseReviews(readBlob(root, head, manifestPath));
  } catch {
    return {
      errors: [
        'Cannot read comparison commits or the dataset review manifest.',
      ],
      checked: 0,
    };
  }

  const errors = [];
  const generated = getFixtures();
  // These three small, known synthetic files are always checked. Existing
  // public/test resources are read only when included in the requested diff.
  for (const [index, [file, expected]] of Object.entries(generated).entries()) {
    try {
      if (!readBlob(root, head, file).equals(expected)) {
        errors.push(
          `Synthetic fixture #${index + 1} differs from its generator.`
        );
      }
    } catch {
      errors.push(`Synthetic fixture #${index + 1} is missing or unreadable.`);
    }
  }
  for (const [index, file] of changed.entries()) {
    if (Object.prototype.hasOwnProperty.call(generated, file)) continue;
    const label = `Changed dataset #${index + 1}`;
    const review = reviews.get(file);
    if (!review) {
      errors.push(`${label}: add an exact-path review in ${manifestPath}.`);
      continue;
    }
    try {
      if (digest(readBlob(root, head, file)) !== review.sha256) {
        errors.push(`${label}: review hash does not match the proposed bytes.`);
      }
    } catch {
      errors.push(
        `${label}: expected a readable regular file of at most 25 MiB.`
      );
    }
  }
  return { errors, checked: changed.length };
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length !== 4 || args[0] !== '--base' || args[2] !== '--head') {
    console.error('Usage: yarn fixtures:check --base <commit> --head <commit>');
    process.exitCode = 1;
  } else {
    const result = checkChanges(
      path.resolve(__dirname, '../..'),
      args[1],
      args[3]
    );
    result.errors.forEach((error) => console.error(error));
    console.log(`Dataset changes checked: ${result.checked}.`);
    process.exitCode = result.errors.length ? 1 : 0;
  }
}

module.exports = { checkChanges, digest, parseReviews };
