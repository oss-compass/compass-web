import last from 'lodash/last';
import {
  getColorWithLabel,
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  line,
  summaryLine,
} from '@common/options';
import type { getBuilderOptionFn } from './hooks/useEChartBuilderFns';
import { formatISO } from '@common/utils';

export const getLineBuilder: getBuilderOptionFn<{}> = () => (pre, results) => {
  const compareLabels = results.map((i) => i.label);

  // todo  merge date  不相同的时间线
  const lastItem = last(results);
  const dates = lastItem?.dates || [];

  const series = results.map(({ label, level, dates, values }) => {
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
