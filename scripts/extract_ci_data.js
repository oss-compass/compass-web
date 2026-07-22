/* eslint-disable */
// One-off extractor/generator: parse the embedded `const DATA = {...}` object
// from the v2 design HTML and emit ci-runtime-data.json / ci-opsnn-data.json
// (full per-day boards incl. matrices — the DailyDrilldown / drill-down source).
const fs = require('fs');
const path = require('path');

const BASE = path.join(
  __dirname,
  '..',
  'apps/web/src/modules/intelligent-analysis/DeveloperExperience/CiExperience'
);
const HTML = path.join(
  BASE,
  'CI 度量与改进 · CANN GitCode Action — v2 结构设计稿 20260718_files',
  'saved_resource.html'
);
const OUT = {
  runtime: path.join(BASE, 'ci-runtime-data.json'),
  opsnn: path.join(BASE, 'ci-opsnn-data.json'),
};

// board fields kept in CiRepoData.boards (drops journey/journey_note/scores,
// which live in ci-journey.json)
const BOARD_KEYS = [
  'date',
  'meta',
  'default_dim',
  'dims',
  'problems',
  'metrics',
  'diag',
  'matrices',
];

function extractData(src) {
  const marker = 'const DATA = {';
  const start = src.indexOf(marker);
  if (start < 0) throw new Error('DATA marker not found');
  let i = start + marker.length - 1;
  let depth = 0,
    inStr = false,
    strCh = '',
    esc = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) esc = false;
      else if (c === '\\') esc = true;
      else if (c === strCh) inStr = false;
      continue;
    }
    if (c === '"' || c === "'") {
      inStr = true;
      strCh = c;
      continue;
    }
    if (c === '{') depth++;
    else if (c === '}') {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  return JSON.parse(src.slice(start + marker.length - 1, i));
}

function pruneBoard(b) {
  const out = {};
  for (const k of BOARD_KEYS) {
    if (k in b) out[k] = b[k];
  }
  return out;
}

function transformRepo(repo) {
  const boards = {};
  for (const day of repo.days) {
    const b = repo.boards[day];
    if (!b) {
      console.log('  WARN day', day, 'listed but no board');
      continue;
    }
    boards[day] = pruneBoard(b);
  }
  return {
    workflow: repo.workflow,
    days: repo.days,
    boards,
    weekly: repo.weekly,
  };
}

const DATA = extractData(fs.readFileSync(HTML, 'utf8'));
for (const r of Object.keys(OUT)) {
  if (!DATA[r]) throw new Error('repo ' + r + ' missing in DATA');
  const repo = transformRepo(DATA[r]);
  fs.writeFileSync(OUT[r], JSON.stringify(repo, null, 1), 'utf8');
  console.log(
    r,
    '-> days=' + repo.days.length,
    JSON.stringify(repo.days),
    '(' + fs.statSync(OUT[r]).size + ' bytes)'
  );
}
