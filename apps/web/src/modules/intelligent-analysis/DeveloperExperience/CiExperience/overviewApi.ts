import { compassApiFetch } from '../../UserJourney/rawData/apiClient';
import type { CiPri, CiProblem, CiProblemImpact } from './types';
import type {
  TrackingScope,
  TrackingStatus,
} from './components/PainTracking/model';

export type CiPainIssue = Pick<
  CiProblem,
  | 'responsible_party'
  | 'responsible_person'
  | 'is_common_issue'
  | 'common_issue_type'
> & {
  problemKey: string;
  lastSeenDay?: string;
  pri: CiPri;
  status: TrackingStatus;
  title: string;
  kb: string;
  dim: string | null;
  journeyStages: string[];
  impact: Partial<CiProblemImpact>;
};

export type CiPainReport = TrackingScope & {
  slug: string;
  issues: CiPainIssue[];
};

export type CiPainOverview = { reports: CiPainReport[] };

export type CiCommonIssue = {
  id: string;
  name: string;
  priority: CiPri;
  segments: string[];
  responsibility: string | null;
  recurring: boolean;
  runs: number;
  prs: number;
  cause: string | null;
  repositories: {
    name: string;
    reportRepo: string | null;
    runs: number;
    prs: number;
    cards: { step: string | null; cause: string | null }[];
  }[];
};

export type CiCommonIssueSnapshot = { day: string; issues: CiCommonIssue[] };

export const fetchCiCommonIssues = async (
  signal?: AbortSignal
): Promise<{ snapshots: CiCommonIssueSnapshot[] }> => {
  const response = await compassApiFetch<{
    snapshots: CiCommonIssueSnapshot[];
  }>('/ci-experience/ci-data/common-issues', { signal });
  if (
    !Array.isArray(response.snapshots) ||
    response.snapshots.some(
      (snapshot) =>
        !/^\d{4}-\d{2}-\d{2}$/.test(snapshot.day) ||
        !Array.isArray(snapshot.issues) ||
        snapshot.issues.some(
          (issue) =>
            !issue.id ||
            !issue.name ||
            !['P0', 'P1', 'P2'].includes(issue.priority) ||
            !Array.isArray(issue.segments) ||
            !Array.isArray(issue.repositories) ||
            issue.repositories.some((repo) => !Array.isArray(repo.cards))
        )
    )
  )
    throw new Error('CI 共性问题数据格式异常');
  return response;
};

export type CiRepoComparisonFilters = {
  repo: string;
  team: string;
  category: string;
  keyword: string;
};

export type CiRepoComparisonResult = {
  items: {
    repo: string;
    slug: string;
    teamName: string;
    repoCategory: string;
  }[];
  options: {
    repos: { value: string; label: string }[];
    teams: string[];
    categories: string[];
  };
};

export const fetchCiRepoComparison = async (
  filters: CiRepoComparisonFilters,
  signal?: AbortSignal
): Promise<CiRepoComparisonResult> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value) params.set(key, value);
  });
  const query = params.toString();
  const response = await compassApiFetch<CiRepoComparisonResult>(
    `/ci-experience/ci-data/overview/repos${query ? `?${query}` : ''}`,
    { signal }
  );
  if (
    !Array.isArray(response.items) ||
    !Array.isArray(response.options?.repos) ||
    !Array.isArray(response.options?.teams) ||
    !Array.isArray(response.options?.categories)
  ) {
    throw new Error('CI 仓库筛选结果格式异常');
  }
  return response;
};

export type CiPainTrendPoint = {
  weekStart: string;
  weekEnd: string;
  total: number;
  p0: number;
  p1: number;
  p2: number;
  repoCount: number;
  counts: Record<TrackingStatus, number>;
  repairRate: number;
};

export const fetchCiPainTrends = async (
  signal?: AbortSignal,
  commonOnly = false
): Promise<{ points: CiPainTrendPoint[] }> => {
  const response = await compassApiFetch<{ points: CiPainTrendPoint[] }>(
    `/ci-experience/ci-data/pain-trends${
      commonOnly ? '?common_only=true' : ''
    }`,
    { signal }
  );
  if (
    !Array.isArray(response.points) ||
    response.points.some(
      (point) =>
        !point.weekStart ||
        !point.weekEnd ||
        ![
          point.total,
          point.p0,
          point.p1,
          point.p2,
          point.repoCount,
          point.repairRate,
        ].every(Number.isFinite)
    )
  )
    throw new Error('CI 周度痛点趋势数据格式异常');
  return response;
};

export const fetchCiPainOverview = async (
  signal?: AbortSignal
): Promise<CiPainOverview> => {
  const response = await compassApiFetch<CiPainOverview>(
    '/ci-experience/ci-data/pain-overview',
    { signal }
  );
  return validateCiPainOverview(response);
};

export const validateCiPainOverview = (
  response: CiPainOverview
): CiPainOverview => {
  if (
    !Array.isArray(response.reports) ||
    response.reports.some(
      (report) =>
        !report.repo ||
        !report.workflow ||
        !report.day ||
        !Array.isArray(report.issues) ||
        report.issues.some(
          (issue) =>
            !issue.problemKey ||
            !['pending', 'confirmed', 'fixed', 'invalid'].includes(
              issue.status
            ) ||
            !['P0', 'P1', 'P2'].includes(issue.pri) ||
            !Array.isArray(issue.journeyStages)
        )
    )
  )
    throw new Error('CI 痛点状态数据不完整，请重试');
  return response;
};
