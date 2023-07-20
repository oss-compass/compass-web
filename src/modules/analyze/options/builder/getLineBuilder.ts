import {
  getColorWithLabel,
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  line,
  summaryLine,
} from '@common/options';
import type { getBuilderOptionFn } from '@modules/analyze/options/useOptionBuilderFns';
import { toHundredMark } from '@common/transform/transHundredMarkSystem';

export const getLineBuilder: getBuilderOptionFn<{
  enableDataFormat?: boolean;
  onePointSystem?: boolean;
  indicators?: string;
  showMedian?: boolean;
  medianMame: string;
  showAvg?: boolean;
  avgName: string;
  yAxisScale: boolean;
}> =
  ({
    enableDataFormat = false,
    onePointSystem = false,
    indicators,
    showMedian = false,
    medianMame,
    showAvg = false,
    avgName,
    yAxisScale = true,
  }) =>
  (pre, data, theme) => {
    const { yResults, xAxis, compareLabels, summaryMedian, summaryMean } = data;
    const series = yResults.map(({ label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: enableDataFormat ? toHundredMark(!onePointSystem, data) : data,
        color,
      });
    });

    if (showMedian) {
      series.push(
        summaryLine({
          id: 'median',
          name: medianMame,
          data: enableDataFormat
            ? toHundredMark(!onePointSystem, summaryMedian)
            : summaryMedian,
          color: '#5B8FF9',
        })
      );
    }

    if (showAvg) {
      series.push(
        summaryLine({
          id: 'average',
          name: avgName,
          data: enableDataFormat
            ? toHundredMark(!onePointSystem, summaryMean)
            : summaryMean,
          color: '#F95B5B',
        })
      );
    }

    const opts = getLineOption({
      xAxisData: xAxis,
      series,
      yAxis: { type: 'value', scale: yAxisScale },
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({ compareLabels, indicators }),
      },
    });

    return { ...pre, ...opts, series };
  };
