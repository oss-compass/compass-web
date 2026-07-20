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
  root_cause: string;
  judgment: string;
  core_problem: string;
  brief_metrics: IssueReportBriefMetric[];
  intro: string;
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
