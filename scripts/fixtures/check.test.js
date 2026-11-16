const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { checkChanges, digest, parseReviews } = require('./check');
const { generate, getFixtures } = require('./generate');

function repository(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'compass-fixtures-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const git = (...args) =>
    execFileSync('git', args, {
      cwd: root,
      env: {
        ...process.env,
        GIT_AUTHOR_NAME: 'Synthetic fixture test',
        GIT_AUTHOR_EMAIL: 'test@example.test',
        GIT_COMMITTER_NAME: 'Synthetic fixture test',
        GIT_COMMITTER_EMAIL: 'test@example.test',
        // Do not let a contributor's signing/hooks config affect test commits.
        GIT_CONFIG_COUNT: '3',
        GIT_CONFIG_KEY_0: 'commit.gpgsign',
        GIT_CONFIG_VALUE_0: 'false',
        GIT_CONFIG_KEY_1: 'core.hooksPath',
        GIT_CONFIG_VALUE_1: path.join(root, '.no-hooks'),
        GIT_CONFIG_KEY_2: 'core.autocrlf',
        GIT_CONFIG_VALUE_2: 'false',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    })
      .toString()
      .trim();
  const write = (file, contents) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), contents);
  };
  const reviews = (files = []) =>
    write(
      'scripts/fixtures/reviews.json',
      JSON.stringify({ version: 1, files })
    );
  const commit = () => {
    git('add', '--all');
    git('commit', '--quiet', '--allow-empty', '-m', 'Synthetic test snapshot');
    return git('rev-parse', 'HEAD');
  };
  git('init', '--quiet');
  generate(root);
  reviews();
  // Invalid JSON is deliberate: unchanged legacy resources must not be parsed.
  write('apps/web/public/test/legacy.json', 'legacy fixture placeholder');
  const base = commit();
  return { root, git, write, reviews, commit, base };
}

const file = 'apps/web/public/test/合成样例/data with spaces.json';
const data = '{"name":"Synthetic Person","email":"person@example.test"}\n';
const review = (contents = data, datasetPath = file) => ({
  path: datasetPath,
  sha256: digest(contents),
  kind: 'synthetic-sample',
  purpose: 'Exercise the review contract in an isolated test repository.',
  provenance: 'Manually authored; no exported or copied contributor records.',
  publicationBasis: 'Fictional identifiers and reserved example.test domain.',
});

test('generator is byte reproducible and detects manual edits', (t) => {
  const r = repository(t);
  assert.equal(generate(r.root, true), true);
  const generated = Object.keys(getFixtures())[0];
  r.write(generated, '{}');
  assert.equal(generate(r.root, true), false);
  generate(r.root);
  assert.equal(generate(r.root, true), true);
});

test('unchanged legacy data and unrelated code do not require review', (t) => {
  const r = repository(t);
  r.write('apps/web/src/example.ts', 'export {};');
  assert.deepEqual(checkChanges(r.root, r.base, r.commit()), {
    errors: [],
    checked: 0,
  });
});

test('new data fails without a review and passes with an exact hash', (t) => {
  const r = repository(t);
  r.write(file, data);
  assert.equal(checkChanges(r.root, r.base, r.commit()).errors.length, 1);
  r.reviews([review()]);
  assert.deepEqual(checkChanges(r.root, r.base, r.commit()), {
    errors: [],
    checked: 1,
  });
});

test('an existing review becomes stale when bytes change', (t) => {
  const r = repository(t);
  r.write(file, data);
  r.reviews([review()]);
  const base = r.commit();
  r.write(file, data + '\n');
  assert.match(checkChanges(r.root, base, r.commit()).errors[0], /hash/);
});

test('modifying an unclassified legacy dataset requires a review', (t) => {
  const r = repository(t);
  r.write('apps/web/public/test/legacy.json', '{}');
  assert.equal(checkChanges(r.root, r.base, r.commit()).errors.length, 1);
});

test('deleting legacy data needs no exception', (t) => {
  const r = repository(t);
  fs.unlinkSync(path.join(r.root, 'apps/web/public/test/legacy.json'));
  assert.deepEqual(checkChanges(r.root, r.base, r.commit()), {
    errors: [],
    checked: 0,
  });
});

test('renaming a legacy resource requires a destination review', (t) => {
  const r = repository(t);
  r.git(
    'mv',
    'apps/web/public/test/legacy.json',
    'apps/web/public/test/new.json'
  );
  assert.equal(checkChanges(r.root, r.base, r.commit()).errors.length, 1);
});

test('copying a legacy resource requires a destination review', (t) => {
  const r = repository(t);
  fs.copyFileSync(
    path.join(r.root, 'apps/web/public/test/legacy.json'),
    path.join(r.root, 'apps/web/public/test/copy.json')
  );
  assert.equal(checkChanges(r.root, r.base, r.commit()).errors.length, 1);
});

test('new fixture roots and non-JSON datasets are covered too', (t) => {
  const r = repository(t);
  r.write('apps/web/test-fixtures/new.csv', 'synthetic,value\n');
  assert.equal(checkChanges(r.root, r.base, r.commit()).errors.length, 1);
});

test('reviews cannot exempt changes to generated fixtures', (t) => {
  const r = repository(t);
  const generated = Object.keys(getFixtures())[0];
  r.write(generated, data);
  r.reviews([review(data, generated)]);
  assert.match(checkChanges(r.root, r.base, r.commit()).errors[0], /generator/);
});

test('generated fixtures cannot be deleted', (t) => {
  const r = repository(t);
  fs.unlinkSync(path.join(r.root, Object.keys(getFixtures())[0]));
  assert.match(checkChanges(r.root, r.base, r.commit()).errors[0], /missing/);
});

test('symlinks are rejected even with a matching target-text hash', (t) => {
  const r = repository(t);
  fs.mkdirSync(path.dirname(path.join(r.root, file)), { recursive: true });
  fs.symlinkSync('legacy.json', path.join(r.root, file));
  r.reviews([review('legacy.json')]);
  assert.match(
    checkChanges(r.root, r.base, r.commit()).errors[0],
    /regular file/
  );
});

test('oversized datasets fail even when their hash was reviewed', (t) => {
  const r = repository(t);
  const bytes = Buffer.alloc(25 * 1024 * 1024 + 1);
  r.write(file, bytes);
  r.reviews([review(bytes)]);
  assert.match(checkChanges(r.root, r.base, r.commit()).errors[0], /25 MiB/);
});

test('errors do not echo data values, filenames or malformed manifest text', (t) => {
  const r = repository(t);
  const secret = 'DO_NOT_PRINT_THIS_SYNTHETIC_SENTINEL';
  r.write(`apps/web/public/test/${secret}.json`, secret);
  let result = checkChanges(r.root, r.base, r.commit());
  assert.ok(result.errors.length);
  assert.ok(!JSON.stringify(result).includes(secret));
  r.write('scripts/fixtures/reviews.json', `{"broken":${secret}`);
  result = checkChanges(r.root, r.base, r.commit());
  assert.ok(result.errors.length);
  assert.ok(!JSON.stringify(result).includes(secret));
});

test('missing comparison history fails closed', (t) => {
  const r = repository(t);
  assert.ok(checkChanges(r.root, '0'.repeat(40), r.base).errors.length);
});

test('comparison uses the merge base when the target branch advances', (t) => {
  const r = repository(t);
  r.git('checkout', '-b', 'advanced-base');
  r.write('apps/web/public/test/base-only.json', '{}');
  const advancedBase = r.commit();
  r.git('checkout', '--detach', r.base);
  r.write('apps/web/src/example.ts', 'export {};');
  const head = r.commit();
  assert.deepEqual(checkChanges(r.root, advancedBase, head), {
    errors: [],
    checked: 0,
  });
});

test('CI depth-2 merge checkout works without checked-out public datasets', (t) => {
  const r = repository(t);
  r.write(file, data);
  r.reviews([review()]);
  const proposed = r.commit();
  r.git('checkout', '-b', 'merge-test', r.base);
  r.write('docs/base-only.md', 'A target branch change.');
  const base = r.commit();
  r.git('merge', '--no-ff', proposed, '-m', 'Proposed PR merge');
  const head = r.git('rev-parse', 'HEAD');
  const clone = fs.mkdtempSync(path.join(os.tmpdir(), 'compass-shallow-'));
  t.after(() => fs.rmSync(clone, { recursive: true, force: true }));
  execFileSync('git', [
    'clone',
    '--quiet',
    '--depth=2',
    '--no-checkout',
    `file://${r.root}`,
    clone,
  ]);
  execFileSync('git', [
    '-C',
    clone,
    'sparse-checkout',
    'set',
    'scripts/fixtures',
    'apps/web/test-fixtures',
  ]);
  execFileSync('git', ['-C', clone, 'checkout', '--quiet']);
  assert.equal(fs.existsSync(path.join(clone, file)), false);
  assert.equal(fs.existsSync(path.join(clone, '.git/shallow')), true);
  assert.deepEqual(checkChanges(clone, base, head), { errors: [], checked: 1 });
});

test('committed bytes are checked rather than uncommitted worktree contents', (t) => {
  const r = repository(t);
  r.write(file, data);
  const head = r.commit();
  r.reviews([review()]);
  assert.ok(checkChanges(r.root, r.base, head).errors.length);
});

test('review schema rejects broad, ambiguous, incomplete and duplicate entries', () => {
  for (const entry of [
    { ...review(), path: 'apps/web/public/test/*.json' },
    { ...review(), path: 'apps/web/public/test/../other.json' },
    { ...review(), path: 'outside.json' },
    { ...review(), kind: 'anything' },
    { ...review(), sha256: 'outdated' },
    { ...review(), publicationBasis: '' },
  ]) {
    assert.throws(() =>
      parseReviews(JSON.stringify({ version: 1, files: [entry] }))
    );
  }
  assert.throws(() =>
    parseReviews(JSON.stringify({ version: 1, files: [review(), review()] }))
  );
  assert.equal(
    parseReviews(
      JSON.stringify({
        version: 1,
        files: [{ ...review(), kind: 'runtime-data' }],
      })
    ).size,
    1
  );
});
