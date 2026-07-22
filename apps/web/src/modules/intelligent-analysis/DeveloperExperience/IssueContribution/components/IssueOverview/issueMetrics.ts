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
};

export type IssueClosure = {
  /** 主要问题数：各仓最新一期 top_pains 合计（真实总量，不受表格截断影响） */
  mainProblems: number;
  total: number;
  closed: number;
  open: number;
  closeRate: number;
  repoCount: number;
  topPainCount: number;
};

export type IssueOverviewModel = {
  hasData: boolean;
  idxWeighted: number;
  idxGrade: string;
  kpis: IssueKpi[];
  closure: IssueClosure;
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

const isP01 = (prio: string) => /P0|P1/i.test(prio);

/** 计算 Issue 贡献总览全部模块所需派生数据（跨仓聚合）。 */
export const computeIssueOverview = (
  data: IssueOverviewData
): IssueOverviewModel => {
  const repos = data.repos;
  const hasData = repos.length > 0;

  const totalIssues = sum(repos.map((r) => r.nTotal));
  const closedIssues = sum(repos.map((r) => r.nClosed));
  const openIssues = sum(repos.map((r) => r.nOpen));
  const closeRate = totalIssues
    ? Math.round((closedIssues / totalIssues) * 100)
    : 0;

  // 综合体验指数：按问题数加权；问题数为 0 时退化为简单平均
  const idxWeighted = totalIssues
    ? +(sum(repos.map((r) => r.idxTotal * r.nTotal)) / totalIssues).toFixed(1)
    : repos.length
    ? +(sum(repos.map((r) => r.idxTotal)) / repos.length).toFixed(1)
    : 0;
  const idxGrade = gradeFromScore(idxWeighted);

  const avgCompleteness = repos.length
    ? Math.round(sum(repos.map((r) => r.dataCompleteness)) / repos.length)
    : 0;
  const topPainCount = data.topPains.filter((p) => isP01(p.prio)).length;

  // 阶段聚合：按问题数加权各仓同一阶段的综合分
  const stages: IssueStageAgg[] = data.stageOrder.map((s) => {
    let wSum = 0;
    let nSum = 0;
    let painSum = 0;
    repos.forEach((r) => {
      const st = r.stages.find((x) => x.id === s.id);
      if (!st) return;
      const w = r.nTotal || 1;
      wSum += st.score * w;
      nSum += w;
      painSum += st.painCount;
    });
    const score = nSum ? +(wSum / nSum).toFixed(1) : 0;
    return {
      id: s.id,
      name: s.name,
      icon: s.icon,
      score,
      grade: gradeFromScore(score),
      painCount: painSum,
    };
  });

  const kpis: IssueKpi[] = [
    {
      label: '综合体验指数',
      value: idxWeighted.toFixed(1),
      sub: `等级 ${idxGrade} · 跨 ${repos.length} 仓加权`,
      trend: data.agg.idx,
      trendMax: 100,
    },
    {
      label: '问题总数',
      value: String(totalIssues),
      sub: `覆盖 ${repos.length} 个仓库`,
      trend: data.agg.nTotal,
    },
    {
      label: '关闭率',
      value: `${closeRate}%`,
      sub: `已关闭 ${closedIssues} / 未关闭 ${openIssues}`,
      trend: data.agg.closeRate,
      trendMax: 100,
      trendUnit: '%',
    },
    {
      label: '未关闭问题',
      value: String(openIssues),
      sub: '待跟进 issue 总数',
    },
    {
      label: '重点待办(P0/P1)',
      value: String(topPainCount),
      sub: '高优先级痛点',
    },
    {
      label: '平均数据完整度',
      value: `${avgCompleteness}%`,
      sub: '报告口径可信度',
    },
  ];

  return {
    hasData,
    idxWeighted,
    idxGrade,
    kpis,
    closure: {
      mainProblems: data.topPainTotal,
      total: totalIssues,
      closed: closedIssues,
      open: openIssues,
      closeRate,
      repoCount: repos.length,
      topPainCount,
    },
    stages,
  };
};
