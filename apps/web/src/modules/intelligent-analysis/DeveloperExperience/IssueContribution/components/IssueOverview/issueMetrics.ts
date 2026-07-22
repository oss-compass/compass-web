import type { IssueOverviewData } from '../../types';

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

/** 计算 Issue 贡献总览全部模块所需派生数据（跨仓聚合）。 */
export const computeIssueOverview = (
  data: IssueOverviewData
): IssueOverviewModel => {
  const repos = data.repos;
  const hasData = repos.length > 0;
  const repoCount = new Set(repos.map((repo) => repo.community)).size;

  const totalIssues = sum(repos.map((r) => r.nTotal));
  const closedIssues = sum(repos.map((r) => r.nClosed));
  const openIssues = sum(repos.map((r) => r.nOpen));
  const closeRate = totalIssues
    ? Math.round((closedIssues / totalIssues) * 100)
    : 0;

  // 综合体验评分：按问题数加权；问题数为 0 时退化为简单平均
  const idxWeighted = totalIssues
    ? +(sum(repos.map((r) => r.idxTotal * r.nTotal)) / totalIssues).toFixed(1)
    : repos.length
    ? +(sum(repos.map((r) => r.idxTotal)) / repos.length).toFixed(1)
    : 0;
  const idxGrade = gradeFromScore(idxWeighted);

  const topPainCount =
    data.topPainPriorityCounts.p0 + data.topPainPriorityCounts.p1;

  // 阶段聚合：按问题数加权各仓同一阶段的综合分
  const stages: IssueStageAgg[] = data.stageOrder.map((s) => {
    let wSum = 0;
    let nSum = 0;
    let painSum = 0;
    const painPriorityCounts = { p0: 0, p1: 0, p2: 0 };
    repos.forEach((r) => {
      const st = r.stages.find((x) => x.id === s.id);
      if (!st) return;
      const w = r.nTotal || 1;
      wSum += st.score * w;
      nSum += w;
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
      sub: `跨 ${repoCount} 仓全周期加权`,
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
