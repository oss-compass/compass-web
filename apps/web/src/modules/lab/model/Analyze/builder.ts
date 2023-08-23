import last from 'lodash/last';
import { formatNegativeNumber, shortenAxisLabel } from '@common/utils/format';
import {
  getLineOption,
  getTooltipsFormatter,
  legendFormat,
  line,
  bar,
} from '@common/options';
import type {
  getChartBuilderFn,
  getDataBuilderFn,
} from './hooks/useBuilderFns';
import { alignValuesWithDates, formatData } from './context/dataHandle';

export const getChartBuilder: getChartBuilderFn<{}> = () => (pre, results) => {
  const compareLabels = results.map((i) => i.label);
  const lastItem = last(results);
  const chartType = lastItem?.chartType;
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
    xAxisData: dates,
    series,
    yAxis: {
      type: 'value',
      scale: true,
      axisLabel: {
        formatter: (value: any) => {
          return shortenAxisLabel(value) as string;
        },
      },
    },
    legend: legendFormat(compareLabels),
    tooltip: {
      formatter: getTooltipsFormatter({ compareLabels }),
    },
  });

  return { ...pre, ...opts, series };
};

export const getAlignValuesBuilder: getDataBuilderFn<{}> = () => {
  return (data) => {
    return alignValuesWithDates(data);
  };
};

export const getDataFormatBuilder: getDataBuilderFn<{}> = () => {
  return (data) => {
    return formatData(data);
  };
};
