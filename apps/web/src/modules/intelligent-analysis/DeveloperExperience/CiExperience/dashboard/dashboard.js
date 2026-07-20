/* ==========================================================================
   Cogito · CANN GitCode Action — 社区 CI/CD 能力与体验看板 · 渲染层
   数据源:全局 DATA(由 build.py 注入,渲染层零硬编码)。
   单页结构:总览 → 问题管理 → 体验得分(+关键指标趋势) → 问题定位 → 深度分析(折叠)。
   日级/周级由体验得分卡上的开关统一;维度由体验得分卡片选择,趋势与问题定位联动。
   ========================================================================== */
'use strict';

/* ---------------- 常量 ---------------- */
const DIM = {
  stability: { name: '稳定性', ask: '构建结果可信吗?' },
  efficiency: { name: '效率', ask: '反馈够快吗?' },
  interaction: { name: '交互体验', ask: '开发者顺畅吗?' },
  cost: { name: '成本', ask: '算力花得值吗?' },
};
const DIMNAME = {
  stability: '稳定性',
  efficiency: '效率',
  interaction: '交互体验',
  cost: '成本',
};
const DIMKEYS = ['stability', 'efficiency', 'interaction', 'cost'];
const KEYBYNAME = {
  稳定性: 'stability',
  效率: 'efficiency',
  交互体验: 'interaction',
  成本: 'cost',
};
const RSTAT = {
  known: '根因已核',
  partial: '部分已核(含推测)',
  guide: '分析指引',
  pending: '待人工判读',
};

/* 平台可观测性能力清单(兼作对 GitCode 平台的需求台账) */
const CAP = [
  ['run/job/step 遥测', 'ok', '全部', '—'],
  [
    '日志按步骤下载(download_log,ZIP 分文件)',
    'ok',
    '行级根因、Flaky 用例级、缓存命中率、冒烟分型',
    '—(需个人令牌)',
  ],
  ['PR 关联(v5 pulls)', 'ok', 'PR 转绿时长、失败修复时长、CI 阻塞 PR', '—'],
  [
    'run 保留期(≥7 天,07-11 首 run 仍在)',
    'ok',
    '趋势连续性',
    '持续核查;验证仓自建落库兜底',
  ],
  [
    '执行机 API 权限(仓库管理员令牌,07-18)',
    'ok',
    'org runner-groups 可查(1 组 modelarts_runner)',
    '—',
  ],
  [
    '资源池容量数据',
    'no',
    '利用率分母缺;NPU 执行机为 ModelArts 动态注册(常态列表空)',
    '配额数据需团队提供',
  ],
  [
    '排队时长字段(pause_time 恒 0)',
    'no',
    '排队时长(现用近似口径)、挂死 vs 排队判别',
    '待提交需求',
  ],
  ['取消原因字段', 'no', '无效机时构成(抢占/人工/超时不可分)', '待提交需求'],
  [
    '执行耗时字段数据质量(execute_cost_time 有负值)',
    'no',
    '已弃用,统一实际耗时(结束−开始)',
    '待提交数据质量单',
  ],
  [
    '失败信息含 UT 域/编译变体名;父节点透传子失败',
    'no',
    '失败信息可读性、机器人回帖精度',
    '待提交需求',
  ],
  [
    '重跑标志 / 计费口径',
    'no',
    'Flaky 精判、成本货币化(现用机时)',
    '待提交需求',
  ],
  [
    'stage/job 名不被内容审查误遮蔽',
    'no',
    '阶段归因(矩阵中单列呈现)',
    '待提交需求',
  ],
];

/* 共用附录 */
const APPENDIX = `
<details class="about"><summary>附录 A · 指标字典(四维度 × 两层)</summary>
  <div class="scroll-x"><table style="margin-top:8px"><tbody>
  <tr><th>维度</th><th>层</th><th>指标</th><th>口径</th></tr>
  <tr><td rowspan="3">稳定性</td><td>结果</td><td>Action 平台失败率</td><td>一级判为「Action 平台失败」的 run ÷ 全部失败 run</td></tr>
  <tr><td>结果</td><td>Flaky 率</td><td>代码未改、重跑转绿的失败 ÷ 全部失败;日志签名分型:用例/环境/待分型</td></tr>
  <tr><td>结果</td><td>流水线挂死数</td><td>取消前占用 ≥1h 的 run 数</td></tr>
  <tr><td rowspan="2">效率</td><td>结果</td><td>流水线时长(成功,中位/90 分位)</td><td>单次成功 run 实际耗时(结束−开始)</td></tr>
  <tr><td>诊断</td><td>排队时长(近似)/ 效率矩阵</td><td>排队=触发→首个 job 开始(平台无队列字段,近似;实测全窗 ≤25 s)</td></tr>
  <tr><td rowspan="3">交互体验</td><td>结果</td><td>首次失败耗时</td><td>触发 → 第一个失败 job 结束(多快知道"这次不行");按责任方分列</td></tr>
  <tr><td>结果</td><td>PR 转绿时长 / 失败修复时长</td><td>滚动 7 日;每 PR 记首段</td></tr>
  <tr><td>诊断</td><td>重试失败率 / CI 阻塞 PR 数</td><td>重试失败率=紧跟失败的重跑仍失败占比(未决不计)</td></tr>
  <tr><td rowspan="2">成本</td><td>结果</td><td>CI 资源占用时长(机时,按池)</td><td>Σ job 实际耗时,按资源池细化,NPU 单列</td></tr>
  <tr><td>结果</td><td>无效机时</td><td>取消、挂死、Action 平台故障 run 消耗的机时(代码失败消耗不计入)</td></tr>
  </tbody></table></div>
</details>
<details class="about"><summary>附录 B · 失败分类器 v1(两级:责任方 × 机理)</summary>
  <div class="scroll-x"><table style="margin-top:8px"><tbody>
  <tr><th>一级(责任方,稳定)</th><th>二级(机理,开放集合)</th><th>owner</th></tr>
  <tr><td>代码失败</td><td>编译/包校验 · 单元测试 · 规范检查 · 代码检查 · Flaky-用例</td><td>贡献者(经失败分型回帖告知)</td></tr>
  <tr><td>Action 平台失败</td><td>资源申请 · 执行机注册 · 平台内部错误 · 镜像/编排 · 外部依赖(OBS) · 配置 · Flaky-环境</td><td>CANN 基础设施团队</td></tr>
  <tr><td>待定</td><td>真机冒烟 · get_pr 解析 · Flaky-待分型 · 上游产物缺失 · 未归类</td><td>—(待定率被监控,目标 &lt;10%)</td></tr>
  </tbody></table></div>
  <p class="mini" style="margin-top:6px">判定规则:① 大面积同挂(同 run ≥3 个独立 UT 域/编译变体失败,或同失败步骤当日跨 ≥5 个 PR)→ 标「疑似系统性」,暂缓归责贡献者;② 上游产物缺失 → 归上游。流水线:规则匹配 → 日志正则 → LLM 兜底 → 待定;<b>100% 处理,显式待定率</b>。每个失败 run 输出:责任方 × 机理 × 位置(stage → job → step)。</p>
</details>
<details class="about"><summary>附录 C · 数据来源与验证仓</summary>
  <p class="mini" style="margin:8px 0 4px">数据底座 = 验证仓 <code>gitcode-ci-lab</code>:collector(runs/jobs/日志 ZIP 日增量)→ parser(失败分类器+四维度日聚合)→ data/daily(报告唯一读取源)。GitCode API:v8 runs/jobs/steps(免鉴权)、download_log(个人令牌)、v5 pulls(PR 关联)。计时一律实际耗时(结束−开始);execute_cost_time 弃用;CANCELED/INIT 不计失败。</p>
</details>`;

/* ---------------- 状态 ---------------- */
let repo = 'opsnn',
  grain = 'daily',
  day = null,
  dim = 'stability',
  ovsel = 'probs';
const D = () => DATA[repo];
const board = () => {
  const d = D();
  const dt = day && d.boards[day] ? day : d.days[d.days.length - 1];
  return [dt, d.boards[dt]];
};
const repoSlug = (r) => (r === 'opsnn' ? 'ops-nn' : 'runtime');
const runURL = (r, id) =>
  `https://gitcode.com/cann/${repoSlug(r)}/actions/runs/${id}`;
const prURL = (r, n) =>
  `https://gitcode.com/cann/${repoSlug(r)}/merge_requests/${n}`;

/* ---------------- 工具 ---------------- */
const esc = (s) => String(s == null ? '' : s);
const fmt = (x) =>
  x == null
    ? '—'
    : typeof x === 'object'
    ? esc(x.v) + (x.demo ? '<span class="demo">示</span>' : '')
    : esc(x);
const mmss = (s) =>
  s == null ? '—' : s >= 120 ? (s / 60).toFixed(1) + ' min' : s + ' s';
function num(x) {
  if (x == null) return null;
  if (typeof x === 'object') x = x.v;
  const m = String(x)
    .replace(/,/g, '')
    .match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}
function median(a) {
  const v = a
    .filter((x) => x != null)
    .slice()
    .sort((p, q) => p - q);
  if (!v.length) return null;
  const m = Math.floor(v.length / 2);
  return v.length % 2 ? v[m] : (v[m - 1] + v[m]) / 2;
}
const sum = (a) => a.reduce((p, q) => p + (q || 0), 0);
const dimOf = (b, k) => (b.dims || []).find((d) => d.key === k) || { vals: [] };
function pick(b, k, label) {
  const d = dimOf(b, k);
  const f = (d.vals || []).find((v) => v[0].indexOf(label) >= 0);
  return f ? num(f[1]) : null;
}
const metaNum = (b, label) => {
  const f = (b.meta || []).find((m) => m[0].indexOf(label) >= 0);
  return f ? num(f[1]) : null;
};
const fixed = (x) => (x == null ? '—' : Number.isInteger(x) ? x : x.toFixed(1));

/* 变化判读:按"越低越好/越高越好"给出 改善/恶化/持平(社区管理者视角) */
function delta(first, last, lowerBetter) {
  if (first == null || last == null || first === last)
    return { cls: 'flat', arrow: '→', word: '持平', txt: '' };
  const up = last > first,
    worse = lowerBetter ? up : !up;
  const pct =
    first !== 0 ? Math.round(((last - first) / Math.abs(first)) * 100) : null;
  return {
    cls: worse ? 'bad' : 'good',
    arrow: up ? '▲' : '▼',
    word: worse ? '恶化' : '改善',
    txt:
      (up ? '+' : '') + (pct != null ? pct + '%' : (last - first).toFixed(1)),
  };
}
const firstNZ = (a) => a.find((v) => v != null && v !== 0);
const lastNZ = (a) => [...a].reverse().find((v) => v != null && v !== 0);

/* 全窗逐日序列(仓库级,与 grain 无关) */
function daySeries(d) {
  const days = d.days;
  return {
    days,
    finish: days.map((dt) => metaNum(d.boards[dt], '完结失败率')),
    plat: days.map((dt) =>
      pick(d.boards[dt], 'stability', 'Action 平台失败率')
    ),
    waste: days.map((dt) => pick(d.boards[dt], 'cost', '无效机时')),
    dur: days.map((dt) => pick(d.boards[dt], 'efficiency', '流水线时长 中位')),
    block: days.map((dt) => pick(d.boards[dt], 'interaction', 'CI 阻塞 PR')),
    hours: days.map((dt) => pick(d.boards[dt], 'cost', '机时(全部池)')),
  };
}

/* ---------------- 迷你图 / 趋势图 ---------------- */
function miniChart(title, meaning, series, days, unit, color, lowerBetter) {
  const pts = series.map((v) => (v == null ? 0 : v)),
    W = 260,
    H = 74,
    pL = 6,
    pR = 6,
    pT = 10,
    pB = 16;
  const mx = Math.max(...pts, 0.0001),
    mn = Math.min(...pts, 0);
  const x = (i) => pL + (i * (W - pL - pR)) / (pts.length - 1 || 1);
  const y = (v) => pT + (H - pT - pB) * (1 - (v - mn) / (mx - mn || 1));
  const line = pts
    .map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ',' + y(v).toFixed(1))
    .join(' ');
  const area =
    `M${x(0)},${y(mn)} ` +
    pts.map((v, i) => 'L' + x(i).toFixed(1) + ',' + y(v).toFixed(1)).join(' ') +
    ` L${x(pts.length - 1)},${y(mn)} Z`;
  const first = series.find((v) => v != null),
    last = [...series].reverse().find((v) => v != null);
  const di = delta(first, last, lowerBetter !== false);
  const now = last != null ? fixed(last) : '—';
  const cid = 'g' + Math.random().toString(36).slice(2, 8);
  return `<div class="tcell">
    <div class="t-h"><span class="t-t">${esc(
      title
    )}</span><span class="t-now">${now}<span class="mini"> ${esc(
    unit || ''
  )}</span></span></div>
    <div class="t-m">${esc(meaning)}</div>
    <svg viewBox="0 0 ${W} ${H}" style="width:100%;height:auto" role="img" aria-label="${esc(
    title
  )}趋势">
      <defs><linearGradient id="${cid}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${color}" stop-opacity=".22"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
      <path d="${area}" fill="url(#${cid})"/><path d="${line}" fill="none" stroke="${color}" stroke-width="2"/>
      <circle cx="${x(pts.length - 1)}" cy="${y(
    last == null ? mn : last
  )}" r="3" fill="${color}"/>
      ${days
        .map(
          (d, i) =>
            `<text x="${x(i)}" y="${
              H - 4
            }" font-size="8.5" fill="var(--muted)" text-anchor="${
              i === 0 ? 'start' : i === days.length - 1 ? 'end' : 'middle'
            }">${esc(d.slice(5))}</text>`
        )
        .join('')}
    </svg>
    <div class="mini" style="text-align:right">较窗口初 <span class="t-d ${
      di.cls
    }">${di.arrow} ${di.txt ? di.txt + ' ' : ''}${di.word}</span></div>
  </div>`;
}

/* 选中维度对应的关键指标趋势(逐日窗口序列) */
function dimTrends(k, s) {
  const M = {
    stability: [
      [
        '流水线失败率',
        '完结 run 里失败的比例',
        s.finish,
        '%',
        'var(--critical)',
        true,
      ],
      [
        '平台故障占比',
        '失败里属平台自身故障的比例',
        s.plat,
        '%',
        'var(--critical)',
        true,
      ],
    ],
    efficiency: [
      [
        '流水线时长(中位)',
        '开发者等一次结果的典型时长',
        s.dur,
        'min',
        'var(--series)',
        true,
      ],
    ],
    interaction: [
      [
        '被 CI 卡住的 PR',
        '被失败流水线阻塞的 PR 数',
        s.block,
        '个',
        'var(--series-2)',
        true,
      ],
    ],
    cost: [
      [
        '无效机时',
        '浪费在非代码失败上的算力',
        s.waste,
        '机时',
        'var(--warning)',
        true,
      ],
      [
        '每日机时',
        '当日 CI 总算力消耗(观察量)',
        s.hours,
        '机时',
        'var(--warning)',
        false,
      ],
    ],
  };
  return (M[k] || []).map((a) =>
    miniChart(a[0], a[1], a[2], s.days, a[3], a[4], a[5])
  );
}

function trendChart(t) {
  const W = 940,
    H = 200,
    padL = 40,
    padB = 30,
    padT = 24,
    pts = t.pts,
    mx = Math.max(...pts) * 1.15 || 1;
  const x = (i) => padL + (i * (W - padL - 20)) / (pts.length - 1 || 1),
    y = (v) => padT + (H - padT - padB) * (1 - v / mx);
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(
    t.title
  )}" style="width:100%;height:auto">`;
  s += `<text x="${padL}" y="14" font-size="12.5" font-weight="600" fill="var(--ink-2)">${esc(
    t.title
  )}</text>`;
  for (const g of [0, Math.round(mx / 2), Math.round(mx)])
    s += `<line x1="${padL}" y1="${y(g)}" x2="${W - 10}" y2="${y(
      g
    )}" stroke="var(--grid)"/><text x="${padL - 6}" y="${
      y(g) + 4
    }" font-size="10" fill="var(--muted)" text-anchor="end">${g}</text>`;
  if (t.anno) {
    const ax = x(t.anno.i);
    s += `<line x1="${ax}" y1="${padT}" x2="${ax}" y2="${
      H - padB
    }" stroke="var(--good)" stroke-width="2" stroke-dasharray="5 4"/>`;
    s += `<text x="${Math.min(ax + 6, W - 330)}" y="${
      padT + 12
    }" font-size="11" fill="var(--good-text)" font-weight="600">▼ ${esc(
      t.anno.label
    )}</text>`;
  }
  const path = pts
    .map((v, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ',' + y(v).toFixed(1))
    .join(' ');
  s += `<path d="${path}" fill="none" stroke="var(--series)" stroke-width="2.5"/>`;
  pts.forEach((v, i) => {
    s += `<circle cx="${x(i)}" cy="${y(
      v
    )}" r="3.5" fill="var(--series)"/><text x="${x(i)}" y="${
      y(v) - 8
    }" font-size="10.5" fill="var(--ink-2)" text-anchor="middle">${v}</text><text x="${x(
      i
    )}" y="${
      H - padB + 16
    }" font-size="10.5" fill="var(--muted)" text-anchor="middle">${esc(
      t.days[i]
    )}</text>`;
  });
  s += `</svg><p class="mini" style="margin:2px 0 14px">${esc(t.note)}</p>`;
  return s;
}

/* 走势条(点击某日 → 跳日级观测;可携带 dimkey 联动维度) */
function trendBars(trend, tdays, clickable, dk) {
  const mx = Math.max(...trend, 1);
  const bars = trend
    .map(
      (v, i) =>
        `<i title="${esc(tdays[i])}:${v}" data-day="${esc(tdays[i])}"${
          dk ? ` data-dim="${dk}"` : ''
        } style="height:${v ? Math.max(3, Math.round((v / mx) * 24)) : 2}px${
          v ? '' : ';background:var(--grid)'
        }"></i>`
    )
    .join('');
  const onclick = clickable ? ` onclick="barsClick(event)"` : '';
  return `<div class="tbar${clickable ? ' click' : ''}" title="${
    clickable ? '点击某天跳转到日级观测' : ''
  }"${onclick}>${bars}</div>`;
}
function barsClick(ev) {
  const el = ev.target.closest('i[data-day]');
  if (!el) return;
  gotoDay(el.getAttribute('data-day'), el.getAttribute('data-dim'));
}
function trendVerdict(trend) {
  const di = delta(firstNZ(trend) ?? null, lastNZ(trend) ?? null, true);
  return `<span class="tverd ${di.cls}">${di.word}</span>`;
}

/* ---------------- 表格构造 ---------------- */
function stabTable(m) {
  let h =
    '<tr><th class="rowh" rowspan="2">阶段</th>' +
    m.groups
      .map(
        (g) =>
          `<th colspan="${g.mechs.length}" style="text-align:center">${esc(
            g.g
          )}</th>`
      )
      .join('') +
    '<th class="num" rowspan="2">合计</th></tr>';
  h +=
    '<tr>' +
    m.groups
      .map((g) =>
        g.mechs
          .map((mm) => `<th style="text-align:center">${esc(mm)}</th>`)
          .join('')
      )
      .join('') +
    '</tr>';
  for (const st of m.stages) {
    const row = m.cells[st] || {};
    const tot = Object.values(row).reduce((a, b) => a + b, 0);
    h +=
      `<tr><th class="rowh">${esc(st)}</th>` +
      m.groups
        .map((g) =>
          g.mechs
            .map((mm) => {
              const v = row[mm] || 0;
              const cl = v
                ? g.cls === 'Action 平台失败'
                  ? 'hot'
                  : g.cls === '待定'
                  ? 'warm'
                  : 'cool'
                : '';
              return `<td class="${cl}">${v || '·'}</td>`;
            })
            .join('')
        )
        .join('') +
      `<td class="num"><b>${tot || '·'}</b></td></tr>`;
  }
  return `<div class="scroll-x"><table class="mx"><tbody>${h}</tbody></table></div><p class="mini">${esc(
    m.note
  )}</p>
    <div class="legend"><span><i class="sw sw-hot"></i>平台责任(无效浪费)</span><span><i class="sw sw-cool"></i>代码责任(CI 正常拦截,非故障)</span><span><i class="sw sw-warm"></i>待定(待人工判读)</span></div>`;
}
function effTable(m) {
  const rows = m.rows
    .map((e) => {
      const dev =
        e.dev_pct == null ? '—' : (e.dev_pct > 0 ? '+' : '') + e.dev_pct + '%';
      const warn =
        e.dev_pct != null && e.dev_pct >= 50
          ? ' style="color:var(--critical-text);font-weight:700"'
          : '';
      return `<tr><td>${esc(e.stage)}</td><td class="num">${mmss(
        e.med_s
      )}</td><td class="num">${mmss(e.p90_s)}</td><td class="num">${mmss(
        e.base_med_s
      )}</td><td class="num"${warn}>${dev}</td><td class="num">${
        e.over_n
      }</td><td class="num">${e.total_min}</td><td class="num">${
        e.n
      }</td></tr>`;
    })
    .join('');
  return `<div class="scroll-x"><table><tbody><tr><th>阶段</th><th class="num">中位耗时</th><th class="num">90 分位</th><th class="num">基线</th><th class="num">偏离</th><th class="num">超基线 run</th><th class="num">总机时(min)</th><th class="num">样本</th></tr>${rows}</tbody></table></div><p class="mini">${esc(
    m.note
  )}</p>`;
}
function costTable(m) {
  const disp = {
    有效: '有效(成功 run)',
    代码失败消耗: '代码失败消耗(拦截成本)',
    平台失败废弃: '平台失败废弃',
    待定: '待定',
    取消占用: '取消占用',
  };
  let h =
    '<tr><th class="rowh">阶段</th>' +
    m.cols
      .map((c) => `<th style="text-align:center">${esc(disp[c] || c)}</th>`)
      .join('') +
    '<th class="num">小计</th></tr>';
  h += m.rows
    .map((r) => {
      const tot = m.cols.reduce((a, c) => a + (r.cells[c] || 0), 0);
      return (
        `<tr><th class="rowh">${esc(r.stage)}</th>` +
        m.cols
          .map((c) => {
            const v = Math.round(r.cells[c] || 0);
            const cl = v
              ? c === '平台失败废弃' || c === '取消占用'
                ? 'hot'
                : c === '待定'
                ? 'warm'
                : ''
              : '';
            return `<td class="${cl}">${v || '·'}</td>`;
          })
          .join('') +
        `<td class="num"><b>${Math.round(tot)}</b></td></tr>`
      );
    })
    .join('');
  const gt = m.cols.reduce((a, c) => a + (m.total[c] || 0), 0);
  h +=
    `<tr><th class="rowh">合计</th>` +
    m.cols
      .map((c) => `<td><b>${Math.round(m.total[c] || 0)}</b></td>`)
      .join('') +
    `<td class="num"><b>${Math.round(gt)}</b></td></tr>`;
  return `<div class="scroll-x"><table class="mx"><tbody>${h}</tbody></table></div><p class="mini">${esc(
    m.note
  )}</p>`;
}
function probCard(pb) {
  const rt = pb.root || {},
    im = pb.impact || {},
    prc = {};
  (pb.runs || []).forEach((r) => {
    if (r.pr) prc[r.pr] = (prc[r.pr] || 0) + 1;
  });
  const rows = (pb.runs || [])
    .map((r) => {
      const dup = r.pr && prc[r.pr] > 1;
      return `<tr${dup ? ' class="dup"' : ''}><td><a href="${runURL(
        repo,
        r.id
      )}" target="_blank" rel="noopener">#${r.n}</a></td>
      <td>${
        r.pr
          ? `<a href="${prURL(
              repo,
              r.pr
            )}" target="_blank" rel="noopener">${esc(r.pr)}</a>${
              dup ? ` <span class="mini">×${prc[r.pr]}</span>` : ''
            }`
          : '—'
      }</td>
      <td class="num">${esc(r.t) || '—'}</td><td>${esc(r.stage) || '—'}${
        r.job ? ' / ' + esc(r.job) : ''
      }</td><td class="mini">${esc(r.msg)}</td></tr>`;
    })
    .join('');
  return `<details class="prob"${pb.pri === 'P0' ? ' open' : ''}>
    <summary><span class="pri pri-${pb.pri}">${
    pb.pri
  }</span><span class="dimtag">${esc(pb.dim)}</span>${esc(pb.title)}</summary>
    <div class="meta">影响面:${im.runs || 0} run · ${im.prs || 0} PR${
    im.streak_days > 1
      ? ` · 持续第 ${im.streak_days} 天(窗口累计 ${im.window_total} 起)`
      : ''
  }${
    im.wasted_min ? ` · 关联机时 ${(im.wasted_min / 60).toFixed(1)} 机时` : ''
  } · 责任方:${esc(pb.owner)}</div>
    ${
      im.cross && im.cross.length
        ? `<div class="meta">跨维度影响:${im.cross.map(esc).join(';')}</div>`
        : ''
    }
    <div class="root"><b>可能根因</b><span class="rstat ${
      rt.status || 'pending'
    }">${RSTAT[rt.status] || RSTAT.pending}</span>
      <div style="margin-top:4px">${
        esc(rt.cause) || '机理知识库暂无条目——根因待人工判读,不做推测。'
      }</div>
      ${
        rt.evidence && rt.evidence.length
          ? `<div style="margin-top:4px"><b>已核证据</b><ul>${rt.evidence
              .map((e) => `<li>${esc(e)}</li>`)
              .join('')}</ul></div>`
          : ''
      }
      ${
        rt.guess
          ? `<div style="margin-top:4px"><b>推测(未核)</b>:${esc(
              rt.guess
            )}</div>`
          : ''
      }
      <div style="margin-top:4px"><b>建议动作</b>:${
        esc(rt.action) || '—'
      }<span class="mini"> → ${esc(rt.dest)}</span></div></div>
    <div class="runbox"><table><tbody><tr><th>run</th><th>PR</th><th class="num">触发</th><th>失败位置</th><th>失败信息 / 说明</th></tr>${rows}</tbody></table></div>
  </details>`;
}
function diagHTML(key, dg) {
  dg = dg || {};
  if (key === 'stability')
    return `<div class="scroll-x"><table style="margin-top:8px"><tbody><tr><th>机理(二级)</th><th class="num">当日失败 run</th></tr>${Object.entries(
      dg.mech || {}
    )
      .sort((a, b) => b[1] - a[1])
      .map(([k, v]) => `<tr><td>${esc(k)}</td><td class="num">${v}</td></tr>`)
      .join('')}</tbody></table></div>`;
  if (key === 'efficiency')
    return (
      `<div class="scroll-x"><table style="margin-top:8px"><tbody><tr><th>阶段</th><th class="num">实际耗时 中位</th><th class="num">样本 run</th></tr>${(
        dg.stage_bill || []
      )
        .map(
          (b) =>
            `<tr><td>${esc(b.stage)}</td><td class="num">${
              b.med_s != null ? (b.med_s / 60).toFixed(1) + ' min' : '—'
            }</td><td class="num">${b.n}</td></tr>`
        )
        .join('')}</tbody></table></div>` +
      `<div class="scroll-x"><table style="margin-top:8px"><tbody><tr><th>最耗时 job(成功 run,n≥3)</th><th>阶段</th><th class="num">中位耗时</th></tr>${(
        dg.top_jobs || []
      )
        .map(
          (t) =>
            `<tr><td>${esc(t.job)}</td><td>${esc(
              t.stage
            )}</td><td class="num">${(t.med_s / 60).toFixed(1)} min</td></tr>`
        )
        .join('')}</tbody></table></div>`
    );
  if (key === 'interaction')
    return (
      `<div class="scroll-x"><table style="margin-top:8px"><tbody><tr><th>首次失败耗时 · 按责任方</th><th class="num">中位</th></tr>${Object.entries(
        dg.ttff_by_owner || {}
      )
        .map(
          ([k, v]) =>
            `<tr><td>${esc(k)}</td><td class="num">${mmss(v)}</td></tr>`
        )
        .join('')}</tbody></table></div>` +
      `<p class="mini" style="margin:6px 0 0">重试失败率 ${
        dg.retry && dg.retry.rate != null ? dg.retry.rate + '%' : '—'
      }(滚动 7 日,n=${
        dg.retry ? dg.retry.n : '—'
      })——紧跟失败的重跑仍失败的占比。</p>`
    );
  if (key === 'cost')
    return `<div class="scroll-x"><table style="margin-top:8px"><tbody><tr><th>资源池</th><th class="num">当日机时(min)</th></tr>${(
      dg.pools || []
    )
      .map((p) => `<tr><td>${esc(p[0])}</td><td class="num">${p[1]}</td></tr>`)
      .join('')}</tbody></table></div>`;
  return '';
}
/* 选中维度对应的"定位"分析表(daily=当日矩阵;weekly=周汇总矩阵) */
function dimMatrix(k, src) {
  if (k === 'stability') return stabTable(src.matrices.stab);
  if (k === 'efficiency') return effTable(src.matrices.eff);
  if (k === 'cost') return costTable(src.matrices.cost);
  const dg = src.diag && src.diag.interaction;
  return (
    `<p class="mini">交互体验无独立失败矩阵——定位落在「多快知道失败 / 是否需要重试」。被卡 PR 多源于稳定性维度的平台故障拦截。</p>` +
    (dg
      ? diagHTML('interaction', dg)
      : '<p class="mini">周汇总交互细分见体验得分卡「本周 vs 上周」及稳定性定位表。</p>')
  );
}

/* ==========================================================================
   ① 总览 + ② 问题管理(#sec-top,仓库级,与 grain 无关)
   ========================================================================== */
function renderTop() {
  const d = D(),
    days = d.days,
    w = d.weekly;
  const runs = days.map((dt) => metaNum(d.boards[dt], 'run')),
    fails = days.map((dt) => metaNum(d.boards[dt], '失败'));
  const totRun = sum(runs),
    totFail = sum(fails),
    failRate = totRun ? (totFail / totRun) * 100 : 0;
  const s = daySeries(d);
  const platMed = median(s.plat),
    totWaste = sum(s.waste);
  const activeP01 = w.probs.filter(
    (p) => /^仍活跃/.test(p.status) && p.pri !== 'P2'
  ).length;
  const hasP0 = w.probs.some((p) => p.pri === 'P0' && /^仍活跃/.test(p.status));
  const faded = w.probs.filter((p) => /已消退/.test(p.status)).length;
  const backfill = w.probs.filter((p) => /待回填/.test(p.status)).length;
  const capOk = CAP.filter((c) => c[1] === 'ok').length;
  const wm = w.matrices.cost,
    wmGt = wm.cols.reduce((a, c) => a + (wm.total[c] || 0), 0);
  const wasteShare = wmGt
    ? Math.round(
        (((wm.total['平台失败废弃'] || 0) + (wm.total['取消占用'] || 0)) /
          wmGt) *
          100
      )
    : 0;
  const blk0 = firstNZ(s.block),
    blkL = lastNZ(s.block);
  const level = hasP0
    ? 'crit'
    : activeP01 > 0 || (platMed != null && platMed >= 40)
    ? 'warn'
    : 'good';
  const levelText = { crit: '需重点关注', warn: '需关注', good: '总体平稳' }[
    level
  ];
  const verdict =
    level === 'good'
      ? `观测窗内未见持续性平台故障,失败以贡献者代码问题为主,反馈链路顺畅。`
      : `主要拖累来自 <b>平台侧故障</b>——约占全部失败 <b>${
          platMed != null ? platMed.toFixed(0) : '—'
        }%</b>,连带卡住约 <b>${
          blkL != null ? blkL : '—'
        } 个 PR</b>、浪费约 <b>${totWaste.toFixed(
          0
        )} 机时</b>,需基础设施团队优先跟进。`;
  const kpis = [
    [
      '流水线失败率',
      failRate.toFixed(1) + '%',
      `全窗 ${totFail}/${totRun} run · 平台故障占 ${
        platMed != null ? platMed.toFixed(0) : '—'
      }%`,
      failRate >= 30,
      null,
    ],
    [
      '被 CI 卡住的 PR',
      blkL != null ? blkL : '—',
      `窗口 ${blk0 != null ? blk0 : '—'} → ${blkL != null ? blkL : '—'} 个`,
      blk0 != null && blkL != null && blkL > blk0,
      null,
    ],
    [
      '无效机时(可回收)',
      totWaste.toFixed(0),
      `占总机时约 ${wasteShare}%`,
      wasteShare >= 20,
      null,
    ],
    [
      '在跟踪的问题',
      activeP01,
      `活跃 P0/P1 · 已消退 ${faded} · 待回填 ${backfill}`,
      activeP01 > 0,
      'probs',
    ],
    [
      '平台能力就绪',
      capOk + ' / ' + CAP.length,
      `观测性缺口 = 对平台的需求`,
      false,
      'cap',
    ],
  ];
  let html = `<section class="card ovcard ov-${level}">
    <h2>总览 · ${repoSlug(repo)}<span class="anno">全 ${
    days.length
  } 个实测日汇总;点「在跟踪的问题 / 平台能力就绪」查看详情</span></h2>
    <div class="hero-row">
      <div class="hero-main"><span class="hdot"></span><span class="hero-status">${levelText}</span></div>
      <div class="hero-say">${verdict}</div>
    </div>
    <div class="kpihead" style="margin-top:12px">${kpis
      .map((k) => {
        const on = k[4] && ovsel === k[4];
        return `<div class="kpi${k[4] ? ' kpi-sel' : ''}${on ? ' on' : ''}"${
          k[4] ? ` onclick="setOv('${k[4]}')"` : ''
        }>
        <div class="k-l">${k[0]}${
          k[4] ? `<span class="kpi-caret">${on ? '▴' : '▾'}</span>` : ''
        }</div>
        <div class="k-v${k[3] ? ' bad' : ''}">${k[1]}</div><div class="k-s">${
          k[2]
        }</div></div>`;
      })
      .join('')}</div>
  </section>`;
  if (ovsel === 'probs') html += probBoard(w);
  else if (ovsel === 'cap') html += capPanel(capOk);
  return html;
}

/* 问题管理板块(与总览「在跟踪的问题」联动) */
function probBoard(w) {
  const activeP01 = w.probs.filter(
    (p) => /^仍活跃/.test(p.status) && p.pri !== 'P2'
  ).length;
  const faded = w.probs.filter((p) => /已消退/.test(p.status)).length;
  const backfill = w.probs.filter((p) => /待回填/.test(p.status)).length;
  const order = { P0: 0, P1: 1, P2: 2 };
  const probs = w.probs
    .slice()
    .sort((a, b) => order[a.pri] - order[b.pri] || b.runs - a.runs);
  return `<section class="card"><h2>问题管理 · 正在跟踪的问题<span class="anno">点走势条跳到峰值当天并联动该维度</span></h2>
    <div class="counters">
      <span class="pill crit">活跃 P0/P1 · ${activeP01}</span>
      <span class="pill">已消退 · ${faded}</span>
      <span class="pill warn">待回填 · ${backfill}</span>
    </div>
    <div class="scroll-x"><table><tbody>
    <tr><th>优先级</th><th>维度</th><th>问题(机理)</th><th class="num">首现</th><th class="num">命中天</th><th class="num">累计 run/PR</th><th>日走势 · 趋势</th><th>状态</th></tr>
    ${probs
      .map((p) => {
        const st = /^仍活跃/.test(p.status)
          ? 'st-active'
          : /待回填/.test(p.status)
          ? 'st-backfill'
          : 'st-faded';
        const dk = KEYBYNAME[p.dim] || '';
        return `<tr><td><span class="pri pri-${p.pri}">${
          p.pri
        }</span></td><td>${esc(p.dim)}</td>
      <td><b>${esc(p.kb)}</b>${
          p.stages ? ` <span class="mini">${esc(p.stages)}</span>` : ''
        }</td>
      <td class="num">${esc(p.first)}</td><td class="num">${
          p.days_hit
        }</td><td class="num">${p.runs} / ${p.prs}</td>
      <td>${trendBars(p.trend, p.tdays, true, dk)} ${trendVerdict(
          p.trend
        )}</td><td><span class="stbadge ${st}">${esc(
          p.status
        )}</span></td></tr>`;
      })
      .join('')}
    </tbody></table></div>
  </section>`;
}

/* 平台可观测性面板(与总览「平台能力就绪」联动) */
function capPanel(capOk) {
  return `<section class="card"><h2>平台可观测性面板<span class="anno">GitCode Action 能力现状;缺口即向平台提交的需求</span></h2>
    <p class="sectlead">已就绪 <b class="num" style="font-size:18px">${capOk} / ${
    CAP.length
  }</b>
      <span class="matbar" style="display:inline-block;width:200px;vertical-align:middle"><i style="width:${Math.round(
        (capOk / CAP.length) * 100
      )}%"></i></span></p>
    <div class="scroll-x"><table><tbody><tr><th>平台能力</th><th>现状</th><th>影响的指标</th><th>需求状态</th></tr>
    ${CAP.map(
      (c) =>
        `<tr><td>${esc(c[0])}</td><td class="cap-${c[1]}">${
          c[1] === 'ok' ? '具备' : c[1] === 'wip' ? '进行中' : '缺失/脏数据'
        }</td><td class="mini">${esc(c[2])}</td><td class="mini">${esc(
          c[3]
        )}</td></tr>`
    ).join('')}
    </tbody></table></div>
  </section>`;
}

/* ==========================================================================
   ③ 体验得分 + 关键指标趋势 + 问题定位(#sec-mid,随 grain/day/dim 变化)
   ========================================================================== */
function grainToggle() {
  return `<span class="grainseg">
  <button class="${
    grain === 'daily' ? 'on' : ''
  }" onclick="setGrain('daily')">日级</button>
  <button class="${
    grain === 'weekly' ? 'on' : ''
  }" onclick="setGrain('weekly')">周级</button></span>`;
}

function scoreCardDaily(x) {
  const ask = DIM[x.key] ? DIM[x.key].ask : '';
  return `<div class="dim s-${x.s}${
    dim === x.key ? ' sel' : ''
  }" onclick="setDim('${x.key}')" title="${esc(ask)}">
    <div class="dn"><span class="dot"></span>${esc(x.name)}${
    x.probn
      ? `<span class="probn">${x.toppri ? x.toppri + '·' : ''}${
          x.probn
        } 问题</span>`
      : ''
  }<span class="dw">${esc(x.word)}</span></div>
    <div class="ask">${esc(ask)}</div>
    <ul>${x.vals
      .slice(0, 3)
      .map((v) => `<li><span>${esc(v[0])}</span><b>${fmt(v[1])}</b></li>`)
      .join('')}</ul>
    ${
      x.note
        ? `<div class="mini" style="margin-top:5px">⚠ ${esc(x.note)}</div>`
        : ''
    }
  </div>`;
}
function scoreCardWeekly(k, r) {
  const ask = DIM[k].ask;
  if (!r)
    return `<div class="dim${
      dim === k ? ' sel' : ''
    }" onclick="setDim('${k}')"><div class="dn"><span class="dot"></span>${
      DIMNAME[k]
    }</div><div class="ask">${esc(
      ask
    )}</div><div class="empty" style="margin-top:8px">本周无对比数据</div></div>`;
  const di = delta(num(r[3]), num(r[2]), true);
  const scls =
    di.cls === 'bad' ? 'red' : di.cls === 'good' ? 'green' : 'yellow';
  return `<div class="dim s-${scls}${
    dim === k ? ' sel' : ''
  }" onclick="setDim('${k}')" title="${esc(ask)}">
    <div class="dn"><span class="dot"></span>${
      DIMNAME[k]
    }<span class="dw dtrend ${di.cls}">${di.arrow} ${di.word}</span></div>
    <div class="ask">${esc(ask)}</div>
    <ul>
      <li><span>${esc(r[1])}</span><b>${fmt(r[2])}</b></li>
      <li><span>上周</span><b>${fmt(r[3])}</b></li>
      ${
        r[4]
          ? `<li><span class="mini" style="font-weight:400">${esc(
              r[4]
            )}</span></li>`
          : ''
      }
    </ul>
  </div>`;
}

function renderMid() {
  const d = D(),
    s = daySeries(d);
  if (!DIM[dim]) dim = 'stability';
  let html = '';
  if (grain === 'daily') {
    const [dt, dd] = board();
    // 体验得分
    html += `<section class="card"><h2>体验得分 · 日级 · ${esc(
      dd.date
    )}<span class="anno">四个维度当日指标;点卡片联动下方趋势与问题定位</span>${grainToggle()}</h2>
      <div class="dayrow"><span class="mini">日期:</span><div class="seg" role="tablist" aria-label="日期切换">${d.days
        .map(
          (x) =>
            `<button class="${
              x === dt ? 'on' : ''
            }" onclick="setDay('${x}')">${x.slice(5)}</button>`
        )
        .join('')}</div>
        <span class="mini daymeta">${(dd.meta || [])
          .map((m) => `${esc(m[0])} <b>${fmt(m[1])}</b>`)
          .join(' · ')}</span></div>
      <div class="dims">${dd.dims
        .map(scoreCardDaily)
        .join('')}</div></section>`;
    // 关键指标趋势(选中维度)
    const charts = dimTrends(dim, s);
    html += `<section class="card"><h2>关键指标趋势 · ${
      DIMNAME[dim]
    }<span class="anno">仅显示当前选中维度;点上方其他卡片切换</span></h2>
      <div class="trendgrid">${
        charts.length
          ? charts.join('')
          : '<div class="empty">该维度暂无逐日趋势序列。</div>'
      }</div></section>`;
    // 问题定位(选中维度)
    const plist = (dd.problems || []).filter((p) => p.dimkey === dim);
    const sd = dd.dims.find((x) => x.key === dim);
    const idHTML = plist.length
      ? plist.map(probCard).join('')
      : `<div class="empty">${
          sd && sd.note
            ? `${DIMNAME[dim]} 今日无新增问题;状态「${sd.word}」原因:${esc(
                sd.note
              )}。`
            : `${DIMNAME[dim]} 今日无需处理事项。`
        }</div>`;
    const mrows = (dd.metrics[dim] || []).map((r) => [DIMNAME[dim], ...r]);
    html += `<section class="card"><h2>问题定位 · 日级 · ${
      DIMNAME[dim]
    }<span class="anno">先识别问题,再定位到阶段与责任;随维度联动</span></h2>
      <div class="locblock loc-id">
        <div class="locblock-h"><span class="locstep">1</span><div class="locblock-tt"><div class="locblock-t">识别 · 有哪些问题、影响多大</div><div class="locblock-s">根因只来自机理知识库(人工审定),不做推测</div></div></div>
        ${idHTML}
        <h4 class="subh">${DIMNAME[dim]} · 结果指标 · 当日 vs 前 7 日中位</h4>
        <div class="scroll-x"><table><tbody><tr><th>维度</th><th>指标</th><th class="num">当日值</th><th class="num">前 7 日中位</th><th>口径(分子/分母)</th><th>备注</th></tr>
        ${mrows
          .map(
            (r) =>
              `<tr><td>${esc(r[0])}</td><td>${esc(
                r[1]
              )}</td><td class="num"><b>${fmt(
                r[2]
              )}</b></td><td class="num">${fmt(r[3])}</td><td>${esc(
                r[4]
              )}</td><td class="mini">${esc(r[5])}</td></tr>`
          )
          .join('')}
        </tbody></table></div>
      </div>
      <div class="locblock loc-loc">
        <div class="locblock-h"><span class="locstep">2</span><div class="locblock-tt"><div class="locblock-t">定位 · 落在哪个阶段、是谁的责任</div><div class="locblock-s">失败矩阵:阶段 × 机理 / 机时归属</div></div></div>
        ${dimMatrix(dim, dd)}
      </div>
    </section>`;
  } else {
    const w = d.weekly;
    const cmpByKey = {};
    w.dimcmp.forEach((r) => {
      const k = KEYBYNAME[r[0]];
      if (k) cmpByKey[k] = r;
    });
    // 体验得分(周级)
    html += `<section class="card"><h2>体验得分 · 周级 · ${esc(
      w.period
    )}<span class="anno">四个维度本周 vs 上周;点卡片联动下方趋势与问题定位</span>${grainToggle()}</h2>
      <div class="dims">${DIMKEYS.map((k) =>
        scoreCardWeekly(k, cmpByKey[k])
      ).join('')}</div></section>`;
    // 关键指标趋势(选中维度,窗口逐日序列)
    const charts = dimTrends(dim, s);
    html += `<section class="card"><h2>关键指标趋势 · ${
      DIMNAME[dim]
    }<span class="anno">窗口逐日序列;仅显示当前选中维度</span></h2>
      <div class="trendgrid">${
        charts.length
          ? charts.join('')
          : '<div class="empty">该维度暂无逐日趋势序列。</div>'
      }</div></section>`;
    // 问题定位(周级,选中维度)
    const wp = w.probs.filter((p) => p.dim === DIMNAME[dim]);
    const cmp = w.dimcmp.find((r) => r[0] === DIMNAME[dim]);
    html += `<section class="card"><h2>问题定位 · 周级 · ${
      DIMNAME[dim]
    }<span class="anno">先识别本周问题,再定位到阶段与责任;随维度联动</span></h2>
      <div class="locblock loc-id">
        <div class="locblock-h"><span class="locstep">1</span><div class="locblock-tt"><div class="locblock-t">识别 · 本周问题与环比</div></div></div>
        ${
          wp.length
            ? `<div class="scroll-x"><table><tbody><tr><th>优先级</th><th>机理/问题</th><th class="num">首现</th><th class="num">命中天</th><th class="num">累计 run/PR</th><th>日走势</th><th>状态</th><th>建议动作 → 去向</th></tr>
        ${wp
          .map((p) => {
            const st = /^仍活跃/.test(p.status)
              ? `<b style="color:var(--critical-text)">${esc(p.status)}</b>`
              : esc(p.status);
            return `<tr><td><span class="pri pri-${p.pri}">${
              p.pri
            }</span></td><td><b>${esc(p.kb)}</b>${
              p.stages ? ` <span class="mini">${esc(p.stages)}</span>` : ''
            }</td>
          <td class="num">${esc(p.first)}</td><td class="num">${
              p.days_hit
            }</td><td class="num">${p.runs} / ${p.prs}</td>
          <td>${trendBars(p.trend, p.tdays, true, dim)} ${trendVerdict(
              p.trend
            )}</td><td>${st}</td><td class="mini">${esc(p.action)} <br>→ ${esc(
              p.dest
            )}</td></tr>`;
          })
          .join('')}
        </tbody></table></div>`
            : `<div class="empty">${DIMNAME[dim]} 本周无跟踪问题。</div>`
        }
        ${
          cmp
            ? `<p class="mini" style="margin-top:8px">环比:${esc(
                cmp[1]
              )} 本周 <b>${fmt(cmp[2])}</b> · 上周 ${fmt(cmp[3])}${
                cmp[4] ? ' · ' + esc(cmp[4]) : ''
              }</p>`
            : ''
        }
      </div>
      <div class="locblock loc-loc">
        <div class="locblock-h"><span class="locstep">2</span><div class="locblock-tt"><div class="locblock-t">定位 · 落在哪个阶段、是谁的责任(周汇总)</div></div></div>
        ${dimMatrix(dim, w)}
      </div>
    </section>`;
    // 周级专属:改进行动 / 改进效果 / 账单 / 回填 / 上期回验
    html += `<section class="card"><h2>本周改进行动 · 由问题跟踪生成<span class="anno">P0/P1 条目 × 机理知识库自动预填;确认后提交 Issue,未回验不关闭</span></h2>
      ${
        w.imps.length
          ? w.imps
              .map(
                (m) => `<div class="imp ${
                  m.p === 'P1' ? 'p1' : ''
                }"><div class="rt"><span class="prio">${m.p}</span>${esc(
                  m.id
                )} · ${esc(m.title)}</div>
        <div class="qd"><div><b>分类/位置</b>${esc(
          m.cls
        )}</div><div><b>Owner</b>${esc(
                  m.owner
                )}</div><div><b>证据(本周实测)</b>${esc(
                  m.ev
                )}</div><div><b>回验口径</b>${esc(m.check)}</div></div>
        <div style="margin-top:8px"><span class="state ${
          m.stOn ? 'on' : ''
        }">${esc(m.st)}</span></div></div>`
              )
              .join('')
          : '<div class="empty">本周无 P0/P1 问题,无改进行动。</div>'
      }</section>`;
    html += `<section class="card"><h2>改进效果 · 指标曲线与落地标注<span class="anno">改进项落地日画在曲线上;回验=落地前后对比+跨 2 周期看复发</span></h2>
      ${w.trends.map(trendChart).join('')}</section>`;
    html += `<section class="card"><details class="about"><summary>算力账单 · 资源池 × 阶段(利用率待池容量数据)</summary>
      <div class="scroll-x" style="margin-top:8px"><table><tbody><tr>${w.bill.cols
        .map((c) => `<th>${esc(c)}</th>`)
        .join('')}</tr>
      ${w.bill.rows
        .map(
          (r) =>
            `<tr>${r
              .map((c, i) => `<td class="${i > 0 ? 'num' : ''}">${fmt(c)}</td>`)
              .join('')}</tr>`
        )
        .join('')}
      </tbody></table></div><p class="mini">${esc(
        w.bill.note
      )}</p></details></section>`;
    html += `<section class="card"><details class="about"><summary>待人工判读 · 回填台账 / 上期回验</summary>
      ${
        w.backfill.length
          ? `<div class="scroll-x" style="margin-top:8px"><table><tbody><tr><th>机理</th><th>维度</th><th class="num">累计 run</th><th class="num">首现</th><th>状态</th><th>处置(人工判读后回填改判)</th></tr>
      ${w.backfill
        .map(
          (p) =>
            `<tr><td><b>${esc(p.kb)}</b></td><td>${esc(
              p.dim
            )}</td><td class="num">${p.runs}</td><td class="num">${esc(
              p.first
            )}</td><td>${esc(p.status)}</td><td class="mini">${esc(
              p.action
            )}</td></tr>`
        )
        .join('')}
      </tbody></table></div>`
          : '<div class="empty" style="margin-top:8px">本周无待回填条目。</div>'
      }
      <p class="mini" style="margin-top:8px">上期回验:基线周(验证阶段首期),无上期改进项可回验;下期起逐条回填绑定结果指标的前后对比。未回验的改进项不得关闭。</p>
    </details></section>`;
  }
  return html;
}

/* ==========================================================================
   ④ 深度分析(#sec-bottom,末尾折叠,仓库级)
   ========================================================================== */
function renderBottom() {
  const d = D(),
    days = d.days,
    w = d.weekly,
    last = d.boards[days[days.length - 1]],
    s = daySeries(d);
  const platMed = median(s.plat),
    durMed = median(s.dur),
    totWaste = sum(s.waste);
  const order = { P0: 0, P1: 1, P2: 2 };
  const probs = w.probs
    .slice()
    .sort((a, b) => order[a.pri] - order[b.pri] || b.runs - a.runs);
  const topStab =
    probs.find(
      (p) => p.dim === '稳定性' && (p.pri === 'P0' || p.pri === 'P1')
    ) || probs[0];
  const effProb = w.probs.find((p) => p.dim === '效率');
  const wm = w.matrices.cost,
    wmGt = wm.cols.reduce((a, c) => a + (wm.total[c] || 0), 0);
  const wasteShare = wmGt
    ? Math.round(
        (((wm.total['平台失败废弃'] || 0) + (wm.total['取消占用'] || 0)) /
          wmGt) *
          100
      )
    : 0;
  const blk0 = firstNZ(s.block),
    blkL = lastNZ(s.block);
  const backfill = w.probs.filter((p) => /待回填/.test(p.status)).length;
  const pendLast = metaNum(last, '待定率');
  const findings = [
    [
      'crit',
      '稳定性:失败主要是平台的锅,不是贡献者代码',
      `平台故障占比窗口中位 <b>${
        platMed != null ? platMed.toFixed(0) : '—'
      }%</b>;头号机理「${esc(topStab.kb)}」累计 <b>${topStab.runs} run / ${
        topStab.prs
      } PR</b>,命中 ${topStab.days_hit} 天,当前<b>${esc(topStab.status)}</b>。`,
      `支撑:问题管理(${topStab.pri})+ 平台故障占比日趋势。`,
      `${esc(topStab.action || '按机理知识库根因治理')} → ${esc(
        topStab.dest || '基础设施团队'
      )}`,
    ],
    [
      'warn',
      '成本:算力浪费集中在平台侧,可回收',
      `窗口无效机时累计 <b>${totWaste.toFixed(
        0
      )} 机时</b>;成本矩阵中「平台失败废弃+取消占用」约占总机时 <b>${wasteShare}%</b>(代码失败消耗属正常拦截成本,不计入)。`,
      `支撑:成本矩阵(阶段×机时归属)+ 无效机时日趋势。`,
      `治理平台故障与取消占用即可回收;NPU 池容量数据补齐后核算利用率 → 基础设施团队`,
    ],
    [
      'warn',
      '交互体验:被卡住的 PR 在累积,开发者受影响',
      `被 CI 卡住的 PR 由窗口初 <b>${
        blk0 != null ? blk0 : '—'
      }</b> 升至最新 <b>${blkL != null ? blkL : '—'}</b> 个${
        blk0 != null && blkL != null && blkL > blk0 ? '(持续累积)' : ''
      };与平台故障拦截 PR 直接相关。`,
      `支撑:被 CI 卡住的 PR 日趋势 + 稳定性问题的跨维度影响。`,
      `平台故障拦截的 PR 优先解阻;失败信息可读性需求提交平台 → 基础设施团队`,
    ],
    [
      'good',
      '效率:主干反馈稳定,个别阶段需盯',
      `流水线时长中位窗口 <b>${
        durMed != null ? durMed.toFixed(1) : '—'
      } min</b>,总体平稳;${
        effProb
          ? `但「${esc(effProb.kb)}」${esc(effProb.stages || '')}耗时上浮(${esc(
              effProb.status
            )}),需连续观察。`
          : '无显著效率退化。'
      }`,
      `支撑:效率矩阵(阶段×耗时,对前 7 日基线)+ 流水线时长日趋势。`,
      `${effProb ? '对超基线阶段持续观察,暂不立项 → 观察' : '保持,无需动作'}`,
    ],
  ];
  return `<section class="card"><details class="deep">
    <summary><span class="deep-h">深度分析</span><span class="anno">结论与建议行动 · 口径附录(点击展开)</span></summary>
    <div class="deep-body">
      <h3>结论与建议行动<span class="anno" style="font-weight:400">每条结论都对应支撑数据与下一步该做什么;不打总分</span></h3>
      <div class="findings">${findings
        .map(
          (f) =>
            `<div class="finding ${f[0]}"><div class="f-t">${f[1]}</div><div class="f-b">${f[2]}</div><div class="f-ev">${f[3]}</div><div class="f-act"><b>建议</b> ${f[4]}</div></div>`
        )
        .join('')}</div>
      <p class="mini" style="margin-top:10px">治理健康度:最新完整日待定率 <b>${
        pendLast != null ? pendLast + '%' : '—'
      }</b>(目标 &lt;10%);待回填条目 <b>${backfill}</b> 条。改进效果 = 指标曲线 + 改进项落地标注 + 前后对比,不打总分。</p>
      <h3>附录 · 口径与来源</h3>${APPENDIX}
    </div>
  </details></section>`;
}

/* ---------------- 顶层渲染 & 事件 ---------------- */
function paint(which) {
  const d = D();
  document.getElementById('chip-wf').textContent = 'workflow: ' + d.workflow;
  document.getElementById('tab-runtime').className =
    repo === 'runtime' ? 'on' : '';
  document.getElementById('tab-opsnn').className = repo === 'opsnn' ? 'on' : '';
  if (which === 'all' || which === 'top')
    document.getElementById('sec-top').innerHTML = renderTop();
  if (which === 'all' || which === 'mid')
    document.getElementById('sec-mid').innerHTML = renderMid();
  if (which === 'all' || which === 'bottom')
    document.getElementById('sec-bottom').innerHTML = renderBottom();
  writeHash();
}
function render() {
  paint('all');
}
function setRepo(r) {
  repo = r;
  grain = 'daily';
  day = null;
  ovsel = 'probs';
  dim = board()[1].default_dim || 'stability';
  paint('all');
}
function setOv(k) {
  ovsel = ovsel === k ? null : k;
  paint('top');
}
function setGrain(g) {
  grain = g;
  paint('mid');
}
function setDay(dt) {
  day = dt;
  grain = 'daily';
  paint('mid');
}
function setDim(k) {
  if (DIM[k]) dim = k;
  paint('mid');
}
function gotoDay(dt, dk) {
  if (!D().boards[dt]) return;
  grain = 'daily';
  day = dt;
  if (dk && DIM[dk]) dim = dk;
  paint('mid');
  const el = document.getElementById('sec-mid');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function toggleTheme() {
  const r = document.documentElement;
  const cur =
    r.getAttribute('data-theme') ||
    (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
  const next = cur === 'dark' ? 'light' : 'dark';
  r.setAttribute('data-theme', next);
  localStorage.setItem('cogito-theme', next);
  document.getElementById('themebtn').textContent = next === 'dark' ? '☀' : '☾';
}

/* URL hash 深链:#repo/grain/dim[/day] */
function writeHash() {
  const h = `${repo}/${grain}/${dim}${
    grain === 'daily' && day ? '/' + day : ''
  }`;
  if (location.hash.slice(1) !== h) history.replaceState(null, '', '#' + h);
}
function readHash() {
  const p = location.hash.slice(1).split('/');
  if (p[0] && DATA[p[0]]) repo = p[0];
  if (p[1] === 'daily' || p[1] === 'weekly') grain = p[1];
  if (p[2] && DIM[p[2]]) dim = p[2];
  if (grain === 'daily' && p[3] && D().boards[p[3]]) day = p[3];
  if (!DIM[dim]) dim = board()[1].default_dim || 'stability';
}

/* init */
(function () {
  const t = localStorage.getItem('cogito-theme');
  if (t) {
    document.documentElement.setAttribute('data-theme', t);
  }
  const btn = document.getElementById('themebtn');
  if (btn) {
    const cur =
      t ||
      (matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light');
    btn.textContent = cur === 'dark' ? '☀' : '☾';
  }
  readHash();
  render();
})();
window.addEventListener('hashchange', () => {
  readHash();
  render();
});
