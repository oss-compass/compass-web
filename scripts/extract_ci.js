/* eslint-disable */
// ─────────────────────────────────────────────────────────────────────────
// CI 页面源数据提取器（可复用 · 一次解析产出三份 JSON）
//
// 用法：
//   node scripts/extract_ci.js                 # 自动从 rawdata/ 发现最新源
//   node scripts/extract_ci.js path/to/xxx.html # 显式指定 saved_resource.html
//
// 数据来源：设计稿页面里内嵌的 `const DATA = {...}` 对象。
// 持续更新流程：把新导出的「…_files/saved_resource.html」整份放进
//   apps/.../CiExperience/rawdata/ 下（可覆盖旧的，也可新增带日期的目录），
//   然后运行本脚本即可。脚本会自动挑选 rawdata/ 下最新的 *_files 目录。
//
// 产出（覆盖写入）：
//   1. ci-runtime-data.json / ci-opsnn-data.json —— 逐日看板（DailyDrilldown 数据源）
//   2. components/CiReport/ci-journey.json        —— 逐日旅程 / 权威 scores
// ─────────────────────────────────────────────────────────────────────────
const fs = require('fs');
const path = require('path');

const BASE = path.join(
  __dirname,
  '..',
  'apps/web/src/modules/intelligent-analysis/DeveloperExperience/CiExperience'
);
const RAWDATA_DIR = path.join(BASE, 'rawdata');

const OUT_DATA = {
  runtime: path.join(BASE, 'ci-runtime-data.json'),
  opsnn: path.join(BASE, 'ci-opsnn-data.json'),
};
const OUT_JOURNEY = path.join(BASE, 'components/CiReport/ci-journey.json');

// board fields kept in CiRepoData.boards（丢弃 journey/journey_note/scores,
// 这些进入 ci-journey.json）
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
const CELL_KEYS = ['stability', 'efficiency', 'interaction', 'cost'];

// ── 源文件定位：CLI 参数优先；否则自动发现 rawdata 下最新的 *_files 目录 ──
function resolveHtmlPath() {
  const arg = process.argv[2];
  if (arg) {
    const p = path.resolve(arg);
    if (!fs.existsSync(p)) throw new Error('指定的源文件不存在: ' + p);
    return p;
  }
  if (!fs.existsSync(RAWDATA_DIR)) {
    throw new Error('rawdata 目录不存在: ' + RAWDATA_DIR);
  }
  const candidates = fs
    .readdirSync(RAWDATA_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory() && e.name.endsWith('_files'))
    .map((e) => {
      const html = path.join(RAWDATA_DIR, e.name, 'saved_resource.html');
      return fs.existsSync(html)
        ? { html, mtime: fs.statSync(html).mtimeMs }
        : null;
    })
    .filter(Boolean)
    // 取最近修改的一份，方便新增带日期目录时无需改脚本
    .sort((a, b) => b.mtime - a.mtime);
  if (!candidates.length) {
    throw new Error(
      '未在 rawdata 下找到 *_files/saved_resource.html，请确认源数据已放入 ' +
        RAWDATA_DIR
    );
  }
  return candidates[0].html;
}

// ── 从 HTML 抽取内嵌的 `const DATA = {...}`（带引号 / 转义感知的括号配对）──
function extractData(src) {
  const marker = 'const DATA = {';
  const start = src.indexOf(marker);
  if (start < 0) throw new Error('未找到 `const DATA = {` 标记');
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

// ── 产出 1：逐日看板（ci-runtime-data.json / ci-opsnn-data.json）──
function pruneBoard(b) {
  const out = {};
  for (const k of BOARD_KEYS) {
    if (k in b) out[k] = b[k];
  }
  return out;
}

function transformDataRepo(repo, warns, ctx) {
  const boards = {};
  for (const day of repo.days) {
    const b = repo.boards[day];
    if (!b) {
      warns.push(`${ctx}: day ${day} listed but no board`);
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

// ── 产出 2：逐日旅程 / scores（ci-journey.json）──
function transformStage(st, boardProblems, ctx, warns) {
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

function transformJourneyRepo(repoKey, repo, warns) {
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
    for (const p of b.problems || []) {
      if (!segs.includes(p.seg))
        warns.push(`${ctx}: problem.seg「${p.seg}」has no matching journey seg`);
    }
    boards[day] = {
      day,
      date: b.date,
      note: b.journey_note || '',
      scores: b.scores || null,
      stages: b.journey.map((st) => transformStage(st, b.problems, ctx, warns)),
    };
  }
  if (segSignatures.size > 1) {
    warns.push(
      `${repoKey}: seg lists differ across days -> ${[...segSignatures].join(
        ' /// '
      )}`
    );
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

// ── 主流程 ──
function main() {
  const HTML = resolveHtmlPath();
  console.log('源文件:', path.relative(process.cwd(), HTML));
  const DATA = extractData(fs.readFileSync(HTML, 'utf8'));
  const warns = [];

  // 1) 逐日看板
  for (const r of Object.keys(OUT_DATA)) {
    if (!DATA[r]) throw new Error('repo ' + r + ' 在 DATA 中缺失');
    const repo = transformDataRepo(DATA[r], warns, r);
    fs.writeFileSync(OUT_DATA[r], JSON.stringify(repo, null, 1), 'utf8');
    console.log(
      `[data] ${r} -> days=${repo.days.length} ${JSON.stringify(repo.days)} (${
        fs.statSync(OUT_DATA[r]).size
      } bytes)`
    );
  }

  // 2) 逐日旅程 / scores
  const journeyOut = {};
  const allSegs = new Set();
  for (const r of Object.keys(DATA)) {
    const { signatures, repo } = transformJourneyRepo(r, DATA[r], warns);
    journeyOut[r] = repo;
    console.log(`[journey] ${r} days=${repo.days.length}`);
    signatures.forEach((s) => {
      console.log('  segs:', s);
      s.split(' | ').forEach((x) => allSegs.add(x));
    });
  }
  fs.writeFileSync(OUT_JOURNEY, JSON.stringify(journeyOut, null, 1), 'utf8');
  console.log(
    `[journey] wrote ${path.relative(process.cwd(), OUT_JOURNEY)} (${
      fs.statSync(OUT_JOURNEY).size
    } bytes)`
  );

  console.log('\nUNION seg names:', [...allSegs]);
  console.log(`\nWARNINGS (${warns.length}):`);
  warns.forEach((w) => console.log('  -', w));
  console.log('\n✅ CI 源数据已更新');
}

main();
