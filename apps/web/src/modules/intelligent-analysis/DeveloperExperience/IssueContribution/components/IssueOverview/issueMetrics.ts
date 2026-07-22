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
  p0: number;
  p1: number;
  p2: number;
  repoCount: number;
};

export type IssueOverviewModel = {
  hasData: boolean;
  idxWeighted: number;
  idxGrade: string;
  kpis: IssueKpi[];
  painSummary: IssuePainSummary;
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

/**
 * 取各仓“最新一周”的报告记录：同一仓库（community）可能含多个周期记录，
 * 按 period 字典序取最大者（period 形如 'YYYY-MM-DD_to_YYYY-MM-DD'，字典序即时间序）。
 */
const latestReposByPeriod = (
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
  ];

  return {
    hasData,
    idxWeighted,
    idxGrade,
    kpis,
    painSummary: {
      total: data.topPainTotal,
      p0: data.topPainPriorityCounts.p0,
      p1: data.topPainPriorityCounts.p1,
      p2: data.topPainPriorityCounts.p2,
      repoCount,
    },
    stages,
  };
};
