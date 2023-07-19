import { EChartsOption } from 'echarts';
import { summaryLine } from '@common/options';
import { LineSeriesOption } from 'echarts';
import { checkFormatPercentageValue } from '@common/utils/format';
import type { getBuilderOptionFn } from '@modules/analyze/options/useOptionBuilderFns';
import {
  getColorWithLabel,
  getLineOption,
  legendFormat,
  line,
  getTooltipsFormatter,
} from '@common/options';
import {
  percentageValueFormat,
  percentageUnitFormat,
} from '@common/utils/format';
import { formatISO } from '@common/utils';

export const getRatioLineBuilder: getBuilderOptionFn<{
  showMedian?: boolean;
  medianMame: string;
  showAvg?: boolean;
  avgName: string;
  isRatio: boolean;
  yAxisScale: boolean;
}> =
  ({
    showMedian = false,
    medianMame,
    showAvg = false,
    avgName,
    isRatio = false,
    yAxisScale = true,
  }) =>
  (pre, data, theme) => {
    const { yResults, xAxis, compareLabels, summaryMedian, summaryMean } = data;
    const series = yResults.map(({ label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: isRatio ? data.map((v) => percentageValueFormat(v)) : data,
        color,
      });
    });

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

    const yAxis: EChartsOption['yAxis'] = isRatio
      ? {
          type: 'value',
          axisLabel: { formatter: '{value}%' },
          scale: yAxisScale,
        }
      : { type: 'value', scale: yAxisScale };

    const opts = getLineOption({
      xAxisData: xAxis.map((i) => formatISO(i)),
      series,
      yAxis,
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({
          compareLabels,
          valueFormat: isRatio ? percentageUnitFormat : undefined,
        }),
      },
    });

    return { ...pre, ...opts, series };
  };
