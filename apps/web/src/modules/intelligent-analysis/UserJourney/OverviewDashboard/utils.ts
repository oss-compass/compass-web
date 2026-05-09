import type {
  OverviewCardItem,
  OverviewPainPointRow,
} from '../rawData/apiClient';
import { BLOCKING_SEVERITY, NON_ACTIONABLE_SEVERITY } from './constants';
import type {
  DashboardIssue,
  IssueBucket,
  MetricSummary,
  ProgressTab,
  RepoProgressRow,
  RepoSortKey,
  Severity,
} from './types';

export const normalizeSeverity = (severity: unknown): Severity => {
  if (typeof severity !== 'string') return 'P2_MAJOR';

  const severityMap: Record<string, Severity> = {
    P0_BLOCKER: 'P0_BLOCKER',
    'P0-阻塞': 'P0_BLOCKER',
    P1_CRITICAL: 'P1_CRITICAL',
    'P1-严重': 'P1_CRITICAL',
    P2_MAJOR: 'P2_MAJOR',
    'P2-中等': 'P2_MAJOR',
    P3_MINOR: 'P3_MINOR',
    'P3-次要': 'P3_MINOR',
    P4_TRIVIAL: 'P4_TRIVIAL',
    'P4-轻微': 'P4_TRIVIAL',
  };

  return severityMap[severity] ?? 'P2_MAJOR';
};

export const normalizeText = (text: string) => text.trim().replace(/\s+/g, ' ');

export const getLatestScore = (card: OverviewCardItem): number | null => {
  if (!card.scoreHistory.length) return null;
  return card.scoreHistory[card.scoreHistory.length - 1]?.score ?? null;
};

export const getAverage = (values: Array<number | null>): number | null => {
  const validValues = values.filter((value): value is number => value != null);
  if (!validValues.length) return null;
  return Number(
    (
      validValues.reduce((sum, value) => sum + value, 0) / validValues.length
    ).toFixed(1)
  );
};

export const toSuccessRate = (score: number | null): number | null => {
  if (score == null || Number.isNaN(score)) return null;
  if (score <= 5) return Number(((score / 5) * 100).toFixed(1));
  if (score <= 100) return Number(score.toFixed(1));
  return null;
};

export const formatScore = (value: number | null): string =>
  value == null ? '--' : value.toFixed(value % 1 === 0 ? 0 : 1);

export const formatPercent = (value: number | null): string =>
  value == null ? '--' : `${value.toFixed(value % 1 === 0 ? 0 : 1)}%`;

export const isNonActionable = (row: OverviewPainPointRow) =>
  row.isRealIssue === false ||
  NON_ACTIONABLE_SEVERITY.includes(normalizeSeverity(row.severity));

export const normalizeStatus = (row: OverviewPainPointRow): IssueBucket => {
  if (isNonActionable(row)) return 'na';
  if (row.improvementStatus === 'pending') return 'pending';
  if (row.improvementStatus === 'closed') return 'resolved';
  return 'inProgress';
};

export const calcMetrics = (issues: DashboardIssue[]): MetricSummary => {
  const summary = issues.reduce(
    (acc, issue) => {
      acc[issue.normalizedStatus] += 1;
      return acc;
    },
    { total: 0, pending: 0, inProgress: 0, resolved: 0, na: 0 }
  );
  const actionable = summary.pending + summary.inProgress + summary.resolved;
  return {
    total: actionable,
    pending: summary.pending,
    inProgress: summary.inProgress,
    resolved: summary.resolved,
    na: summary.na,
    closeRate:
      actionable > 0
        ? Number(((summary.resolved / actionable) * 100).toFixed(1))
        : 0,
  };
};

export const mergeMetrics = (
  rows: RepoProgressRow[],
  tab: ProgressTab
): MetricSummary => {
  const aggregate = rows.reduce(
    (acc, row) => {
      const current = row[tab];
      acc.total += current.total;
      acc.pending += current.pending;
      acc.inProgress += current.inProgress;
      acc.resolved += current.resolved;
      acc.na += current.na;
      return acc;
    },
    { total: 0, pending: 0, inProgress: 0, resolved: 0, na: 0, closeRate: 0 }
  );
  aggregate.closeRate =
    aggregate.total > 0
      ? Number(((aggregate.resolved / aggregate.total) * 100).toFixed(1))
      : 0;
  return aggregate;
};

export const toDashboardIssue = (card: OverviewCardItem): DashboardIssue[] => {
  const latestScore = getLatestScore(card);
  const successRate = toSuccessRate(latestScore);
  return card.painPoints.map((row) => ({
    ...row,
    severity: normalizeSeverity(row.severity),
    repoName: card.name,
    team: card.sig,
    score: latestScore,
    successRate,
    normalizedStatus: normalizeStatus(row),
    blocking: BLOCKING_SEVERITY.includes(normalizeSeverity(row.severity)),
  }));
};

export const getSortValue = (
  row: RepoProgressRow,
  sortKey: RepoSortKey,
  tab: ProgressTab
) => {
  const metrics = row[tab];
  switch (sortKey) {
    case 'team':
      return `${row.team}-${row.name}`;
    case 'score':
      return row.score ?? -1;
    case 'rate':
      return row.successRate ?? -1;
    case 'pending':
      return metrics.pending;
    case 'inProgress':
      return metrics.inProgress;
    case 'resolved':
      return metrics.resolved;
    case 'total':
      return metrics.total;
    case 'closeRate':
      return metrics.closeRate;
    default:
      return row.name;
  }
};
