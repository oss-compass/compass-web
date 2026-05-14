import type { OverviewPainPointRow } from '../rawData/apiClient';

export type Severity = OverviewPainPointRow['severity'];
export type ProgressTab = 'overall' | 'blocking';
export type IssueBucket = 'pending' | 'inProgress' | 'resolved' | 'na';
export type RepoSortKey =
  | 'team'
  | 'score'
  | 'rate'
  | 'pending'
  | 'inProgress'
  | 'resolved'
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
  latestReportId?: string;
  detailReportUrl?: string;
  overall: MetricSummary;
  blocking: MetricSummary;
  issues: DashboardIssue[];
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
