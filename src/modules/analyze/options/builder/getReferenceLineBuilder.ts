import { summaryLine } from '@common/options';
import { LineSeriesOption } from 'echarts';
import { checkFormatPercentageValue } from '@common/utils/format';
import type { getBuilderOptionFn } from '@modules/analyze/options';

export const getReferenceLineBuilder: getBuilderOptionFn<{
  showMedian?: boolean;
  medianMame: string;
  showAvg?: boolean;
  avgName: string;
  isRatio: boolean;
}> =
  ({
    showMedian = false,
    medianMame,
    showAvg = false,
    avgName,
    isRatio = false,
  }) =>
  (pre, data) => {
    const { summaryMean, summaryMedian } = data;

    let series = pre.series as LineSeriesOption[];
    if (showMedian) {
      series.push(
        summaryLine({
          id: 'median',
          name: medianMame,
          data: checkFormatPercentageValue(isRatio, summaryMedian),
          color: '#5B8FF9',
        })
      );
    }

    if (showAvg) {
      series.push(
        summaryLine({
          id: 'average',
          name: avgName,
          data: checkFormatPercentageValue(isRatio, summaryMean),
          color: '#F95B5B',
        })
      );
    }
    return { ...pre, series };
  };
