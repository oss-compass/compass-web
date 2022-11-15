import { BarSeriesOption, LineSeriesOption } from 'echarts';

export const line = (
  opts: {
    name: string;
    data: (string | number)[];
    color?: string;
  } & LineSeriesOption
): LineSeriesOption => {
  const { name, data, color, ...restOpts } = opts;

  return {
    name: opts.name,
    type: 'line',
    smooth: false,
    showSymbol: false,
    data: opts.data,
    lineStyle: opts.color ? { color: opts.color } : {},
    itemStyle: opts.color ? { color: opts.color } : {},
    ...restOpts,
  };
};

export const lineArea = (
  opts: {
    name: string;
    data: (string | number)[];
    color?: string;
  } & LineSeriesOption
): LineSeriesOption => {
  const { name, data, color, ...restOpts } = opts;
  return {
    name,
    type: 'line',
    smooth: false,
    showSymbol: false,
    data,
    areaStyle: color ? { color } : {},
    itemStyle: opts.color ? { color } : {},
    ...restOpts,
  };
};

export const bar = (
  opts: {
    name: string;
    data: (string | number)[];
    stack?: string;
    color?: string;
  } & BarSeriesOption
): BarSeriesOption => {
  const { name, data, color, ...restOpts } = opts;

  return {
    name: opts.name,
    type: 'bar',
    data: opts.data,
    emphasis: {
      focus: 'series',
    },
    stack: opts.stack ? opts.stack : undefined,
    itemStyle: opts.color ? { color: opts.color } : {},
    ...restOpts,
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
