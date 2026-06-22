import type { OverviewPainPointRow } from '../rawData/apiClient';

export type Severity = OverviewPainPointRow['severity'];
export type ProgressTab = 'overall' | 'key';
export type ProgressView = 'team' | 'repo';
export type IssueSourceMode = 'overall' | 'common' | 'non-common';
export type IssueBucket = 'pending' | 'inProgress' | 'resolved' | 'na';
export type RepoSortKey =
  | 'name'
  | 'team'
  | 'score'
  | 'successRate'
  | 'executionTime'
  | 'total'
  | 'closeRate'
  | 'detail';
export type TeamSortKey =
  | 'name'
  | 'repoCount'
  | 'score'
  | 'successRate'
  | 'executionTime'
  | 'total'
  | 'closeRate';

export type DashboardIssue = OverviewPainPointRow & {
  repoName: string;
  team: string;
  score: number | null;
  successRate: number | null;
  normalizedStatus: IssueBucket;
};

export type MetricSummary = {
  total: number;
  pending: number;
  inProgress: number;
  resolved: number;
  na: number;
  closeRate: number;
};

export type IssueTypeCount = {
  issueType: string;
  count: number;
};

export type WeeklyCloseRateTrendPoint = {
  weekStart: string;
  weekEnd: string;
  label: string;
  total: number;
  p0: number;
  p1: number;
  p2: number;
  p3: number;
  issueTypeCounts?: IssueTypeCount[];
  closeRate: number;
};

export type TrendWindow =
  | { kind: 'weeks'; weeks: number }
  | { kind: 'range'; start: string; end: string };

export type ScoreHistoryEntry = {
  reportId: string;
  date: string;
  score: number;
};

export type CapabilityBenchmarkScoreItem = {
  key: string;
  label: string;
  cannScore: number | null;
  benchmarkScore: number | null;
};

export type CapabilityBenchmarkData = {
  repoKey: string;
  repoName: string;
  latestReportId?: string;
  detailReportUrl?: string;
  latestScore?: number | null;
  latestSuccessRate?: number | null;
  latestExecutionTime?: number | null;
  hardwareEnv?: string;
  scoreBreakdown: CapabilityBenchmarkScoreItem[];
};

export type OverviewCapabilityBenchmarkSummary = {
  pairCount: number;
  includedPairs: Array<{
    cannRepoName: string;
    benchmarkRepoName: string;
  }>;
  summaryScore: number | null;
  summarySuccessRate: number | null;
  summaryAvgExecutionTime: number | null;
  closureRate: number;
  teamSummaries: Array<{
    teamName: string;
    summaryScore: number | null;
    summarySuccessRate: number | null;
    summaryAvgExecutionTime: number | null;
    closureRate: number;
  }>;
  scoreBreakdown: CapabilityBenchmarkScoreItem[];
};

export type RepoProgressRow = {
  id: string;
  name: string;
  team: string;
  hardwareEnv: string;
  score: number | null;
  successRate: number | null;
  executionTime: number | null;
  latestReportId?: string;
  detailReportUrl?: string;
  scoreHistory: ScoreHistoryEntry[];
  overall: MetricSummary;
  key: MetricSummary;
  issues: DashboardIssue[];
  benchmark?: CapabilityBenchmarkData | null;
};

export type TeamProgressRow = {
  id: string;
  name: string;
  repoCount: number;
  score: number | null;
  successRate: number | null;
  executionTime: number | null;
  overall: MetricSummary;
  key: MetricSummary;
  issues: DashboardIssue[];
  repos: RepoProgressRow[];
};

export type CommonIssueGroup = {
  key: string;
  journeyStages: string[];
  issueType: string;
  description: string;
  severity: Severity;
  severities?: Severity[];
  repoCount: number;
  status: IssueBucket;
  items: DashboardIssue[];
};

export type IssueModalState = {
  open: boolean;
  title: string;
  issues: DashboardIssue[];
};
