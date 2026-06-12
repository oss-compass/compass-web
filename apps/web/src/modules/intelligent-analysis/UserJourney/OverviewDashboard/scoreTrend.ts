import type { RepoProgressRow, ScoreHistoryEntry } from './types';

export type ScoreTrendPoint = {
  key: string;
  date: string;
  label: string;
  score: number | null;
  sampleCount?: number;
};

const formatScoreLabel = (value: string): string => {
  const date = new Date(value);
  if (!Number.isNaN(date.getTime())) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  const match = value.match(/(\d{2})-(\d{2})$/);
  if (match) return `${Number(match[1])}/${Number(match[2])}`;
  return value;
};

const getTimeValue = (value: string): number => {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? Number.MAX_SAFE_INTEGER : parsed;
};

const normalizeScore = (value: number | null | undefined): number | null => {
  if (value == null || !Number.isFinite(value)) return null;
  return Number(value.toFixed(1));
};

const toSortedHistory = (history: ScoreHistoryEntry[]): ScoreHistoryEntry[] =>
  [...history].sort((left, right) => {
    const diff = getTimeValue(left.date) - getTimeValue(right.date);
    if (diff !== 0) return diff;
    return String(left.reportId || '').localeCompare(
      String(right.reportId || '')
    );
  });

export const buildScoreTrend = (
  history: ScoreHistoryEntry[],
  limit = 7
): ScoreTrendPoint[] =>
  toSortedHistory(history)
    .slice(-limit)
    .map((item) => ({
      key: item.reportId || `${item.date}-${item.score}`,
      date: item.date,
      label: formatScoreLabel(item.date),
      score: normalizeScore(item.score),
    }));

export const buildTeamScoreTrend = (
  repos: RepoProgressRow[],
  limit = 7
): ScoreTrendPoint[] => {
  const grouped = new Map<
    string,
    { date: string; totalScore: number; count: number }
  >();

  repos.forEach((repo) => {
    toSortedHistory(repo.scoreHistory || []).forEach((item) => {
      const score = normalizeScore(item.score);
      if (score == null) return;

      const existing = grouped.get(item.date);
      if (existing) {
        existing.totalScore += score;
        existing.count += 1;
        return;
      }

      grouped.set(item.date, {
        date: item.date,
        totalScore: score,
        count: 1,
      });
    });
  });

  return Array.from(grouped.values())
    .sort((left, right) => getTimeValue(left.date) - getTimeValue(right.date))
    .slice(-limit)
    .map((item) => ({
      key: item.date,
      date: item.date,
      label: formatScoreLabel(item.date),
      score: Number((item.totalScore / item.count).toFixed(1)),
      sampleCount: item.count,
    }));
};
