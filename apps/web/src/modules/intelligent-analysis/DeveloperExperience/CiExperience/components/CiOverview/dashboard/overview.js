/* ==========================================================================
   Cogito · CANN GitCode Action — 社区 CI/CD 总览看板 · 渲染层
   数据源:全局 DATA(由 build.py 注入,渲染层零硬编码)。
   定位:跨仓(runtime + ops-nn)一屏总览,面向两类负责人:
     🛠 社区基础设施负责人 —— 关注「稳不稳 / 值不值」(稳定性 + 成本 + 可观测性)
     🎯 社区体验负责人   —— 关注「快不快 / 顺不顺」(效率 + 交互体验)
   原则:不打总分;结论先行 + 指标 + 趋势 + 责任归属 + 下一步。
   参考 oss-compass「社区体验总览」的信息骨架(总览信息 / 优先级闭环 / 仓库对标),
   但指标口径与责任划分完全对齐本项目的 CI/CD 数据模型。
   ========================================================================== */
'use strict';

/* ---------------- 常量 ---------------- */
const REPOS = Object.keys(DATA);
const repoSlug = r => (r === 'opsnn' ? 'ops-nn' : 'runtime');
const runURL = (r, id) => `https://gitcode.com/cann/${repoSlug(r)}/actions/runs/${id}`;
const prURL  = (r, n)  => `https://gitcode.com/cann/${repoSlug(r)}/merge_requests/${n}`;
const DETAIL = 'CANN_CICD_Dashboard.html';

/* 平台可观测性能力清单(平台级,两仓共享;缺口即对 GitCode 平台的需求) */
const CAP = [
  ['run/job/step 遥测', 'ok'],
  ['日志按步骤下载(行级根因/Flaky/缓存命中)', 'ok'],
  ['PR 关联(v5 pulls)', 'ok'],
  ['run 保留期(≥7 天)', 'ok'],
  ['执行机 API 权限(org runner-groups)', 'ok'],
  ['资源池容量数据(利用率分母)', 'no'],
  ['排队时长字段(pause_time 恒 0)', 'no'],
  ['取消原因字段(无效机时构成)', 'no'],
  ['执行耗时字段质量(execute_cost_time 有负值)', 'no'],
  ['失败信息可读性(UT 域/变体名透传)', 'no'],
  ['重跑标志 / 计费口径', 'no'],
  ['stage/job 名不被内容审查误遮蔽', 'no']
];
const CAP_OK = CAP.filter(c => c[1] === 'ok').length;

const PRI_DESC = {
  P0: '完全阻塞 · 平台侧故障导致流水线大面积挂死,贡献者无法自行解决,需基础设施团队优先处理。',
  P1: '关键卡点 · 平台或环境问题造成显著失败/耗时上浮,影响多个 PR,需限期治理。',
  P2: '显著影响 · 局部退化或待观察项,暂不阻塞主干,持续跟踪或待人工判读。'
};

/* ---------------- 工具(与详细看板口径一致) ---------------- */
const esc = s => String(s == null ? '' : s);
const num = x => { if (x == null) return null; if (typeof x === 'object') x = x.v; const m = String(x).replace(/,/g, '').match(/-?\d+(\.\d+)?/); return m ? parseFloat(m[0]) : null; };
const sum = a => a.reduce((p, q) => p + (q || 0), 0);
function median(a){ const v = a.filter(x => x != null).slice().sort((p, q) => p - q); if (!v.length) return null; const m = Math.floor(v.length / 2); return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2; }
const fixed = x => x == null ? '—' : (Number.isInteger(x) ? x : x.toFixed(1));
const mmss = s => s == null ? '—' : (s >= 120 ? (s / 60).toFixed(1) + ' min' : s + ' s');
const dimOf = (b, k) => (b.dims || []).find(d => d.key === k) || { vals: [] };
function pick(b, k, label){ const d = dimOf(b, k); const f = (d.vals || []).find(v => v[0].indexOf(label) >= 0); return f ? num(f[1]) : null; }
const metaNum = (b, label) => { const f = (b.meta || []).find(m => m[0].indexOf(label) >= 0); return f ? num(f[1]) : null; };
const firstNZ = a => a.find(v => v != null && v !== 0);
const lastNZ  = a => [...a].reverse().find(v => v != null && v !== 0);
const cmpRow  = (w, label) => (w.dimcmp || []).find(r => r[1].indexOf(label) >= 0);

/* 变化判读:按「越低越好/越高越好」给出 改善/恶化/持平(管理者视角) */
function delta(first, last, lowerBetter){
  if (first == null || last == null || first === last) return { cls: 'flat', arrow: '→', word: '持平', txt: '' };
  const up = last > first, worse = lowerBetter ? up : !up;
  const pct = first !== 0 ? Math.round((last - first) / Math.abs(first) * 100) : null;
  return { cls: worse ? 'bad' : 'good', arrow: up ? '▲' : '▼', word: worse ? '恶化' : '改善',
    txt: (up ? '+' : '') + (pct != null ? pct + '%' : (last - first).toFixed(1)) };
}

/* 仓库级全窗逐日序列(与详细看板 daySeries 同源同口径) */
function daySeries(d){
  const days = d.days;
  return { days,
    run:   days.map(dt => metaNum(d.boards[dt], '当日 run') ?? metaNum(d.boards[dt], 'run')),
    fail:  days.map(dt => metaNum(d.boards[dt], '失败')),
    plat:  days.map(dt => pick(d.boards[dt], 'stability', 'Action 平台失败率')),
    waste: days.map(dt => pick(d.boards[dt], 'cost', '无效机时')),
    dur:   days.map(dt => pick(d.boards[dt], 'efficiency', '流水线时长 中位')),
    block: days.map(dt => pick(d.boards[dt], 'interaction', 'CI 阻塞 PR')),
    hours: days.map(dt => pick(d.boards[dt], 'cost', '机时(全部池)')) };
}

/* ---------------- 迷你趋势图(复用详细看板视觉) ---------------- */
function miniChart(title, meaning, series, days, unit, color, lowerBetter){
  const pts = series.map(v => v == null ? 0 : v), W = 260, H = 66, pL = 6, pR = 6, pT = 8, pB = 15;
  const mx = Math.max(...pts, 0.0001), mn = Math.min(...pts, 0);
  const x = i => pL + i * (W - pL - pR) / ((pts.length - 1) || 1);
  const y = v => pT + (H - pT - pB) * (1 - (v - mn) / ((mx - mn) || 1));
  const line = pts.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
  const area = `M${x(0)},${y(mn)} ` + pts.map((v, i) => 'L' + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ') + ` L${x(pts.length - 1)},${y(mn)} Z`;
  const first = series.find(v => v != null), last = [...series].reverse().find(v => v != null);
  const di = delta(first, last, lowerBetter !== false);
  const now = last != null ? fixed(last) : '—';
  const cid = 'g' + Math.random().toString(36).slice(2, 8);
  return `<div class="tcell">
    <div class="t-h"><span class="t-t">${esc(title)}</span><span class="t-now">${now}<span class="mini"> ${esc(unit || '')}</span></span></div>
    <div class="t-m">${esc(meaning)}</div>
    <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto" role="img" aria-label="${esc(title)}趋势">
      <defs><linearGradient id="${cid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".22"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
      <path d="${area}" fill="url(#${cid})"/><path d="${line}" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="${x(pts.length - 1)}" cy="${y(last == null ? mn : last)}" r="3" fill="${color}"/>
      ${days.map((d, i) => `<text x="${x(i)}" y="${H - 4}" font-size="8" fill="var(--muted)" text-anchor="${i === 0 ? 'start' : (i === days.length - 1 ? 'end' : 'middle')}">${esc(d.slice(5))}</text>`).join('')}
    </svg>
    <div class="mini" style="text-align:right">较窗口初 <span class="t-d ${di.cls}">${di.arrow} ${di.txt ? di.txt + ' ' : ''}${di.word}</span></div>
  </div>`;
}

/* 极简火花线(用于分角色指标行) */
function sparkline(series, color, lowerBetter){
  const pts = series.map(v => v == null ? 0 : v), W = 150, H = 26;
  const mx = Math.max(...pts, 0.0001), mn = Math.min(...pts, 0);
  const x = i => i * W / ((pts.length - 1) || 1);
  const y = v => 3 + (H - 6) * (1 - (v - mn) / ((mx - mn) || 1));
  const line = pts.map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ');
  const last = [...series].reverse().find(v => v != null);
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="width:100%;height:26px" role="img" aria-hidden="true">
    <path d="${line}" fill="none" stroke="${color}" stroke-width="2"/>
    <circle cx="${x(pts.length - 1)}" cy="${y(last == null ? mn : last)}" r="2.5" fill="${color}"/></svg>`;
}

/* ==========================================================================
   跨仓聚合:把两个仓库归并到统一口径
   ========================================================================== */
function repoSummary(r){
  const d = DATA[r], w = d.weekly, s = daySeries(d);
  const totRun = sum(s.run), totFail = sum(s.fail);
  const failRate = totRun ? totFail / totRun * 100 : 0;
  const platMed = median(s.plat), totWaste = sum(s.waste), durMed = median(s.dur);
  const blk0 = firstNZ(s.block), blkL = lastNZ(s.block);
  const wm = w.matrices.cost, wmGt = wm.cols.reduce((a, c) => a + (wm.total[c] || 0), 0);
  const wasteShare = wmGt ? Math.round(((wm.total['平台失败废弃'] || 0) + (wm.total['取消占用'] || 0)) / wmGt * 100) : 0;
  const activeP01 = w.probs.filter(p => /^仍活跃/.test(p.status) && p.pri !== 'P2').length;
  const hasP0 = w.probs.some(p => p.pri === 'P0' && /^仍活跃/.test(p.status));
  const level = hasP0 ? 'crit' : (activeP01 > 0 || (platMed != null && platMed >= 40) ? 'warn' : 'good');
  return { r, slug: repoSlug(r), workflow: d.workflow, days: d.days, s, w,
    totRun, totFail, failRate, platMed, totWaste, wasteShare, durMed, blk0, blkL,
    activeP01, hasP0, level,
    hangWeek: num((cmpRow(w, '流水线挂死') || [])[2]),
    ttffWeek: num((cmpRow(w, '首次失败耗时') || [])[2]),
    ttffPrev: num((cmpRow(w, '首次失败耗时') || [])[3]),
    hoursMed: num((cmpRow(w, '机时/日') || [])[2]),
    retry: pick(d.boards[d.days[d.days.length - 1]], 'interaction', '重试失败率') };
}
const SUM = REPOS.map(repoSummary);

/* 跨仓逐日序列(按日期并集对齐;比率类做失败数加权) */
function aggSeries(){
  const dateSet = new Set(); SUM.forEach(x => x.days.forEach(dt => dateSet.add(dt)));
  const days = [...dateSet].sort();
  const map = {}; SUM.forEach(x => { const d = DATA[x.r]; map[x.r] = {}; x.days.forEach((dt, i) => { map[x.r][dt] = {
    run: x.s.run[i], fail: x.s.fail[i], plat: x.s.plat[i], waste: x.s.waste[i], block: x.s.block[i], hours: x.s.hours[i] }; }); });
  const failRate = [], plat = [], block = [], waste = [], hours = [];
  for (const dt of days){
    let R = 0, F = 0, pw = 0, pf = 0, bk = 0, ws = 0, hr = 0, anyBk = false;
    for (const x of SUM){ const c = map[x.r][dt]; if (!c) continue;
      R += c.run || 0; F += c.fail || 0;
      if (c.plat != null && c.fail) { pw += c.plat * c.fail; pf += c.fail; }
      if (c.block != null) { bk += c.block; anyBk = true; }
      ws += c.waste || 0; hr += c.hours || 0; }
    failRate.push(R ? +(F / R * 100).toFixed(1) : 0);
    plat.push(pf ? +(pw / pf).toFixed(1) : 0);
    block.push(anyBk ? bk : null);
    waste.push(+ws.toFixed(1)); hours.push(+hr.toFixed(1));
  }
  return { days, failRate, plat, block, waste, hours };
}
const AGG = aggSeries();

/* 跨仓聚合标量 */
const totRunAll  = sum(SUM.map(x => x.totRun));
const totFailAll = sum(SUM.map(x => x.totFail));
const failRateAll = totRunAll ? totFailAll / totRunAll * 100 : 0;
const platShareAll = (() => { const wsum = sum(SUM.map(x => (x.platMed || 0) * x.totFail)); return totFailAll ? wsum / totFailAll : null; })();
const blockedAll = sum(SUM.map(x => x.blkL || 0));
const blocked0All = sum(SUM.map(x => x.blk0 || 0));
const wasteAll = sum(SUM.map(x => x.totWaste));
const wasteShareAll = (() => {
  let waste = 0, tot = 0;
  for (const x of SUM){ const wm = x.w.matrices.cost, gt = wm.cols.reduce((a, c) => a + (wm.total[c] || 0), 0);
    waste += (wm.total['平台失败废弃'] || 0) + (wm.total['取消占用'] || 0); tot += gt; }
  return tot ? Math.round(waste / tot * 100) : 0;
})();
const activeP01All = sum(SUM.map(x => x.activeP01));
const overallLevel = SUM.some(x => x.level === 'crit') ? 'crit' : (SUM.some(x => x.level === 'warn') ? 'warn' : 'good');

/* 全仓问题池(带 repo 归属) */
const ALL_PROBS = [];
SUM.forEach(x => x.w.probs.forEach(p => ALL_PROBS.push(Object.assign({ repo: x.r, slug: x.slug }, p))));
const isActive   = p => /^仍活跃/.test(p.status);
const isFaded    = p => /已消退/.test(p.status);
const isBackfill = p => /待回填/.test(p.status);

/* ==========================================================================
   ① 顶部整体健康 + 关键 KPI(跨仓)
   ========================================================================== */
function renderHead(){
  const levelText = { crit: '需重点关注', warn: '需关注', good: '总体平稳' }[overallLevel];
  const verdict = overallLevel === 'good'
    ? `观测窗内两仓均未见持续性平台故障,失败以贡献者代码问题为主,反馈链路顺畅。`
    : `主要拖累来自 <b>平台侧故障</b>——约占全部失败 <b>${platShareAll != null ? platShareAll.toFixed(0) : '—'}%</b>,连带卡住约 <b>${blockedAll} 个 PR</b>、浪费约 <b>${wasteAll.toFixed(0)} 机时</b>(占总机时约 ${wasteShareAll}%),需<b>基础设施团队</b>优先跟进;<b>体验团队</b>盯住被卡 PR 的解阻时效。`;
  const dFail = delta(AGG.failRate[0], AGG.failRate[AGG.failRate.length - 1], true);
  const dBlk  = delta(blocked0All, blockedAll, true);
  const dWaste = delta(AGG.waste[0], AGG.waste[AGG.waste.length - 1], true);
  const badge = di => `<span class="k-badge ${di.cls === 'bad' ? 'up' : (di.cls === 'good' ? 'down' : 'flat')}">${di.arrow}${di.txt || ''}</span>`;
  const kpis = [
    ['流水线失败率', failRateAll.toFixed(1) + '%', `全窗 ${totFailAll}/${totRunAll} run`, failRateAll >= 30, badge(dFail)],
    ['平台故障占比', (platShareAll != null ? platShareAll.toFixed(0) : '—') + '%', '失败里属平台自身故障', platShareAll >= 40, ''],
    ['被 CI 卡住的 PR', blockedAll, `窗口 ${blocked0All} → ${blockedAll} 个`, blockedAll > blocked0All, badge(dBlk)],
    ['无效机时(可回收)', wasteAll.toFixed(0), `占总机时约 ${wasteShareAll}%`, wasteShareAll >= 20, badge(dWaste)],
    ['在跟踪 P0/P1', activeP01All, `全仓活跃 · 已消退 ${ALL_PROBS.filter(isFaded).length}`, activeP01All > 0, ''],
    ['平台能力就绪', CAP_OK + ' / ' + CAP.length, '缺口即对平台的需求', false, '']
  ];
  return `<section class="card ovcard ov-${overallLevel} ovhead">
    <h2>社区 CI/CD 总览 · runtime + ops-nn<span class="anno">全窗实测汇总(runtime ${DATA.runtime.days.length} 日 / ops-nn ${DATA.opsnn.days.length} 日);不打总分,看指标与责任归属</span></h2>
    <div class="hero-row">
      <div class="hero-main"><span class="hdot"></span><span class="hero-status">${levelText}</span></div>
      <div class="hero-say">${verdict}</div>
    </div>
    <div class="ovkpis">${kpis.map(k => `<div class="kpi">
      <div class="k-l">${k[0]}${k[4] || ''}</div>
      <div class="k-v${k[3] ? ' bad' : ''}">${k[1]}</div>
      <div class="k-t">${k[2]}</div></div>`).join('')}</div>
  </section>`;
}

/* ==========================================================================
   ② 分角色视角(基础设施 / 体验)
   ========================================================================== */
function metricRow(name, mean, value, unit, di, spark){
  return `<div class="metricrow">
    <div class="mr-l"><div class="mr-name">${esc(name)}</div><div class="mr-mean">${esc(mean)}</div></div>
    <div class="mr-r"><div class="mr-v${di && di.cls === 'bad' ? ' bad' : ''}">${esc(value)}<span class="mr-u">${esc(unit || '')}</span></div>
      ${di ? `<div class="mr-d ${di.cls}">${di.arrow} ${di.txt ? di.txt + ' ' : ''}${di.word}</div>` : ''}</div>
    ${spark ? `<div class="mr-spark">${spark}</div>` : ''}</div>`;
}
function renderRoles(){
  const platActive = ALL_PROBS.filter(p => p.dim === '稳定性' && isActive(p)).length;
  const dPlat  = delta(AGG.plat[0], AGG.plat[AGG.plat.length - 1], true);
  const dWaste = delta(AGG.waste[0], AGG.waste[AGG.waste.length - 1], true);
  const dBlk   = delta(blocked0All, blockedAll, true);
  const hangAll = sum(SUM.map(x => x.hangWeek || 0));
  const ttffWorst = Math.max(...SUM.map(x => x.ttffWeek || 0));
  const ttffRepo = SUM.find(x => (x.ttffWeek || 0) === ttffWorst);
  const dTtff = ttffRepo ? delta(ttffRepo.ttffPrev, ttffRepo.ttffWeek, true) : null;
  const durMax = Math.max(...SUM.map(x => x.durMed || 0));
  const retryMax = Math.max(...SUM.map(x => x.retry || 0));

  const infra = `<div class="rolepanel infra">
    <div class="rp-head"><span class="rp-ic">🛠</span><div class="rp-tt">
      <div class="rp-role">社区基础设施负责人</div><div class="rp-focus">构建稳不稳 · 算力值不值 · 平台能力就绪</div></div></div>
    <div class="rp-body">
      ${metricRow('平台故障占比', '失败里属平台自身故障的比例(越低越好)', platShareAll != null ? platShareAll.toFixed(0) : '—', '%', dPlat, sparkline(AGG.plat, 'var(--critical)', true))}
      ${metricRow('无效机时(可回收)', '平台失败废弃+取消占用消耗的算力', wasteAll.toFixed(0), '机时', dWaste, sparkline(AGG.waste, 'var(--warning)', true))}
      ${metricRow('流水线挂死(全仓周合计)', '取消前占用 ≥1h 的 run 数', hangAll, '起', null, '')}
      ${metricRow('平台侧活跃问题', '归属基础设施团队、仍活跃的稳定性问题', platActive, '项', null, '')}
      ${metricRow('平台可观测性就绪', '缺口即向 GitCode 平台提交的需求台账', CAP_OK + ' / ' + CAP.length, '', null, `<span class="matbar" style="display:block"><i style="width:${Math.round(CAP_OK / CAP.length * 100)}%"></i></span>`)}
    </div></div>`;

  const exp = `<div class="rolepanel exp">
    <div class="rp-head"><span class="rp-ic">🎯</span><div class="rp-tt">
      <div class="rp-role">社区体验负责人</div><div class="rp-focus">反馈快不快 · 开发者顺不顺 · PR 是否被卡</div></div></div>
    <div class="rp-body">
      ${metricRow('被 CI 卡住的 PR', '被失败流水线阻塞、未能转绿的 PR(全仓最新)', blockedAll, '个', dBlk, sparkline(AGG.block.map(v => v == null ? 0 : v), 'var(--series-2)', true))}
      ${metricRow('首次失败耗时(最差仓)', '触发→首个失败 job 结束,越短越快知道"这次不行"', ttffWorst ? (ttffWorst >= 120 ? (ttffWorst / 60).toFixed(1) + ' min' : ttffWorst + ' s') : '—', ttffRepo ? '· ' + ttffRepo.slug : '', dTtff, '')}
      ${metricRow('流水线时长中位(最长仓)', '开发者等一次结果的典型时长', durMax ? durMax.toFixed(1) : '—', 'min', null, sparkline(AGG.failRate.map((_, i) => median(SUM.map(x => x.s.dur[i] ?? null)) || 0), 'var(--series)', true))}
      ${metricRow('重试失败率(最高仓)', '紧跟失败的重跑仍失败的占比,越高越折腾', retryMax ? retryMax.toFixed(0) : '—', '%', null, '')}
      ${metricRow('在跟踪的体验类问题', '效率+交互体验维度、仍活跃的问题', ALL_PROBS.filter(p => (p.dim === '效率' || p.dim === '交互体验') && isActive(p)).length, '项', null, '')}
    </div></div>`;

  return `<section style="margin-top:16px"><h2 style="padding:0 2px">分角色视角 · 各看各的高价值指标<span class="anno">同一份实测数据,两个岗位分别关注的关键项</span></h2>
    <div class="rolegrid">${infra}${exp}</div></section>`;
}

/* ==========================================================================
   ③ 问题闭环进展(按优先级,参考 oss-compass「各优先级闭环进展」)
   ========================================================================== */
function priCard(pri){
  const ps = ALL_PROBS.filter(p => p.pri === pri);
  const active = ps.filter(isActive).length, faded = ps.filter(isFaded).length, backfill = ps.filter(isBackfill).length;
  const total = ps.length;
  const rate = total ? Math.round(faded / total * 100) : 0;
  const pct = n => total ? (n / total * 100).toFixed(1) + '%' : '0';
  return `<div class="pricard ${pri}">
    <div class="pc-h"><span class="pri pri-${pri}">${pri}</span><b style="font-size:13px">${{ P0: '完全阻塞', P1: '关键卡点', P2: '显著影响' }[pri]}</b></div>
    <div class="pc-desc">${esc(PRI_DESC[pri])}</div>
    <div class="pc-stats">
      <div class="pc-stat"><span class="n active">${active}</span><span class="l">活跃</span></div>
      <div class="pc-stat"><span class="n faded">${faded}</span><span class="l">已消退</span></div>
      <div class="pc-stat"><span class="n backfill">${backfill}</span><span class="l">待回填</span></div>
      <div class="pc-stat"><span class="n">${total}</span><span class="l">合计</span></div>
    </div>
    <div class="pc-bar"><i class="b-faded" style="width:${pct(faded)}"></i><i class="b-active" style="width:${pct(active)}"></i><i class="b-backfill" style="width:${pct(backfill)}"></i></div>
    <div class="pc-rate">消退率 <b>${rate}%</b>(已消退 ÷ 合计)</div>
  </div>`;
}
function renderClosure(){
  const total = ALL_PROBS.length, active = ALL_PROBS.filter(isActive).length,
    faded = ALL_PROBS.filter(isFaded).length, backfill = ALL_PROBS.filter(isBackfill).length;
  const rate = total ? Math.round(faded / total * 100) : 0;
  return `<section class="card"><h2>问题闭环进展 · 全仓<span class="anno">"消退"= 该机理近日不再命中;未回验的改进项不关闭</span></h2>
    <div class="closehead">
      <span class="pill">总问题 · ${total}</span>
      <span class="pill crit">活跃 · ${active}</span>
      <span class="pill good">已消退 · ${faded}</span>
      <span class="pill warn">待回填 · ${backfill}</span>
      <span class="pill">消退率 · ${rate}%</span>
    </div>
    <div class="prigrid">${['P0', 'P1', 'P2'].map(priCard).join('')}</div>
    <p class="ov-note">口径:问题 = 失败分类器命中的机理条目(责任方 × 机理);"活跃/消退/待回填"由日粒度命中趋势与人工判读共同决定。P2 含待人工判读(待回填)项。</p>
  </section>`;
}

/* ==========================================================================
   ④ 关键指标趋势(跨仓聚合)
   ========================================================================== */
function renderTrends(){
  const charts = [
    miniChart('流水线失败率', '完结 run 里失败的比例(两仓合并)', AGG.failRate, AGG.days, '%', 'var(--critical)', true),
    miniChart('平台故障占比', '失败里属平台自身故障(失败数加权)', AGG.plat, AGG.days, '%', 'var(--critical)', true),
    miniChart('被 CI 卡住的 PR', '被失败流水线阻塞的 PR 数(两仓合计)', AGG.block.map(v => v == null ? 0 : v), AGG.days, '个', 'var(--series-2)', true),
    miniChart('无效机时', '浪费在非代码失败上的算力(两仓合计)', AGG.waste, AGG.days, '机时', 'var(--warning)', true),
    miniChart('每日机时', '当日 CI 总算力消耗,观察量(两仓合计)', AGG.hours, AGG.days, '机时', 'var(--warning)', false)
  ];
  return `<section class="card"><h2>关键指标趋势 · 全仓逐日<span class="anno">日期取两仓并集;比率类按失败数加权合并</span></h2>
    <div class="trendgrid">${charts.join('')}</div></section>`;
}

/* ==========================================================================
   ⑤ 各仓库对比(参考 oss-compass「各仓库对标结果」)
   ========================================================================== */
function renderCompare(){
  const cards = SUM.map(x => {
    const st = { crit: '需重点关注', warn: '需关注', good: '总体平稳' }[x.level];
    const m = (l, v, bad) => `<div class="cmp-m"><div class="m-l">${l}</div><div class="m-v${bad ? ' bad' : ''}">${v}</div></div>`;
    return `<div class="cmpcard ${x.level}">
      <div class="cmp-h"><span class="cmp-repo">${x.slug}</span><span class="cmp-wf">${esc(x.workflow)}</span><span class="cmp-status">${st}</span></div>
      <div class="cmp-metrics">
        ${m('流水线失败率', x.failRate.toFixed(1) + '%', x.failRate >= 30)}
        ${m('平台故障占比', (x.platMed != null ? x.platMed.toFixed(0) : '—') + '%', x.platMed >= 40)}
        ${m('被 CI 卡住 PR', (x.blkL != null ? x.blkL : '—'), x.blk0 != null && x.blkL != null && x.blkL > x.blk0)}
        ${m('无效机时', x.totWaste.toFixed(0), x.wasteShare >= 20)}
        ${m('流水线时长中位', (x.durMed != null ? x.durMed.toFixed(1) : '—') + ' min', false)}
        ${m('活跃 P0/P1', x.activeP01, x.activeP01 > 0)}
      </div>
      <div class="cmp-foot"><span>全窗 ${x.totFail}/${x.totRun} run · ${x.days.length} 个实测日</span>
        <a class="linkbtn" href="${DETAIL}#${x.r}/daily/stability" target="_blank" rel="noopener">查看详细看板 →</a></div>
    </div>`;
  }).join('');
  return `<section class="card"><h2>各仓库对比<span class="anno">同口径横向对标;点进各仓详细看板做问题定位</span></h2>
    <div class="cmpgrid">${cards}</div></section>`;
}

/* ==========================================================================
   ⑥ Top 待办问题(全仓 P0/P1,按影响排序)
   ========================================================================== */
function trendBars(trend){
  const mx = Math.max(...trend, 1);
  return `<span class="tbar">${trend.map(v => `<i style="height:${v ? Math.max(3, Math.round(v / mx * 22)) : 2}px${v ? '' : ';background:var(--grid)'}"></i>`).join('')}</span>`;
}
function renderTopIssues(){
  const order = { P0: 0, P1: 1, P2: 2 };
  const top = ALL_PROBS.filter(p => isActive(p) && p.pri !== 'P2')
    .sort((a, b) => (order[a.pri] - order[b.pri]) || (b.runs - a.runs)).slice(0, 8);
  if (!top.length) return `<section class="card"><h2>重点待办问题 · 全仓 P0/P1</h2><div class="empty">当前无活跃 P0/P1 问题。</div></section>`;
  const rows = top.map(p => `<tr>
    <td><span class="repo-chip">${esc(p.slug)}</span></td>
    <td><span class="pri pri-${p.pri}">${p.pri}</span></td>
    <td>${esc(p.dim)}</td>
    <td><b>${esc(p.kb)}</b>${p.stages ? ` <span class="mini">${esc(p.stages)}</span>` : ''}</td>
    <td class="num">${p.runs} / ${p.prs}</td>
    <td class="num">${p.days_hit}</td>
    <td>${trendBars(p.trend)}</td>
    <td class="mini">${esc(p.action || '—')}<br>→ ${esc(p.dest || '—')}</td></tr>`).join('');
  return `<section class="card"><h2>重点待办问题 · 全仓 P0/P1<span class="anno">按优先级与影响面排序;建议动作与去向来自机理知识库预填</span></h2>
    <div class="scroll-x"><table><tbody>
    <tr><th>仓库</th><th>优先级</th><th>维度</th><th>问题(机理)</th><th class="num">累计 run/PR</th><th class="num">命中天</th><th>日走势</th><th>建议动作 → 去向</th></tr>
    ${rows}</tbody></table></div>
    <p class="ov-note">仅列活跃 P0/P1;完整问题台账、失败矩阵与根因证据见各仓「详细看板」。</p>
  </section>`;
}

/* ---------------- 顶层渲染 & 主题 ---------------- */
function render(){
  document.getElementById('app').innerHTML =
    renderHead() + renderRoles() + renderClosure() + renderTrends() + renderCompare() + renderTopIssues();
}
function toggleTheme(){
  const r = document.documentElement;
  const cur = r.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  const next = cur === 'dark' ? 'light' : 'dark';
  r.setAttribute('data-theme', next); localStorage.setItem('cogito-theme', next);
  document.getElementById('themebtn').textContent = next === 'dark' ? '☀' : '☾';
}
(function(){
  const t = localStorage.getItem('cogito-theme'); if (t) document.documentElement.setAttribute('data-theme', t);
  const btn = document.getElementById('themebtn');
  if (btn){ const cur = t || (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light'); btn.textContent = cur === 'dark' ? '☀' : '☾'; }
  render();
})();
