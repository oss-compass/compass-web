import type {
  CiPri,
  CiRepoData,
  CiRepoKey,
  CiWeeklyProb,
  CiDimKey,
  CiJourneyScores,
} from '../../types';
import {
  daySeries,
  delta,
  firstNZ,
  lastNZ,
  median,
  metaNum,
  num,
  pick,
  sum,
  type CiDaySeries,
  type CiDelta,
} from '../../helpers';
import { CI_JOURNEY } from '../CiReport/journeyData';

/**
 * 社区 CI/CD 总览 · 跨仓聚合计算层
 * 移植自 dashboard/CANN_CICD_Overview.html 渲染层数学（runtime + ops-nn 合并），
 * 纯数据、不含 ReactNode；口径与 helpers / 详细看板一致。
 */

export type CiLevel = 'crit' | 'warn' | 'good';

const LEVEL_TEXT: Record<CiLevel, string> = {
  crit: '需重点关注',
  warn: '需关注',
  good: '总体平稳',
};

const PRI_NAME: Record<CiPri, string> = {
  P0: '完全阻塞',
  P1: '关键卡点',
  P2: '显著影响',
};

const PRI_DESC: Record<CiPri, string> = {
  P0: '完全阻塞 · 平台侧故障导致流水线大面积挂死，贡献者无法自行解决，需基础设施团队优先处理。',
  P1: '关键卡点 · 平台或环境问题造成显著失败/耗时上浮，影响多个 PR，需限期治理。',
  P2: '显著影响 · 局部退化或待观察项，暂不阻塞主干，持续跟踪或待人工判读。',
};

/** 仓库顺序（runtime 优先，与详细看板一致） */
const REPO_ORDER: CiRepoKey[] = ['runtime', 'opsnn'];
const repoSlug = (repo: CiRepoKey) => (repo === 'opsnn' ? 'ops-nn' : 'runtime');

const isActive = (p: { status: string }) => /^仍活跃/.test(p.status);
const isFaded = (p: { status: string }) => /已消退/.test(p.status);
const isBackfill = (p: { status: string }) => /待回填/.test(p.status);

/** 周对比行按结果指标标签子串取行 */
const cmpRow = (w: CiRepoData['weekly'], label: string) =>
  (w.dimcmp || []).find((r) => String(r[1]).indexOf(label) >= 0);

/** 单仓聚合结果（供「各仓库对比」与跨仓汇总复用） */
export type CiRepoSummary = {
  repo: CiRepoKey;
  slug: string;
  workflow: string;
  days: string[];
  s: CiDaySeries;
  run: (number | null)[];
  fail: (number | null)[];
  totRun: number;
  totFail: number;
  failRate: number;
  platMed: number | null;
  totWaste: number;
  wasteShare: number;
  wasteNum: number;
  wasteDen: number;
  durMed: number | null;
  blk0: number | null;
  blkL: number | null;
  activeP01: number;
  scoreOverall: number | null;
  scoreStability: number | null;
  scoreEfficiency: number | null;
  scoreInteraction: number | null;
  scoreCost: number | null;
  faded: number;
  backfill: number;
  hasP0: boolean;
  level: CiLevel;
};

/** 单仓报告概览得分 · 最新日期（该仓最新非空观测日的日分，口径同 CI 报告页概览） */
const repoScoreLatest = (
  repo: CiRepoKey,
  sel: (sc: CiJourneyScores) => number | null
): number | null => {
  const j = CI_JOURNEY[repo];
  if (!j) return null;
  for (let i = j.days.length - 1; i >= 0; i--) {
    const b = j.boards[j.days[i]];
    const v = b?.scores ? sel(b.scores) : null;
    if (v != null) return v;
  }
  return null;
};

const repoSummary = (repo: CiRepoKey, d: CiRepoData): CiRepoSummary => {
  const w = d.weekly;
  const s = daySeries(d);
  const run = d.days.map((dt) => metaNum(d.boards[dt], 'run'));
  const fail = d.days.map((dt) => metaNum(d.boards[dt], '失败'));
  const totRun = sum(run);
  const totFail = sum(fail);
  const failRate = totRun ? (totFail / totRun) * 100 : 0;
  const platMed = median(s.plat);
  const totWaste = sum(s.waste);
  const durMed = median(s.dur);
  const blk0 = firstNZ(s.block);
  const blkL = lastNZ(s.block);
  const wm = w.matrices.cost;
  const wasteDen = wm.cols.reduce((a, c) => a + (wm.total[c] || 0), 0);
  const wasteNum =
    (wm.total['平台失败废弃'] || 0) + (wm.total['取消占用'] || 0);
  const wasteShare = wasteDen ? Math.round((wasteNum / wasteDen) * 100) : 0;
  const activeP01 = w.probs.filter((p) => isActive(p) && p.pri !== 'P2').length;
  const hasP0 = w.probs.some((p) => p.pri === 'P0' && isActive(p));
  const faded = w.probs.filter(isFaded).length;
  const backfill = w.probs.filter(isBackfill).length;
  const level: CiLevel = hasP0
    ? 'crit'
    : activeP01 > 0 || (platMed != null && platMed >= 40)
    ? 'warn'
    : 'good';
  return {
    repo,
    slug: repoSlug(repo),
    workflow: d.workflow,
    days: d.days,
    s,
    run,
    fail,
    totRun,
    totFail,
    failRate,
    platMed,
    totWaste,
    wasteShare,
    wasteNum,
    wasteDen,
    durMed,
    blk0,
    blkL,
    activeP01,
    scoreOverall: repoScoreLatest(repo, (sc) => sc.total),
    scoreStability: repoScoreLatest(
      repo,
      (sc) => sc.dims.stability?.score ?? null
    ),
    scoreEfficiency: repoScoreLatest(
      repo,
      (sc) => sc.dims.efficiency?.score ?? null
    ),
    scoreInteraction: repoScoreLatest(
      repo,
      (sc) => sc.dims.interaction?.score ?? null
    ),
    scoreCost: repoScoreLatest(repo, (sc) => sc.dims.cost?.score ?? null),
    faded,
    backfill,
    hasP0,
    level,
  };
};

export type CiAggSeries = {
  days: string[];
  failRate: number[];
  plat: number[];
  block: (number | null)[];
  waste: number[];
  hours: number[];
};

/** 跨仓逐日序列（日期取并集；比率类按失败数加权合并） */
const aggSeries = (summaries: CiRepoSummary[]): CiAggSeries => {
  const seen: Record<string, true> = {};
  const days: string[] = [];
  summaries.forEach((x) =>
    x.days.forEach((dt) => {
      if (!seen[dt]) {
        seen[dt] = true;
        days.push(dt);
      }
    })
  );
  days.sort();
  const map: Record<
    string,
    Record<
      string,
      {
        run: number | null;
        fail: number | null;
        plat: number | null;
        waste: number | null;
        block: number | null;
        hours: number | null;
      }
    >
  > = {};
  summaries.forEach((x) => {
    map[x.repo] = {};
    x.days.forEach((dt, i) => {
      map[x.repo][dt] = {
        run: x.run[i],
        fail: x.fail[i],
        plat: x.s.plat[i],
        waste: x.s.waste[i],
        block: x.s.block[i],
        hours: x.s.hours[i],
      };
    });
  });
  const failRate: number[] = [];
  const plat: number[] = [];
  const block: (number | null)[] = [];
  const waste: number[] = [];
  const hours: number[] = [];
  for (const dt of days) {
    let R = 0;
    let F = 0;
    let pw = 0;
    let pf = 0;
    let bk = 0;
    let ws = 0;
    let hr = 0;
    let anyBk = false;
    for (const x of summaries) {
      const c = map[x.repo][dt];
      if (!c) continue;
      R += c.run || 0;
      F += c.fail || 0;
      if (c.plat != null && c.fail) {
        pw += c.plat * c.fail;
        pf += c.fail;
      }
      if (c.block != null) {
        bk += c.block;
        anyBk = true;
      }
      ws += c.waste || 0;
      hr += c.hours || 0;
    }
    failRate.push(R ? +((F / R) * 100).toFixed(1) : 0);
    plat.push(pf ? +(pw / pf).toFixed(1) : 0);
    block.push(anyBk ? bk : null);
    waste.push(+ws.toFixed(1));
    hours.push(+hr.toFixed(1));
  }
  return { days, failRate, plat, block, waste, hours };
};

/** 顶部 KPI 卡 */
export type CiKpi = {
  label: string;
  value: string;
  sub: string;
  bad: boolean;
  delta?: CiDelta;
  /** 关联趋势序列（有时序数据的指标才有），用于卡内缩略图 + 弹窗大图 */
  trend?: CiTrendItem;
};

/** 问题闭环优先级卡 */
export type CiPriCard = {
  pri: CiPri;
  name: string;
  desc: string;
  active: number;
  faded: number;
  backfill: number;
  total: number;
  rate: number;
};

/** 关键指标趋势项 */
export type CiTrendItem = {
  title: string;
  meaning: string;
  values: (number | null)[];
  unit: string;
  color: string;
  last: number | null;
  delta: CiDelta;
};

/** 重点待办问题行 */
export type CiTopIssue = {
  key: string;
  slug: string;
  pri: CiPri;
  status: string;
  first: string;
  dim: string;
  kb: string;
  stages: string;
  /** 映射后的开发者旅程全景图段名（按旅程顺序去重） */
  journeyStages: string[];
  runs: number;
  prs: number;
  daysHit: number;
  trend: number[];
  action: string;
  dest: string;
};

export type CiCommunityOverview = {
  hasData: boolean;
  overallLevel: CiLevel;
  levelText: string;
  platShareAll: number | null;
  blockedAll: number;
  wasteAll: number;
  wasteShareAll: number;
  kpis: CiKpi[];
  repos: CiRepoSummary[];
  agg: CiAggSeries;
  closure: {
    total: number;
    active: number;
    faded: number;
    backfill: number;
    rate: number;
    cards: CiPriCard[];
  };
  trends: CiTrendItem[];
  topIssues: CiTopIssue[];
  /** 开发者旅程全景图段顺序（供「涉及阶段」列筛选与排序） */
  journeyStageOrder: string[];
};

type ProbWithRepo = CiWeeklyProb & { repo: CiRepoKey; slug: string };

/** 关键指标趋势配色（对齐设计稿语义：红=风险 / 紫=PR / 琥珀=机时） */
const TREND_CRITICAL = '#d03b3b';
const TREND_SERIES2 = '#7c4dd6';
const TREND_WARNING = '#fab219';

const last = <T>(a: T[]): T | undefined => a[a.length - 1];

/**
 * workflow 原生阶段短名 → 开发者旅程全景图段名 + 段顺序。
 * 口径同旅程全景图：取各仓最新观测日的八段定义并集，由 bare（如 image/compile/ut/PreSmoke）反查段名。
 */
const buildJourneyStageMap = (): {
  bareToSeg: Record<string, string>;
  order: string[];
} => {
  const bareToSeg: Record<string, string> = {};
  const order: string[] = [];
  REPO_ORDER.forEach((repo) => {
    const j = CI_JOURNEY[repo];
    if (!j || !j.days.length) return;
    const board = j.boards[j.days[j.days.length - 1]];
    (board?.stages ?? []).forEach((st) => {
      if (!order.includes(st.seg)) order.push(st.seg);
      st.bare.forEach((b) => {
        if (b) bareToSeg[b] = st.seg;
      });
    });
  });
  return { bareToSeg, order };
};

/** 将周问题的 workflow 阶段串（如 "compile/ut"）映射为旅程全景图段名（按段顺序去重，无法映射的注释 token 丢弃） */
const mapProbStages = (
  raw: string,
  bareToSeg: Record<string, string>,
  order: string[]
): string[] => {
  const segs: string[] = [];
  String(raw || '')
    .split('/')
    .map((t) => t.trim())
    .filter(Boolean)
    .forEach((t) => {
      const seg = bareToSeg[t];
      if (seg && !segs.includes(seg)) segs.push(seg);
    });
  return segs.sort((a, b) => order.indexOf(a) - order.indexOf(b));
};

/** 计算社区 CI/CD 总览全部模块所需数据（跨仓聚合）。 */
export const computeCommunityOverview = (
  data: Record<CiRepoKey, CiRepoData>
): CiCommunityOverview => {
  const repos = REPO_ORDER.filter((r) => data[r]).map((r) =>
    repoSummary(r, data[r])
  );
  const agg = aggSeries(repos);
  const hasData = repos.some((x) => x.days.length > 0);

  const allProbs: ProbWithRepo[] = [];
  repos.forEach((x) =>
    data[x.repo].weekly.probs.forEach((p) =>
      allProbs.push({ ...p, repo: x.repo, slug: x.slug })
    )
  );

  const totFailAll = sum(repos.map((x) => x.totFail));
  const platShareAll =
    totFailAll > 0
      ? sum(repos.map((x) => (x.platMed || 0) * x.totFail)) / totFailAll
      : null;
  const blockedAll = sum(repos.map((x) => x.blkL || 0));
  const blocked0All = sum(repos.map((x) => x.blk0 || 0));
  const wasteAll = sum(repos.map((x) => x.totWaste));
  const wasteDenAll = sum(repos.map((x) => x.wasteDen));
  const wasteNumAll = sum(repos.map((x) => x.wasteNum));
  const wasteShareAll = wasteDenAll
    ? Math.round((wasteNumAll / wasteDenAll) * 100)
    : 0;
  const overallLevel: CiLevel = repos.some((x) => x.level === 'crit')
    ? 'crit'
    : repos.some((x) => x.level === 'warn')
    ? 'warn'
    : 'good';

  const dFail = delta(
    agg.failRate[0] ?? null,
    last(agg.failRate) ?? null,
    true
  );
  const dBlk = delta(blocked0All, blockedAll, true);
  const dWaste = delta(agg.waste[0] ?? null, last(agg.waste) ?? null, true);

  // 报告概览五项得分 · 最新日期：取两仓最新非空观测日的非空日分池化后的当日值，
  // 得分权威口径取自 CI_JOURNEY[repo].boards[day].scores（与 CI 报告页概览同源）。
  const scoreDayLatest = (
    sel: (s: CiJourneyScores) => number | null
  ): { latest: number | null; series: (number | null)[] } => {
    const series = agg.days.map((dt) => {
      const perDay: number[] = [];
      repos.forEach((x) => {
        const b = CI_JOURNEY[x.repo]?.boards[dt];
        const v = b?.scores ? sel(b.scores) : null;
        if (v != null) {
          perDay.push(v);
        }
      });
      return perDay.length
        ? +(perDay.reduce((a, b) => a + b, 0) / perDay.length).toFixed(1)
        : null;
    });
    const lastVal = lastNZ(series);
    const latest = lastVal != null ? Math.round(lastVal) : null;
    return { latest, series };
  };

  const scoreDefs: Array<{
    key: 'overall' | CiDimKey;
    label: string;
    sub: string;
    color: string;
    sel: (s: CiJourneyScores) => number | null;
  }> = [
    {
      key: 'overall',
      label: '综合体验评分',
      sub: '四维加权综合 · 最新日期',
      color: TREND_SERIES2,
      sel: (s) => s.total,
    },
    {
      key: 'stability',
      label: '稳定性',
      sub: '稳定性维度 · 最新日期',
      color: TREND_CRITICAL,
      sel: (s) => s.dims.stability?.score ?? null,
    },
    {
      key: 'efficiency',
      label: '效率',
      sub: '效率维度 · 最新日期',
      color: TREND_WARNING,
      sel: (s) => s.dims.efficiency?.score ?? null,
    },
    {
      key: 'interaction',
      label: '交互体验',
      sub: '交互体验维度 · 最新日期',
      color: TREND_SERIES2,
      sel: (s) => s.dims.interaction?.score ?? null,
    },
    {
      key: 'cost',
      label: '成本',
      sub: '成本维度 · 最新日期',
      color: TREND_WARNING,
      sel: (s) => s.dims.cost?.score ?? null,
    },
  ];

  const kpis: CiKpi[] = scoreDefs.map((def) => {
    const { latest, series } = scoreDayLatest(def.sel);
    const first = firstNZ(series);
    const lastVal = lastNZ(series);
    const d = delta(first, lastVal, false);
    return {
      label: def.label,
      value: latest != null ? String(latest) : '—',
      sub: def.sub,
      bad: latest != null && latest < 60,
      delta: d,
      trend: {
        title: def.label,
        meaning: def.sub,
        values: series,
        unit: '分',
        color: def.color,
        last: lastVal,
        delta: d,
      },
    };
  });

  const total = allProbs.length;
  const activeCount = allProbs.filter(isActive).length;
  const fadedCount = allProbs.filter(isFaded).length;
  const backfillCount = allProbs.filter(isBackfill).length;
  const closureRate = total ? Math.round((fadedCount / total) * 100) : 0;
  const cards: CiPriCard[] = (['P0', 'P1', 'P2'] as CiPri[]).map((pri) => {
    const ps = allProbs.filter((p) => p.pri === pri);
    const t = ps.length;
    const faded = ps.filter(isFaded).length;
    return {
      pri,
      name: PRI_NAME[pri],
      desc: PRI_DESC[pri],
      active: ps.filter(isActive).length,
      faded,
      backfill: ps.filter(isBackfill).length,
      total: t,
      rate: t ? Math.round((faded / t) * 100) : 0,
    };
  });

  const trends: CiTrendItem[] = [
    {
      title: '流水线失败率',
      meaning: '完结 run 里失败的比例（两仓合并）',
      values: agg.failRate,
      unit: '%',
      color: TREND_CRITICAL,
      last: last(agg.failRate) ?? null,
      delta: dFail,
    },
    {
      title: '平台故障占比',
      meaning: '失败里属平台自身故障（失败数加权）',
      values: agg.plat,
      unit: '%',
      color: TREND_CRITICAL,
      last: last(agg.plat) ?? null,
      delta: delta(agg.plat[0] ?? null, last(agg.plat) ?? null, true),
    },
    {
      title: '被 CI 卡住的 PR',
      meaning: '被失败流水线阻塞的 PR 数（两仓合计）',
      values: agg.block.map((v) => (v == null ? 0 : v)),
      unit: '个',
      color: TREND_SERIES2,
      last: last(agg.block) ?? null,
      delta: dBlk,
    },
    {
      title: '无效机时',
      meaning: '浪费在非代码失败上的算力（两仓合计）',
      values: agg.waste,
      unit: '机时',
      color: TREND_WARNING,
      last: last(agg.waste) ?? null,
      delta: dWaste,
    },
    {
      title: '每日机时',
      meaning: '当日 CI 总算力消耗，观察量（两仓合计）',
      values: agg.hours,
      unit: '机时',
      color: TREND_WARNING,
      last: last(agg.hours) ?? null,
      delta: delta(agg.hours[0] ?? null, last(agg.hours) ?? null, false),
    },
  ];

  const order: Record<CiPri, number> = { P0: 0, P1: 1, P2: 2 };
  // 状态排序权重：仍活跃优先靠前，其次待回填，最后已消退
  const statusRank = (p: { status: string }) =>
    isActive(p) ? 0 : isBackfill(p) ? 1 : isFaded(p) ? 2 : 3;
  const { bareToSeg: stageBareToSeg, order: journeyStageOrder } =
    buildJourneyStageMap();
  const topIssues: CiTopIssue[] = allProbs
    .sort(
      (a, b) =>
        statusRank(a) - statusRank(b) ||
        order[a.pri] - order[b.pri] ||
        b.runs - a.runs
    )
    .map((p, i) => ({
      key: `${p.repo}-${p.kb}-${i}`,
      slug: p.slug,
      pri: p.pri,
      status: p.status,
      first: p.first,
      dim: p.dim,
      kb: p.kb,
      stages: p.stages,
      journeyStages: mapProbStages(p.stages, stageBareToSeg, journeyStageOrder),
      runs: p.runs,
      prs: p.prs,
      daysHit: p.days_hit,
      trend: p.trend,
      action: p.action,
      dest: p.dest,
    }));

  return {
    hasData,
    overallLevel,
    levelText: LEVEL_TEXT[overallLevel],
    platShareAll,
    blockedAll,
    wasteAll,
    wasteShareAll,
    kpis,
    repos,
    agg,
    closure: {
      total,
      active: activeCount,
      faded: fadedCount,
      backfill: backfillCount,
      rate: closureRate,
      cards,
    },
    trends,
    topIssues,
    journeyStageOrder,
  };
};
