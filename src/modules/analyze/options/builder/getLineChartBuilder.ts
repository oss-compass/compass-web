import type { getBuilderOptionFn } from '@modules/analyze/options/useOptionBuilderFns';
import { EChartsOption } from 'echarts';
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

export const getLineChartBuilder: getBuilderOptionFn<{
  isRatio: boolean;
  yAxisScale: boolean;
}> =
  ({ isRatio = false, yAxisScale = true }) =>
  (pre, data, theme) => {
    const { yResults, xAxis, compareLabels } = data;
    const series = yResults.map(({ label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: isRatio ? data.map((v) => percentageValueFormat(v)) : data,
        color,
      });
    });

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
