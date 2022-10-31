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
import { Level } from '@modules/analyze/constant';
import {
  TransResult,
  YResult,
} from '@modules/analyze/DataTransform/transToAxis';
import {
  colorGenerator,
  colors,
  getPalette,
  getPaletteColor,
} from '@modules/analyze/options/color';
import React from 'react';
import { ChartThemeState } from '@modules/analyze/context';

const defaultTooltip: EChartsOption['tooltip'] = {
  trigger: 'axis',
  axisPointer: {
    type: 'cross',
  },
  order: 'valueDesc',
};

const legendVerticalMode: EChartsOption['legend'] = {
  icon: 'circle',
  type: 'scroll',
  orient: 'vertical',
  top: 50,
  left: '78%',
};

const gridVerticalMode: EChartsOption['grid'] = {
  left: '5%',
  right: '25%',
  bottom: '5%',
  containLabel: true,
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
  tooltip,
}: {
  xAxisData: string[];
  series: LineSeriesOption[];
  tooltip?: EChartsOption['tooltip'];
}): EChartsOption => {
  return {
    color: colors,
    title: {},
    tooltip: tooltip ? tooltip : defaultTooltip,
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
    color: colors,
    title: {},
    tooltip: defaultTooltip,
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
  color?: string;
}): LineSeriesOption => {
  return {
    name: opts.name,
    type: 'line',
    smooth: false,
    showSymbol: false,
    data: opts.data,
    lineStyle: opts.color ? { color: opts.color } : {},
    itemStyle: opts.color ? { color: opts.color } : {},
  };
};

export const lineArea = (opts: {
  name: string;
  data: (string | number)[];
  color?: string;
}): LineSeriesOption => {
  return {
    name: opts.name,
    type: 'line',
    smooth: false,
    showSymbol: false,
    data: opts.data,
    areaStyle: opts.color ? { color: opts.color } : {},
    itemStyle: opts.color ? { color: opts.color } : {},
  };
};

export const bar = (opts: {
  name: string;
  data: (string | number)[];
  stack?: string;
  color?: string;
}): BarSeriesOption => {
  return {
    name: opts.name,
    type: 'bar',
    data: opts.data,
    emphasis: {
      focus: 'series',
    },
    stack: opts.stack ? opts.stack : undefined,
    itemStyle: opts.color ? { color: opts.color } : {},
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
  yAxis: { name: string; label: string; data: (string | number)[] }[];
};

export type ChartProps = {
  containerRef?: React.RefObject<HTMLElement>;
};

const getPaletteIndex = (
  themeState: ChartThemeState | undefined,
  label: string
) => {
  return themeState?.color?.find((i) => i.label === label)?.paletteIndex || 0;
};

export function genSeries<T>(
  comparesYAxis: YResult[],
  seriesItem: (item: {
    label: string;
    level: Level;
    legendName: string;
    isCompare: boolean;
    color: string;
    key: string;
    data: (string | number)[];
  }) => T | null,
  theme?: ChartThemeState
) {
  const isCompare = comparesYAxis.length > 1;

  return comparesYAxis.reduce<T[]>((acc, { label, level, yAxisResult }) => {
    const paletteIndex = getPaletteIndex(theme, label);
    const palette = getPalette(paletteIndex);

    const result = yAxisResult
      .map((item, legendIndex) => {
        const color = isCompare
          ? getPaletteColor(palette, legendIndex + 3)
          : '';

        return seriesItem({
          isCompare,
          color: color,
          level,
          label,
          ...item,
        });
      })
      .filter(Boolean) as T[];
    acc = [...acc, ...result];
    return acc;
  }, []);
}
