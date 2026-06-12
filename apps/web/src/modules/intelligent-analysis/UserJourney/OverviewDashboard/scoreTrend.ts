import type { RepoProgressRow, ScoreHistoryEntry } from './types';
import { toSuccessRate } from './utils';

export type ScoreTrendPoint = {
  key: string;
  date: string;
  label: string;
  score: number | null;
  sampleCount?: number;
  weekStart?: string;
  weekEnd?: string;
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

const toIsoDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getWeekRange = (
  value: string
): { weekStart: string; weekEnd: string; label: string } => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return {
      weekStart: value,
      weekEnd: value,
      label: formatScoreLabel(value),
    };
  }

  const normalized = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );
  const day = normalized.getDay();
  const diffToMonday = day === 0 ? -6 : 1 - day;
  const weekStartDate = new Date(normalized);
  weekStartDate.setDate(normalized.getDate() + diffToMonday);
  const weekEndDate = new Date(weekStartDate);
  weekEndDate.setDate(weekStartDate.getDate() + 6);

  return {
    weekStart: toIsoDate(weekStartDate),
    weekEnd: toIsoDate(weekEndDate),
    label: formatScoreLabel(toIsoDate(weekEndDate)),
  };
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

const toWeeklyTrend = (
  history: ScoreHistoryEntry[],
  limit: number,
  transformScore?: (value: number | null) => number | null
): ScoreTrendPoint[] => {
  const grouped = new Map<
    string,
    {
      weekStart: string;
      weekEnd: string;
      label: string;
      totalScore: number;
      count: number;
    }
  >();

  toSortedHistory(history).forEach((item) => {
    const score = normalizeScore(item.score);
    if (score == null) return;
    const { weekStart, weekEnd, label } = getWeekRange(item.date);
    const existing = grouped.get(weekStart);
    if (existing) {
      existing.totalScore += score;
      existing.count += 1;
      return;
    }

    grouped.set(weekStart, {
      weekStart,
      weekEnd,
      label,
      totalScore: score,
      count: 1,
    });
  });

  return Array.from(grouped.values())
    .sort(
      (left, right) =>
        getTimeValue(left.weekStart) - getTimeValue(right.weekStart)
    )
    .slice(-limit)
    .map((item) => {
      const averageScore = Number((item.totalScore / item.count).toFixed(1));
      return {
        key: item.weekStart,
        date: `${item.weekStart} - ${item.weekEnd}`,
        label: item.label,
        score: transformScore ? transformScore(averageScore) : averageScore,
        sampleCount: item.count,
        weekStart: item.weekStart,
        weekEnd: item.weekEnd,
      };
    });
};

export const buildScoreTrend = (
  history: ScoreHistoryEntry[],
  limit = 7
): ScoreTrendPoint[] => toWeeklyTrend(history, limit);

export const buildTeamScoreTrend = (
  repos: RepoProgressRow[],
  limit = 7
): ScoreTrendPoint[] => {
  const flattenedHistory = repos.flatMap((repo) => repo.scoreHistory || []);
  return toWeeklyTrend(flattenedHistory, limit);
};

export const buildSuccessRateTrend = (
  history: ScoreHistoryEntry[],
  limit = 7
): ScoreTrendPoint[] => toWeeklyTrend(history, limit, toSuccessRate);

export const buildTeamSuccessRateTrend = (
  repos: RepoProgressRow[],
  limit = 7
): ScoreTrendPoint[] =>
  toWeeklyTrend(
    repos.flatMap((repo) => repo.scoreHistory || []),
    limit,
    toSuccessRate
  );
