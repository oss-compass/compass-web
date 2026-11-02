import type {
  IssueOverviewV2PainSummary,
  IssueOverviewV2Trend,
} from '../../types';

/** 卡片数字取全量汇总；顶部趋势与下方周度图共用周度快照。 */
export const getWeeklyClosureData = (summary?: IssueOverviewV2PainSummary) => {
  const periods =
    summary?.periodsReady === false
      ? []
      : [...(summary?.periods ?? [])].sort((a, b) =>
          a.period.localeCompare(b.period)
        );
  const latest = periods[periods.length - 1];
  const trackable = summary
    ? summary.total - (summary.counts.historical ?? 0)
    : 0;
  const monthly = new Map<string, { resolved: number; trackable: number }>();
  periods.forEach((point) => {
    const [start, end = start] = point.period.split('_to_');
    const month = end.slice(0, 7);
    const counts = monthly.get(month) ?? { resolved: 0, trackable: 0 };
    counts.resolved += point.counts.resolved ?? 0;
    counts.trackable += point.total - (point.counts.historical ?? 0);
    monthly.set(month, counts);
  });
  const trend: IssueOverviewV2Trend = {
    periods: periods.map((point) => point.period),
    values: periods.map((point) => point.closeRate),
    monthly: {
      periods: Array.from(monthly.keys()),
      values: Array.from(monthly.values(), (counts) =>
        counts.trackable
          ? Number(((counts.resolved / counts.trackable) * 100).toFixed(1))
          : 0
      ),
    },
  };
  return {
    periods,
    latest,
    trend,
    value: summary ? `${summary.counts.resolved ?? 0} / ${trackable}` : '-',
  };
};
