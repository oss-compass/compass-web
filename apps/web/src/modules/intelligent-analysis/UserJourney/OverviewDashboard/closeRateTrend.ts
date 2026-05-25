import type { DashboardIssue } from './types';
import { buildMetricSummaryFromPainRows } from './utils';

export type CloseRateTrendPoint = {
  weekStart: string;
  weekEnd: string;
  label: string;
  total: number;
  closeRate: number | null;
};

const pad2 = (value: number): string => String(value).padStart(2, '0');

const formatDate = (date: Date): string => {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(
    date.getDate()
  )}`;
};

const formatLabel = (date: Date): string => {
  return `${pad2(date.getMonth() + 1)}.${pad2(date.getDate())}`;
};

const getWeekStart = (date: Date): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const weekday = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - weekday);
  return start;
};

const addDays = (date: Date, days: number): Date => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

const getIssueCreatedAt = (issue: DashboardIssue): string | undefined => {
  return (
    issue.createdAt || (issue as unknown as { created_at?: string }).created_at
  );
};

export const buildCloseRateTrend = (
  issues: DashboardIssue[],
  weeks: number,
  endDate?: Date
): CloseRateTrendPoint[] => {
  const safeWeeks = Number.isFinite(weeks) && weeks > 0 ? Math.floor(weeks) : 1;
  const end = getWeekStart(endDate ?? new Date());
  const starts = Array.from({ length: safeWeeks }, (_v, index) =>
    addDays(end, -7 * (safeWeeks - 1 - index))
  );
  const buckets = new Map<string, DashboardIssue[]>();

  starts.forEach((start) => {
    buckets.set(formatDate(start), []);
  });

  issues.forEach((issue) => {
    const raw = getIssueCreatedAt(issue);
    if (!raw) return;
    const created = new Date(raw);
    if (Number.isNaN(created.getTime())) return;
    const start = getWeekStart(created);
    const key = formatDate(start);
    const bucket = buckets.get(key);
    if (bucket) bucket.push(issue);
  });

  return starts.map((start) => {
    const key = formatDate(start);
    const weekIssues = buckets.get(key) ?? [];
    const summary = buildMetricSummaryFromPainRows(weekIssues);
    const closeRate = summary.total === 0 ? 100 : summary.closeRate;
    const weekEnd = addDays(start, 6);
    return {
      weekStart: formatDate(start),
      weekEnd: formatDate(weekEnd),
      label: formatLabel(start),
      total: summary.total,
      closeRate,
    };
  });
};
