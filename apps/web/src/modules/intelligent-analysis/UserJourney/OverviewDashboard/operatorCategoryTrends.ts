import type { RepoProgressRow } from './types';
import {
  buildScoreTrend,
  buildSuccessRateTrend,
  ScoreTrendPoint,
} from './scoreTrend';
import { buildCloseRateTrend } from './closeRateTrend';

export function buildOperatorCategoryTrends(
  repos: RepoProgressRow[],
  weeks = 7,
  endDate = new Date()
) {
  const averageWeekly = (build: typeof buildScoreTrend): ScoreTrendPoint[] => {
    const buckets = new Map<
      string,
      { point: ScoreTrendPoint; values: number[] }
    >();
    repos.forEach((repo) =>
      build(repo.scoreHistory || [], weeks).forEach((point) => {
        if (point.score == null || !Number.isFinite(point.score)) return;
        const bucket = buckets.get(point.key) ?? { point, values: [] };
        bucket.values.push(point.score);
        buckets.set(point.key, bucket);
      })
    );
    return Array.from(buckets.values())
      .sort((a, b) => a.point.key.localeCompare(b.point.key))
      .slice(-weeks)
      .map(({ point, values }) => ({
        ...point,
        score: values.reduce((sum, value) => sum + value, 0) / values.length,
        sampleCount: values.length,
      }));
  };
  const repoCloseTrends = repos.map((repo) =>
    buildCloseRateTrend(repo.issues, weeks, endDate)
  );
  const closeRateTrend = (repoCloseTrends[0] || []).map((point, index) => {
    const points = repoCloseTrends.map((trend) => trend[index]);
    const rates = points
      .map((item) => item.closeRate)
      .filter((value): value is number => value != null);
    return {
      ...point,
      total: points.reduce((sum, item) => sum + item.total, 0),
      p0: points.reduce((sum, item) => sum + item.p0, 0),
      p1: points.reduce((sum, item) => sum + item.p1, 0),
      p2: points.reduce((sum, item) => sum + item.p2, 0),
      p3: points.reduce((sum, item) => sum + item.p3, 0),
      closeRate: rates.length
        ? rates.reduce((sum, value) => sum + value, 0) / rates.length
        : null,
    };
  });
  return {
    scoreTrend: averageWeekly(buildScoreTrend),
    successRateTrend: averageWeekly(buildSuccessRateTrend),
    closeRateTrend,
  };
}
