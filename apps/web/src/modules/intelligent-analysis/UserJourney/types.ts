import React from 'react';

export type Tone = 'critical' | 'warning' | 'positive' | 'neutral';

export type OverviewMetric = {
  key: string;
  title: string;
  value: string;
  suffix?: string;
  description: string;
  stage: string;
  recentValues?: string;
  tone: Tone;
  color: string;
};

export type ReportMetadataItem = {
  key: string;
  label: string;
  value: string;
  tone?: 'default' | 'mono';
  href?: string;
};

export type MetricTrend = {
  values: number[];
  unit: string;
  joiner?: string;
  integerAxis?: boolean;
  clampMin?: number;
  clampMax?: number;
};

export type ActionStatus = 'success' | 'warning' | 'failed' | 'neutral';

export type ActionResultValue = boolean | string | null;

export type StepMetric = {
  label: string;
  value: string;
  benchmark: string;
  note: string;
  tone: Tone;
  trend?: MetricTrend;
};

export type ActionDetailRecord = {
  label: string;
  description: string;
  duration?: string;
  result?: ActionResultValue;
  status?: ActionStatus;
  statusLabel?: string;
};

export type ActionCard = {
  title: string;
  summary?: string;
  detail?: string;
  details?: ActionDetailRecord[];
  actionType?: string;
  duration?: string;
  status?: ActionStatus;
  statusLabel?: string;
};

export type PainLevel =
  | 'P0_BLOCKER'
  | 'P1_CRITICAL'
  | 'P2_MAJOR'
  | 'P3_MINOR'
  | 'P4_TRIVIAL';

export type PainGuideItem = {
  level: PainLevel;
  scoreRange: string;
  label: string;
  english: string;
  description: string;
  rowClassName: string;
};

export type JourneyStep = {
  key: string;
  code: string;
  title: string;
  summary: string;
  description: string;
  iconKey: string;
  icon: React.ReactNode;
  color: string;
  score: number;
  panoramaScore: number;
  benchmarkScore: number;
  timeShare: string;
  painLevel: PainLevel;
  painLabel: string;
  actions: string[];
  actionCards?: ActionCard[];
  executionPath?: ActionDetailRecord[];
  tools: string[];
  painNarrative: string;
  painSummary: string;
  painPoints?: string[];
  recommendation: string;
  metrics: StepMetric[];
};

export type ProjectInfo = {
  name: string;
  version?: string;
};

export type JourneyRecommendation = {
  key: string;
  priority: string;
  title: string;
  description: string;
};

export type UserJourneyProjectData = {
  projectKey: string;
  agentVersion: string;
  reportUpdatedAt: string;
  reportDetailUrl?: string;
  projectInfo: ProjectInfo;
  developerTypeOptions: string[];
  defaultDeveloperType: string;
  journeyModeOptions: string[];
  defaultJourneyMode: string;
  overviewMetrics: OverviewMetric[];
  recommendations: JourneyRecommendation[];
  reportMetadata: ReportMetadataItem[];
  journeySteps: JourneyStep[];
};

export type UserJourneyProjectView = {
  queryKey: string;
  data: UserJourneyProjectData;
};

export type BackendMetric = {
  metric_id: string;
  metric_name: string;
  value: number | string | null;
  unit: string;
  benchmark_value: number | string | null;
  score: number | null;
  evidence: string;
  applicable: boolean;
  ui?: {
    display_value?: string;
    display_benchmark?: string;
    note?: string;
    tone?: Tone;
    trend?: MetricTrend;
  };
};

export type BackendAction = {
  action_type: string;
  detail: string;
  duration: string;
  timestamp: string | null;
  success: ActionResultValue;
  error_message: string | null;
};

export type BackendAssessment = {
  project_id: string;
  actual_path: {
    actions: BackendAction[];
    total_duration_seconds: number;
    retry_count: number;
  };
  subjective: {
    pain_level: string;
    pain_summary: string;
    narrative: string;
    metrics: BackendMetric[];
  };
  objective: {
    metrics: BackendMetric[];
  };
  pros: string;
  cons: string;
};

export type BackendJourneyStep = {
  step_id: string;
  step_name: string;
  step_description: string;
  expected_duration_minutes: number;
  per_project_assessments: BackendAssessment[];
};

export type BackendRecommendation = {
  priority: string;
  category: string;
  title: string;
  description: string;
  expected_improvement: string;
  related_metric_ids?: string[];
  affected_metrics?: string[];
};

export type BackendDivergenceAlert = {
  step_id: string;
  alert_type: string;
  severity: string;
  message: string;
};

export type BackendReportData = {
  report_detail_url?: string;
  meta: {
    report_id: string;
    report_title: string;
    generated_at: string;
    agent_version: string;
    purpose?: string;
    persona?: {
      role?: string;
      background?: string;
      hardware_access?: string;
      language?: string;
    };
  };
  project: {
    project_id: string;
    project_name: string;
    repo_url: string;
    platform: string;
    description: string;
  };
  overall_scores: {
    sdx_avg_score: number;
    obj_avg_score: number;
    composite_score: number;
    grade: string;
  };
  e2e_metrics: BackendMetric[];
  journey_steps: BackendJourneyStep[];
  recommendations: BackendRecommendation[];
  divergence_alerts: BackendDivergenceAlert[];
  key_insight: string;
};
