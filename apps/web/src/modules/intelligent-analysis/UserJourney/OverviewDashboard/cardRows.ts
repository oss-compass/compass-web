import type { OverviewCardItem } from '../rawData/apiClient';
import type { RepoProgressRow, ScoreHistoryEntry } from './types';
import {
  buildMetricSummaryFromPainRows,
  normalizeHardwareEnv,
  toDashboardIssue,
} from './utils';

export const toRepoProgressRow = (
  card: OverviewCardItem,
  history: ScoreHistoryEntry[] = []
): RepoProgressRow => {
  const issues = card.summaryOnly ? [] : toDashboardIssue(card);
  const metrics = card.overall ?? buildMetricSummaryFromPainRows(issues);
  return {
    summaryOnly: card.summaryOnly,
    closeRateTrend: card.closeRateTrend,
    id: card.id,
    name: card.name,
    team: card.team || card.sig,
    repoCategory: card.repoCategory,
    latestReportMetadata: card.latestReportMetadata,
    hardwareEnv: normalizeHardwareEnv(card.hardwareEnv || ''),
    operatingSystem: card.operatingSystem || 'debian-13',
    score: card.latestScore ?? null,
    successRate: card.latestSuccessRate ?? null,
    executionTime: card.latestExecutionTime ?? null,
    latestReportId: card.latestReportId,
    detailReportUrl: card.detailReportUrl,
    scoreHistory: card.scoreHistory ?? history,
    overall: metrics,
    key: card.key ?? metrics,
    issues,
    benchmark: card.benchmark
      ? {
          ...card.benchmark,
          scoreBreakdown: (card.benchmark.scoreBreakdown ?? []).map((item) => ({
            ...item,
            cannScore: item.cannScore ?? null,
            benchmarkScore: item.benchmarkScore ?? null,
          })),
        }
      : null,
  };
};
