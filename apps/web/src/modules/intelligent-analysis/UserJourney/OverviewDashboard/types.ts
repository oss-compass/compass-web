import type { OverviewPainPointRow } from '../rawData/apiClient';

export type Severity = OverviewPainPointRow['severity'];
export type ProgressTab = 'overall' | 'key';
export type ProgressView = 'team' | 'repo';
export type IssueBucket = 'pending' | 'inProgress' | 'resolved' | 'na';
export type RepoSortKey =
  | 'name'
  | 'team'
  | 'score'
  | 'successRate'
  | 'executionTime'
  | 'total'
  | 'closeRate';
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

export type RepoProgressRow = {
  id: string;
  name: string;
  team: string;
  score: number | null;
  successRate: number | null;
  executionTime: number | null;
  latestReportId?: string;
  detailReportUrl?: string;
  overall: MetricSummary;
  key: MetricSummary;
  issues: DashboardIssue[];
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
  repoCount: number;
  status: IssueBucket;
  items: DashboardIssue[];
};

export type IssueModalState = {
  open: boolean;
  title: string;
  issues: DashboardIssue[];
};
