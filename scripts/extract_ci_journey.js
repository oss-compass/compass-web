/* eslint-disable */
// One-off extractor/generator: parse the embedded `const DATA = {...}` object
// from the v2 design HTML and emit ci-journey.json (per-day 8-段 journey data).
const fs = require('fs');
const path = require('path');

const BASE = path.join(
  __dirname,
  '..',
  'apps/web/src/modules/intelligent-analysis/DeveloperExperience/CiExperience',
);
const HTML = path.join(
  BASE,
  'CI 度量与改进 · CANN GitCode Action — v2 结构设计稿 20260718_files',
  'saved_resource.html',
);
const OUT = path.join(BASE, 'components/CiReport/ci-journey.json');

function extractData(src) {
  const marker = 'const DATA = {';
  const start = src.indexOf(marker);
  if (start < 0) throw new Error('DATA marker not found');
  let i = start + marker.length - 1;
  let depth = 0;
  let inStr = false;
  let strCh = '';
  let esc = false;
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

const DATA = extractData(fs.readFileSync(HTML, 'utf8'));

const warns = [];
const CELL_KEYS = ['stability', 'efficiency', 'interaction', 'cost'];

function transformStage(st, boardProblems, ctx) {
  for (const k of CELL_KEYS) {
    if (!(k in st.cells)) warns.push(`${ctx}: seg「${st.seg}」missing cell ${k}`);
  }
  const linked = (boardProblems || []).filter((p) => p.seg === st.seg);
  return {
    seg: st.seg,
    segscore: st.segscore,
    cells: st.cells,
    stats: (st.stats || []).map(([label, v]) => ({ label, v })),
    trend: st.trend,
    stages: st.stages || [],
    bare: st.bare || [],
    problems: linked,
  };
}

function transformRepo(repoKey, repo) {
  const boards = {};
  const segSignatures = new Set();
  for (const day of repo.days) {
    const b = repo.boards[day];
    if (!b) {
      warns.push(`${repoKey}: day ${day} listed but no board`);
      continue;
    }
    const ctx = `${repoKey}/${day}`;
    const segs = b.journey.map((s) => s.seg);
    segSignatures.add(segs.join(' | '));
    // orphan problem check
    for (const p of b.problems || []) {
      if (!segs.includes(p.seg)) warns.push(`${ctx}: problem.seg「${p.seg}」has no matching journey seg`);
    }
    boards[day] = {
      day,
      date: b.date,
      note: b.journey_note || '',
      scores: b.scores || null,
      stages: b.journey.map((st) => transformStage(st, b.problems, ctx)),
    };
  }
  if (segSignatures.size > 1) {
    warns.push(`${repoKey}: seg lists differ across days -> ${[...segSignatures].join(' /// ')}`);
  }
  return {
    signatures: [...segSignatures],
    repo: {
      projectName: repoKey === 'opsnn' ? 'ops-nn' : repoKey,
      workflow: repo.workflow,
      days: repo.days,
      boards,
    },
  };
}

const out = {};
const allSegs = new Set();
for (const r of Object.keys(DATA)) {
  const { signatures, repo } = transformRepo(r, DATA[r]);
  out[r] = repo;
  console.log(`\n== ${r} == days=${repo.days.length}`);
  signatures.forEach((s) => {
    console.log('  segs:', s);
    s.split(' | ').forEach((x) => allSegs.add(x));
  });
}

console.log('\nUNION seg names:', [...allSegs]);
console.log('\nWARNINGS (' + warns.length + '):');
warns.forEach((w) => console.log('  -', w));

fs.writeFileSync(OUT, JSON.stringify(out, null, 1), 'utf8');
console.log('\nWROTE', OUT, '(' + fs.statSync(OUT).size + ' bytes)');
