import type {
  OverviewCardItem,
  OverviewPainPointRow,
} from '../rawData/apiClient';
import { NON_ACTIONABLE_SEVERITY } from './constants';
import type {
  DashboardIssue,
  IssueBucket,
  MetricSummary,
  ProgressTab,
  RepoProgressRow,
  RepoSortKey,
  Severity,
  TeamProgressRow,
  TeamSortKey,
} from './types';

export const normalizeSeverity = (severity: unknown): Severity => {
  if (typeof severity !== 'string') return '';
  if (!severity.trim()) return '';

  const severityMap: Record<string, Severity> = {
    P0_BLOCKER: 'P0_BLOCKER',
    'P0-阻塞': 'P0_BLOCKER',
    'P0-完全阻塞': 'P0_BLOCKER',
    P1_CRITICAL: 'P1_CRITICAL',
    'P1-严重': 'P1_CRITICAL',
    'P1-关键卡点': 'P1_CRITICAL',
    P2_MAJOR: 'P2_MAJOR',
    'P2-中等': 'P2_MAJOR',
    'P2-显著影响': 'P2_MAJOR',
    P3_MINOR: 'P3_MINOR',
    'P3-次要': 'P3_MINOR',
    'P3-轻微影响': 'P3_MINOR',
    P4_TRIVIAL: 'P4_TRIVIAL',
    'P4-轻微': 'P4_TRIVIAL',
    'P4-极致体验': 'P4_TRIVIAL',
  };

  return severityMap[severity] ?? '';
};

export const normalizeText = (text: string) => text.trim().replace(/\s+/g, ' ');

const OTHER_TEAM_LABELS = new Set(['其他', '其它', '其他团队', '其它团队']);

const isOtherTeam = (teamName: string): boolean => {
  const normalized = String(teamName || '')
    .trim()
    .replace(/\s+/g, '');
  return OTHER_TEAM_LABELS.has(normalized);
};

export const compareTeamNames = (left: string, right: string): number => {
  const normalizedLeft = String(left || '').trim();
  const normalizedRight = String(right || '').trim();
  const leftIsOther = isOtherTeam(normalizedLeft);
  const rightIsOther = isOtherTeam(normalizedRight);

  if (leftIsOther && !rightIsOther) return 1;
  if (!leftIsOther && rightIsOther) return -1;

  return normalizedLeft.localeCompare(normalizedRight, 'zh-Hans-CN', {
    sensitivity: 'base',
  });
};

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

export const formatExecutionTime = (seconds: number | null): string => {
  if (seconds == null) return '--';
  return `${(seconds / 60).toFixed(1)} 分钟`;
};

export const isNonActionable = (row: OverviewPainPointRow) =>
  row.isRealIssue === false ||
  (() => {
    const severity = normalizeSeverity(row.severity);
    if (!severity) return false;
    return NON_ACTIONABLE_SEVERITY.includes(severity);
  })();

export const normalizeStatus = (row: OverviewPainPointRow): IssueBucket => {
  if (isNonActionable(row)) return 'na';
  if (row.improvementStatus === 'pending') return 'pending';
  if (row.improvementStatus === 'closed') return 'resolved';
  return 'inProgress';
};

export const toMetricSummary = (card: OverviewCardItem): MetricSummary => {
  return {
    total: card.totalPainPoints ?? 0,
    pending: card.pendingPainPoints ?? 0,
    inProgress: card.inProgressPainPoints ?? 0,
    resolved: card.closedPainPoints ?? 0,
    na: card.naPainPoints ?? 0,
    closeRate: card.closeRate ?? 0,
  };
};

export const toDashboardIssue = (card: OverviewCardItem): DashboardIssue[] => {
  const latestScore = card.latestScore ?? getLatestScore(card);
  const successRate = card.latestSuccessRate ?? toSuccessRate(latestScore);
  return card.painPoints.map((row) => ({
    ...row,
    severity: normalizeSeverity(row.severity),
    repoName: card.name,
    team: card.team || card.sig,
    teamOwner: card.teamOwner || row.teamOwner,
    score: latestScore,
    successRate,
    normalizedStatus: normalizeStatus(row),
  }));
};

export const toCloseRate = (
  summary: Omit<MetricSummary, 'closeRate'>
): number => {
  const denominator = summary.total - summary.na;
  if (denominator <= 0) return 0;
  return Number(((summary.resolved / denominator) * 100).toFixed(1));
};

export const mergeMetricSummaries = (items: MetricSummary[]): MetricSummary => {
  const summary = items.reduce(
    (acc, item) => {
      acc.total += item.total;
      acc.pending += item.pending;
      acc.inProgress += item.inProgress;
      acc.resolved += item.resolved;
      acc.na += item.na;
      return acc;
    },
    { total: 0, pending: 0, inProgress: 0, resolved: 0, na: 0 }
  );

  return {
    ...summary,
    closeRate: toCloseRate(summary),
  };
};

export const getRepoSortValue = (
  row: RepoProgressRow,
  sortKey: RepoSortKey,
  tab: ProgressTab
) => {
  const metrics = row[tab];
  switch (sortKey) {
    case 'name':
      return row.name;
    case 'team':
      return row.team;
    case 'score':
      return row.score ?? -1;
    case 'successRate':
      return row.successRate ?? -1;
    case 'executionTime':
      return row.executionTime ?? -1;
    case 'total':
      return metrics.total;
    case 'closeRate':
      return metrics.closeRate;
    default:
      return row.name;
  }
};

export const getTeamSortValue = (
  row: TeamProgressRow,
  sortKey: TeamSortKey,
  tab: ProgressTab
) => {
  const metrics = row[tab];
  switch (sortKey) {
    case 'name':
      return row.name;
    case 'repoCount':
      return row.repoCount;
    case 'score':
      return row.score ?? -1;
    case 'successRate':
      return row.successRate ?? -1;
    case 'executionTime':
      return row.executionTime ?? -1;
    case 'total':
      return metrics.total;
    case 'closeRate':
      return metrics.closeRate;
    default:
      return row.name;
  }
};
