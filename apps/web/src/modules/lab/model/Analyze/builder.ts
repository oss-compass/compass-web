import last from 'lodash/last';
import {
  getColorWithLabel,
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  line,
  bar,
  summaryLine,
} from '@common/options';
import type { getBuilderOptionFn } from './hooks/useEChartBuilderFns';
import { formatISO } from '@common/utils';

export const getChartBuilder: getBuilderOptionFn<{}> = () => (pre, results) => {
  const compareLabels = results.map((i) => i.label);
  const lastItem = last(results);
  const chartType = lastItem.chartType;

  // todo  merge date  不相同的时间线
  const dates = lastItem?.dates || [];

  const series = results.map(({ label, level, dates, values }) => {
    if (chartType === 'bar') {
      return bar({
        name: label,
        data: values,
      });
    }

    return line({
      name: label,
      data: values,
    });
  });

  const opts = getLineOption({
    xAxisData: dates.map((i) => formatISO(i)),
    series,
    yAxis: { type: 'value', scale: true },
    legend: legendFormat(compareLabels),
    tooltip: {
      formatter: getTooltipsFormatter({ compareLabels }),
    },
  });

  return { ...pre, ...opts, series };
};
