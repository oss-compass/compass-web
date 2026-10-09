import React from 'react';
import { CloseRateSparkline } from '../../../../UserJourney/OverviewDashboard/CloseRateTrendChart';
import { getIntegerScaleRange } from '../../../../UserJourney/OverviewDashboard/ScoreTrendChart';
import { OJ_TREND_COLORS } from '../../../../UserJourney/OverviewDashboard/constants';
import IssueTrendModal, { IssueTrendModalData } from './IssueTrendModal';
import type { IssueTrendGranularity } from './IssueTrendModal';

const resolveScale = (
  values: Array<number | null>,
  minScale: number | undefined,
  maxScale: number | undefined,
  fallbackMax: number
) => {
  if (minScale != null && maxScale != null && maxScale > minScale) {
    return { lower: minScale, upper: maxScale };
  }
  const validValues = values.filter(
    (value): value is number => value != null && Number.isFinite(value)
  );
  return validValues.length
    ? getIntegerScaleRange(Math.min(...validValues), Math.max(...validValues))
    : { lower: 0, upper: Math.max(1, fallbackMax) };
};

/** 小趋势图统一入口：缩略图与弹窗共用同一份数据。 */
const IssueTrendSparkline: React.FC<{
  trend: IssueTrendModalData;
  width?: number;
  height?: number;
  maxValue?: number;
  className?: string;
  granularity?: IssueTrendGranularity;
  onGranularityChange?: (value: IssueTrendGranularity) => void;
}> = ({
  trend,
  width = 52,
  height = 26,
  maxValue = 100,
  className = '',
  granularity = 'month',
  onGranularityChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const normalizedTrend = React.useMemo<IssueTrendModalData>(() => {
    const weeklyScale = resolveScale(
      trend.values,
      trend.minScale,
      trend.maxScale,
      maxValue
    );
    const monthlyScale = trend.monthly
      ? resolveScale(
          trend.monthly.values,
          trend.monthly.minScale,
          trend.monthly.maxScale,
          maxValue
        )
      : null;
    return {
      ...trend,
      minScale: weeklyScale.lower,
      maxScale: weeklyScale.upper,
      monthly:
        trend.monthly && monthlyScale
          ? {
              ...trend.monthly,
              minScale: monthlyScale.lower,
              maxScale: monthlyScale.upper,
            }
          : undefined,
    };
  }, [maxValue, trend]);
  const defaultSeries =
    granularity === 'month' && normalizedTrend.monthly
      ? normalizedTrend.monthly
      : normalizedTrend;
  return (
    <>
      <button
        type="button"
        className={`inline-flex shrink-0 cursor-pointer items-center justify-center rounded transition-colors hover:bg-[var(--overview-blueSoft)] focus-visible:outline-[var(--overview-blue)] ${className}`}
        title="点击查看趋势大图"
        aria-label={`查看${trend.title}`}
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
      >
        <CloseRateSparkline
          values={defaultSeries.values}
          width={width}
          height={height}
          stroke={OJ_TREND_COLORS.scoreLine}
          minValue={defaultSeries.minScale ?? 0}
          maxValue={defaultSeries.maxScale ?? Math.max(1, maxValue)}
          connectNulls
        />
      </button>
      <IssueTrendModal
        open={open}
        trend={normalizedTrend}
        onClose={() => setOpen(false)}
        granularity={granularity}
        onGranularityChange={onGranularityChange}
      />
    </>
  );
};

export default IssueTrendSparkline;
