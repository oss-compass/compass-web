export type IssueReportMetric = {
  code: string;
  name_cn: string;
  display_name: string;
  mean: number;
  median: number;
  cover: number;
  evidence?: string;
  main_reason?: string;
};

export type IssueReportBriefMetric = {
  code: string;
  display_name: string;
  score: number;
  reason: string;
  expected: string;
};

export type IssueReportStage = {
  id: string;
  name: string;
  icon: string;
  is_lens: boolean;
  weight: number;
  mixed: number;
  obj: number;
  subj: number;
  stars: string;
  grade: string;
  pain_count: number;
  pain_pct: number;
  delta: string;
  confidence: string;
  best_metric: {
    code: string;
    name_cn: string;
    display_name: string;
    value: number;
  };
  worst_metric: {
    code: string;
    name_cn: string;
    display_name: string;
    value: number;
  };
  distribution: string;
  metrics_obj: IssueReportMetric[];
  metrics_sub: IssueReportMetric[];
  low_issues: Array<{
    no: string;
    url: string;
    score: number;
    title: string;
    desc: string;
  }>;
  pain_issues?: Array<{
    no: string;
    url: string;
    score: number;
    title: string;
    state: string;
  }>;
  root_cause: string;
  judgment: string;
  core_problem: string;
  brief_metrics: IssueReportBriefMetric[];
  intro: string;
};

export type IssueReportPainIssueEvidence = {
  type: string;
  actor: string;
  text: string;
  url: string;
  time: string;
};

export type IssueReportPainIssue = {
  number: string;
  title: string;
  url: string;
  score: number;
  metric_code: string;
  reason: string;
  evidence: IssueReportPainIssueEvidence[];
};

export type IssueReportPain = {
  prio: string;
  id: string;
  title: string;
  stage_id: string;
  stage_name: string;
  evidence: string;
  impact: string;
  action: string;
  rec_id: string;
  state: string;
  low_score_issues?: IssueReportPainIssue[];
};

export type IssueReportRecommendation = {
  id: string;
  title: string;
  action_title: string;
  prio: string;
  stage_name: string;
  pp_id: string;
  stage_key: string;
  owner_team: string;
  owner_candidate: string;
  trigger: string;
  action: string;
  goal: string;
  action_short: string;
  metric_evidence: string;
  improvement_basis: IssueReportBriefMetric[];
  baseline_score: number | null;
  baseline_value: string;
};

export type IssueReportTrend = {
  period: string;
  n: number;
  idx: number;
  period_label: string;
  delta: string;
  stage_scores: number[];
  incomparable: boolean;
};

export type IssueExperienceReportData = {
  schema_version: string;
  generated_at: string;
  community_name: string;
  platform: string;
  period: string;
  since: string;
  until: string;
  report_md_file: string;
  report_context: {
    project: {
      org: string;
      repo: string;
      platform: string;
    };
    period: string;
    period_label: string;
    report_id: string;
    n_total: number;
    n_open: number;
    n_closed: number;
    close_rate: number;
    confidence: string;
    idx_total: number;
    grade: string;
    delta_total: string;
    cadence: string;
    rubric_version: string;
    data_completeness: number;
    platform_limitations: string;
    type_breakdown: string;
    short_stage_rows: Array<{
      prio: string;
      stage: string;
      score: number;
      problem: string;
    }>;
    trend: IssueReportTrend[];
    trend_summary: string;
    top_pains: IssueReportPain[];
    top_recs: IssueReportRecommendation[];
    ref_metrics: Array<{
      name_cn: string;
      median: string;
      mean: string;
      caliber_note: string;
    }>;
    stages: IssueReportStage[];
    stage_ids: string[];
    participants: {
      summary: string;
      responder_count: number;
      response_count: number;
      top_responders: Array<{ name: string; count: number }>;
      top1_concentration: number;
    };
  };
};

export type IssueReportRecord = {
  key: string;
  org: string;
  platform: string;
  community: string;
  period: string;
  periodLabel: string;
  version: string;
  data: IssueExperienceReportData;
};

export type IssueReportCatalogRecord = Omit<IssueReportRecord, 'data'>;

export type IssueReportFilters = {
  org?: string;
  platform?: string;
  community?: string;
  period?: string;
  version?: string;
};

export type IssueReportApiResponse = {
  catalog: IssueReportCatalogRecord[];
  report: IssueReportRecord | null;
};

// ─────────────────────────────────────────────────────────────
// Issue 贡献总览（跨仓聚合）—— 服务端裁剪为紧凑视图模型后经 API 下发，
// 原始报告体量巨大且仅存于服务端，不进入浏览器包。
// ─────────────────────────────────────────────────────────────

export type IssueOverviewLevel = 'crit' | 'warn' | 'good';

/** 单仓单周期的阶段概览 */
export type IssueOverviewStage = {
  id: string;
  name: string;
  icon: string;
  score: number;
  grade: string;
  painCount: number;
  painPriorityCounts: { p0: number; p1: number; p2: number };
};

/** 单仓单周期概览 */
export type IssueOverviewRepo = {
  community: string; // 例：cann/cann-samples（报告页 repo 查询值）
  repoShort: string; // 例：cann-samples（展示用短名）
  org: string;
  period: string;
  periodLabel: string;
  idxTotal: number;
  grade: string;
  deltaTotal: string;
  nTotal: number;
  nOpen: number;
  nClosed: number;
  closeRate: number;
  confidence: string;
  responderCount: number;
  responseCount: number;
  level: IssueOverviewLevel;
  stages: IssueOverviewStage[];
  idxTrend: number[]; // 该仓综合指数按周（时间升序）
  idxTrendPeriods: string[]; // 与 idxTrend 对齐的周期标签（时间升序）
};

/** 重点待办痛点（跨仓汇总，P0/P1 优先） */
export type IssueOverviewTopPain = {
  key: string;
  community: string;
  repoShort: string;
  period: string;
  periodLabel: string;
  prio: string;
  stageName: string;
  title: string;
  evidence: string;
  impact: string;
  action: string;
  state: string;
};

/** 跨仓逐周聚合序列（用于顶部 KPI 缩略图） */
export type IssueOverviewAggSeries = {
  periods: string[];
  idx: number[]; // 各周综合指数（按问题数加权）
  nTotal: number[]; // 各周问题总数
  closeRate: number[]; // 各周关闭率
};

export type IssueOverviewData = {
  generatedAt: string;
  repos: IssueOverviewRepo[];
  /** 阶段展示顺序（各仓阶段并集，保持报告内出现顺序） */
  stageOrder: Array<{ id: string; name: string; icon: string }>;
  topPains: IssueOverviewTopPain[];
  /** 全部仓库、全部报告周期的 top_pains 合计 */
  topPainTotal: number;
  /** 全部仓库、全部报告周期的 top_pains 按优先级汇总 */
  topPainPriorityCounts: { p0: number; p1: number; p2: number };
  agg: IssueOverviewAggSeries;
};

export type IssueOverviewApiResponse = {
  overview: IssueOverviewData;
};
