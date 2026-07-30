import { USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO } from '../../../../UserJourney/rawData/constants';
import type { IssueOverviewData, IssueOverviewRepo } from '../../types';

/**
 * Issue 贡献总览 · 客户端派生计算层
 * 从服务端下发的紧凑 overview 数据派生 KPI、闭环概览与阶段聚合，
 * 纯数据、不含 ReactNode；口径与报告页一致。
 */

export type IssueKpi = {
  label: string;
  value: string;
  sub: string;
  /** 评分等级；存在时由总览卡片展示等级口径提示 */
  grade?: string;
  /** 关联的跨仓逐周趋势序列（有时序的指标才有），用于卡内缩略图 */
  trend?: number[];
  /** 缩略图纵轴上界（百分比类固定 100，计数类取序列最大值） */
  trendMax?: number;
  /** 趋势数值单位（如 % ），用于弹窗大图展示 */
  trendUnit?: string;
};

export type IssueStageAgg = {
  id: string;
  name: string;
  icon: string;
  score: number;
  grade: string;
  painCount: number;
  painPriorityCounts: { p0: number; p1: number; p2: number };
};

export type IssuePainSummary = {
  /** 全部仓库、全部报告周期的 top_pains 合计 */
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  /** 闭环率展示文案；痛点状态尚未开始维护时为 '-' 占位 */
  closeRateLabel: string;
};

/** 各优先级闭环进展面板行（含标签配色，与社区入门总览对齐） */
export type IssuePainPriorityRow = {
  key: 'P0' | 'P1' | 'P2';
  /** 标签展示文案（如 P0完全阻塞），与社区入门优先级面板一致 */
  tagLabel: string;
  description: string;
  tagColor: string;
  tagBg: string;
  tagBorder: string;
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  closeRateLabel: string;
};

/** 周度新增痛点趋势图单周数据点 */
export type IssuePainWeeklyPoint = {
  period: string;
  label: string;
  p0: number;
  p1: number;
  p2: number;
  total: number;
};

export type IssueOverviewModel = {
  hasData: boolean;
  idxWeighted: number;
  idxGrade: string;
  kpis: IssueKpi[];
  painSummary: IssuePainSummary;
  priorityProgress: IssuePainPriorityRow[];
  painWeekly: IssuePainWeeklyPoint[];
  stages: IssueStageAgg[];
};

/** 综合分 → 等级（用于阶段聚合的展示等级） */
export const gradeFromScore = (score: number): string => {
  if (score >= 85) return 'A';
  if (score >= 75) return 'B';
  if (score >= 65) return 'C';
  if (score >= 50) return 'D';
  return 'F';
};

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);

/** 'YYYY-MM-DD_to_YYYY-MM-DD' → 起始日 'MM-DD'（趋势 X 轴短标签） */
export const shortPeriod = (period: string): string => {
  const since = period.split('_to_')[0] ?? period;
  return since.length > 5 ? since.slice(5) : since;
};

/**
 * 闭环率展示文案：痛点状态尚未开始维护（既无已闭环也无进行中）时
 * 用 '-' 占位，避免展示误导性的 0%。
 */
const closeRateLabelOf = (c: {
  total: number;
  inProgress: number;
  resolved: number;
}): string =>
  c.total > 0 && (c.resolved > 0 || c.inProgress > 0)
    ? `${((c.resolved / c.total) * 100).toFixed(1)}%`
    : '-';

// 优先级标签文案/描述取自社区入门痛点等级说明，配色对齐 SEVERITY_CFG tag 色系
const PAIN_PRIORITY_META = [
  {
    key: 'P0' as const,
    bucket: 'p0' as const,
    level: 'P0_BLOCKER',
    tagColor: '#d14343',
    tagBg: '#fff1f0',
    tagBorder: '#ffccc7',
  },
  {
    key: 'P1' as const,
    bucket: 'p1' as const,
    level: 'P1_CRITICAL',
    tagColor: '#f4840c',
    tagBg: '#fff7e8',
    tagBorder: '#ffd8a8',
  },
  {
    key: 'P2' as const,
    bucket: 'p2' as const,
    level: 'P2_MAJOR',
    tagColor: '#4791ff',
    tagBg: '#edf4ff',
    tagBorder: '#bfd7ff',
  },
].map((meta) => {
  const guide = USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO.find(
    (item) => item.level === meta.level
  );
  return {
    ...meta,
    tagLabel: `${meta.key}${guide?.label ?? ''}`,
    description: guide?.description ?? '',
  };
});

/**
 * 后端未下发 painWeekly 时的前端兜底：按周期聚合各仓阶段痛点分布。
 * 阶段痛点即 top_pains 按 stage_id 归属，与后端 painWeekly 口径一致。
 */
const derivePainWeeklyFromRepos = (
  repos: IssueOverviewRepo[]
): IssuePainWeeklyPoint[] => {
  const byPeriod = new Map<string, { p0: number; p1: number; p2: number }>();
  repos.forEach((r) => {
    const counts = byPeriod.get(r.period) ?? { p0: 0, p1: 0, p2: 0 };
    r.stages.forEach((st) => {
      counts.p0 += st.painPriorityCounts.p0;
      counts.p1 += st.painPriorityCounts.p1;
      counts.p2 += st.painPriorityCounts.p2;
    });
    byPeriod.set(r.period, counts);
  });
  return Array.from(byPeriod.keys())
    .sort()
    .map((period) => {
      const counts = byPeriod.get(period)!;
      return {
        period,
        label: shortPeriod(period),
        ...counts,
        total: counts.p0 + counts.p1 + counts.p2,
      };
    });
};

/**
 * 取各仓“最新一周”的报告记录：同一仓库（community）可能含多个周期记录，
 * 按 period 字典序取最大者（period 形如 'YYYY-MM-DD_to_YYYY-MM-DD'，字典序即时间序）。
 * 同时供「各仓库对比」表格只展示各仓最新一周使用。
 */
export const latestReposByPeriod = (
  repos: IssueOverviewRepo[]
): IssueOverviewRepo[] => {
  const byCommunity = new Map<string, IssueOverviewRepo>();
  repos.forEach((r) => {
    const cur = byCommunity.get(r.community);
    if (!cur || r.period > cur.period) byCommunity.set(r.community, r);
  });
  return Array.from(byCommunity.values());
};

/** 计算 Issue 贡献总览全部模块所需派生数据（跨仓聚合）。 */
export const computeIssueOverview = (
  data: IssueOverviewData
): IssueOverviewModel => {
  const repos = data.repos;
  const hasData = repos.length > 0;
  const repoCount = new Set(repos.map((repo) => repo.community)).size;
  // 得分类指标只看各仓最新一周报告（与 CI 总览页“最新日期”口径对齐）
  const latestRepos = latestReposByPeriod(repos);
  const latestIssues = sum(latestRepos.map((r) => r.nTotal));

  const totalIssues = sum(repos.map((r) => r.nTotal));
  const closedIssues = sum(repos.map((r) => r.nClosed));
  const openIssues = sum(repos.map((r) => r.nOpen));
  const closeRate = totalIssues
    ? Math.round((closedIssues / totalIssues) * 100)
    : 0;

  // 综合体验评分：只取各仓最新一周报告，按问题数加权；问题数为 0 时退化为简单平均
  const idxWeighted = latestIssues
    ? +(
        sum(latestRepos.map((r) => r.idxTotal * r.nTotal)) / latestIssues
      ).toFixed(1)
    : latestRepos.length
    ? +(sum(latestRepos.map((r) => r.idxTotal)) / latestRepos.length).toFixed(1)
    : 0;
  const idxGrade = gradeFromScore(idxWeighted);

  const topPainCount =
    data.topPainPriorityCounts.p0 + data.topPainPriorityCounts.p1;

  // 阶段聚合：综合分只取各仓最新一周报告、按问题数加权；
  // 痛点数仍按全周期合计（与「痛点概览」口径一致）。
  const stages: IssueStageAgg[] = data.stageOrder.map((s) => {
    let wSum = 0;
    let nSum = 0;
    latestRepos.forEach((r) => {
      const st = r.stages.find((x) => x.id === s.id);
      if (!st) return;
      const w = r.nTotal || 1;
      wSum += st.score * w;
      nSum += w;
    });
    let painSum = 0;
    const painPriorityCounts = { p0: 0, p1: 0, p2: 0 };
    repos.forEach((r) => {
      const st = r.stages.find((x) => x.id === s.id);
      if (!st) return;
      painSum += st.painCount;
      painPriorityCounts.p0 += st.painPriorityCounts.p0;
      painPriorityCounts.p1 += st.painPriorityCounts.p1;
      painPriorityCounts.p2 += st.painPriorityCounts.p2;
    });
    const score = nSum ? +(wSum / nSum).toFixed(1) : 0;
    return {
      id: s.id,
      name: s.name,
      icon: s.icon,
      score,
      grade: gradeFromScore(score),
      painCount: painSum,
      painPriorityCounts,
    };
  });

  const kpis: IssueKpi[] = [
    {
      label: '综合体验评分',
      value: idxWeighted.toFixed(1),
      sub: `跨 ${repoCount} 仓最新一周加权`,
      grade: idxGrade,
      trend: data.agg.idx,
      trendMax: 100,
    },
    {
      label: '重点待办(P0/P1)',
      value: String(topPainCount),
      sub: '高优先级痛点',
    },
    {
      label: 'Issue 总数',
      value: String(totalIssues),
      sub: `覆盖 ${repoCount} 个仓库的全部周期`,
      trend: data.agg.nTotal,
    },
    {
      label: 'Issue 关闭率',
      value: `${closeRate}%`,
      sub: `已关闭 ${closedIssues} / 未关闭 ${openIssues}`,
      trend: data.agg.closeRate,
      trendMax: 100,
      trendUnit: '%',
    },
    {
      label: '扫描仓数',
      value: String(repoCount),
      sub: '纳入总览统计的仓库数',
    },
  ];

  // 痛点状态汇总：旧后端未下发时按全部待处理兜底
  const statusCounts = data.topPainStatusCounts ?? {
    pending: data.topPainTotal,
    inProgress: 0,
    resolved: 0,
  };

  // 各优先级闭环进展：旧后端未下发时用优先级计数兜底（全部待处理）
  const priorityProgress: IssuePainPriorityRow[] = PAIN_PRIORITY_META.map(
    (meta) => {
      const bucket = data.topPainPriorityProgress?.[meta.bucket] ?? {
        total: data.topPainPriorityCounts[meta.bucket],
        pending: data.topPainPriorityCounts[meta.bucket],
        inProgress: 0,
        resolved: 0,
      };
      return {
        key: meta.key,
        tagLabel: meta.tagLabel,
        description: meta.description,
        tagColor: meta.tagColor,
        tagBg: meta.tagBg,
        tagBorder: meta.tagBorder,
        total: bucket.total,
        pending: bucket.pending,
        inProgress: bucket.inProgress,
        resolved: bucket.resolved,
        closeRateLabel: closeRateLabelOf(bucket),
      };
    }
  );

  // 周度新增痛点趋势：旧后端未下发时按各仓阶段痛点分布兜底聚合
  const weekly = data.painWeekly;
  const painWeekly: IssuePainWeeklyPoint[] = weekly
    ? weekly.periods.map((period, i) => {
        const p0 = weekly.p0[i] ?? 0;
        const p1 = weekly.p1[i] ?? 0;
        const p2 = weekly.p2[i] ?? 0;
        return {
          period,
          label: shortPeriod(period),
          p0,
          p1,
          p2,
          total: p0 + p1 + p2,
        };
      })
    : derivePainWeeklyFromRepos(repos);

  return {
    hasData,
    idxWeighted,
    idxGrade,
    kpis,
    painSummary: {
      total: data.topPainTotal,
      pending: statusCounts.pending,
      inProgress: statusCounts.inProgress,
      resolved: statusCounts.resolved,
      closeRateLabel: closeRateLabelOf({
        total: data.topPainTotal,
        inProgress: statusCounts.inProgress,
        resolved: statusCounts.resolved,
      }),
    },
    priorityProgress,
    painWeekly,
    stages,
  };
};
