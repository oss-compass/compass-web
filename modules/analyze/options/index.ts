import {
  BarSeriesOption,
  BoxplotSeriesOption,
  EffectScatterSeriesOption,
  HeatmapSeriesOption,
  LineSeriesOption,
  ScatterSeriesOption,
  TreemapSeriesOption,
  EChartsOption,
  SeriesOption,
  XAXisComponentOption,
} from 'echarts';

import { formatISO } from '@common/utils/time';

const tooltip: EChartsOption['tooltip'] = {
  trigger: 'axis',
};

const legend: EChartsOption['legend'] = {
  type: 'scroll',
  icon: 'circle',
  left: 10,
  // orient: 'vertical',
};

const grid: EChartsOption['grid'] = {
  left: '5%',
  right: '5%',
  bottom: '5%',
  containLabel: true,
};

const categoryAxis = (data: any[]): EChartsOption['xAxis'] => ({
  type: 'category',
  boundaryGap: true,
  data,
  axisLabel: {
    align: 'center',
    rotate: 5,
    margin: 20,
  },
  axisTick: {
    alignWithLabel: true,
  },
});

export const getLineOption = ({
  xAxisData,
  series,
}: {
  xAxisData: string[];
  series: LineSeriesOption[];
}): EChartsOption => {
  return {
    title: {},
    tooltip,
    legend,
    grid,
    xAxis: categoryAxis(xAxisData),
    yAxis: {
      type: 'value',
    },
    series,
  };
};

export const getBarOption = ({
  xAxisData,
  series,
}: {
  xAxisData: string[];
  series: BarSeriesOption[];
}): EChartsOption => {
  return {
    title: {},
    tooltip,
    legend,
    grid,
    xAxis: categoryAxis(xAxisData),
    yAxis: {
      type: 'value',
    },
    series,
  };
};

export const toTimeXAxis = (arr: any[], key: string): string[] => {
  return arr.map((i) => formatISO(i[key]));
};

export const line = (opts: {
  name: string;
  data: (string | number)[];
}): LineSeriesOption => {
  return {
    name: opts.name,
    type: 'line',
    smooth: false,
    showSymbol: false,
    data: opts.data,
  };
};

export const lineArea = (opts: {
  name: string;
  data: (string | number)[];
}): LineSeriesOption => {
  return {
    name: opts.name,
    type: 'line',
    smooth: false,
    showSymbol: false,
    data: opts.data,
    areaStyle: {},
  };
};

export const bar = (opts: {
  name: string;
  data: (string | number)[];
}): BarSeriesOption => {
  return {
    name: opts.name,
    type: 'bar',
    data: opts.data,
    stack: 'Total',
    emphasis: {
      focus: 'series',
    },
  };
};

export const mapToSeries = (
  arr: any[],
  key: string,
  name: string,
  func: (opts: { name: string; data: (string | number)[] }) => LineSeriesOption
): LineSeriesOption => {
  const values = arr.map((i) => String(i[key]));
  return func({ name: name, data: values });
};

export const mapToLineSeries = (
  arr: any[],
  key: string,
  name: string
): LineSeriesOption => {
  return mapToSeries(arr, key, name, line);
};

export const mapToLineAreaSeries = (
  arr: any[],
  key: string,
  name: string
): LineSeriesOption => {
  return mapToSeries(arr, key, name, lineArea);
};

export type ChartComponentProps = {
  loading?: boolean;
  xAxis: string[];
  yAxis: { name: string; data: (string | number)[] }[];
};
