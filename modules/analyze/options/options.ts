import merge from 'lodash/merge';
import {
  BarSeriesOption,
  LineSeriesOption,
  EChartsOption,
  SeriesOption,
} from 'echarts';

import { formatISO } from '@common/utils/time';
import { Level } from '@modules/analyze/constant';
import {
  TransResult,
  YResult,
} from '@modules/analyze/DataTransform/transToAxis';
import {
  colors,
  getPalette,
  getPaletteColor,
  getPaletteIndex,
} from '@modules/analyze/options/color';
import React from 'react';
import { ChartThemeState } from '@modules/analyze/store';
import { line } from '@modules/analyze/options/series';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';

export const defaultTooltip: EChartsOption['tooltip'] = {
  trigger: 'axis',
  axisPointer: {
    type: 'cross',
  },
  order: 'valueDesc',
};

export const legendVerticalMode: EChartsOption['legend'] = {
  icon: 'circle',
  type: 'scroll',
  orient: 'vertical',
  top: 50,
  left: '78%',
};

export const gridVerticalMode: EChartsOption['grid'] = {
  left: '5%',
  right: '25%',
  bottom: '5%',
  containLabel: true,
};

export const defaultLegend: EChartsOption['legend'] = {
  type: 'scroll',
  icon: 'circle',
  left: 0,
  // orient: 'vertical',
};

export const grid: EChartsOption['grid'] = {
  top: '60',
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

export const getLineOption = (
  opts: {
    xAxisData: string[];
    series: LineSeriesOption[];
    tooltip?: EChartsOption['tooltip'];
    legend?: EChartsOption['legend'];
  } & EChartsOption
): EChartsOption => {
  const { xAxisData, series, legend, tooltip, ...restOpts } = opts;
  return {
    color: colors,
    title: {},
    grid,
    legend: { ...defaultLegend, ...legend },
    tooltip: { ...defaultTooltip, ...tooltip },
    xAxis: categoryAxis(xAxisData),
    yAxis: {
      type: 'value',
      scale: true,
      // splitLine: {
      //   show: false,
      //   lineStyle: {
      //     color: ['#f1f1f1'],
      //   },
      // },
    },
    series,
    ...restOpts,
  };
};

export const getBarOption = (
  opts: {
    xAxisData: string[];
    series: BarSeriesOption[];
    legend?: EChartsOption['legend'];
  } & EChartsOption
): EChartsOption => {
  const { xAxisData, series, legend, tooltip, ...restOpts } = opts;
  return {
    color: colors,
    title: {},
    grid,
    legend: { ...defaultLegend, ...legend },
    tooltip: { ...defaultTooltip, ...tooltip },
    xAxis: categoryAxis(xAxisData),
    yAxis: {
      type: 'value',
      // splitLine: {
      //   show: false,
      //   lineStyle: {
      //     color: ['#f1f1f1'],
      //   },
      // },
    },
    series,
    ...restOpts,
  };
};

export const toTimeXAxis = (arr: any[], key: string): string[] => {
  return arr.map((i) => formatISO(i[key]));
};

export type ChartComponentProps = {
  loading?: boolean;
  xAxis: string[];
  yAxis: { name: string; label: string; data: (string | number)[] }[];
};

export type ChartSummaryProps = {
  loading?: boolean;
  xAxis: string[];
  yAxis: { name: string; legendName: string; data: (string | number)[] }[];
};

export type ChartProps = {
  containerRef?: React.RefObject<HTMLElement>;
};

export type GetChartOptions = (
  result: TransResult,
  theme?: DeepReadonly<ChartThemeState>
) => EChartsOption;

export type SeriesEachFunc<T> = (
  item: {
    compareLabels: string[];
    label: string;
    level: Level;
    legendName: string;
    isCompare: boolean;
    color: string;
    key: string;
    data: (string | number)[];
  },
  length?: number
) => T | null;

export function genSeries<T>(opt: {
  theme?: DeepReadonly<ChartThemeState>;
  yResults: YResult[];
}) {
  const { yResults, theme } = opt;
  const isCompare = yResults.length > 1;
  const compareLabels = yResults.map((i) => i.label);

  return function (seriesEachFunc: SeriesEachFunc<T>) {
    return yResults.reduce<T[]>((acc, { label, level, result }) => {
      const paletteIndex = getPaletteIndex(theme, label);
      const palette = getPalette(paletteIndex);

      const series = result
        .map((item, legendIndex) => {
          const color = isCompare
            ? getPaletteColor(palette, legendIndex + 3)
            : '';

          // each series gen item
          return seriesEachFunc(
            { isCompare, color: color, level, label, compareLabels, ...item },
            result.length
          );
        })
        .filter(Boolean) as T[];

      acc = [...acc, ...series];
      return acc;
    }, []);
  };
}

export function summaryLine(cfg: {
  id: string;
  name: string;
  data: (string | number)[];
  color: string;
  formatDataToHundred?: boolean;
}) {
  const { formatDataToHundred, data } = cfg;
  let showData = cfg.data;
  if (formatDataToHundred) {
    showData = data?.map((i) => transHundredMarkSystem(i));
  }

  return line({
    id: cfg.id,
    name: cfg.name,
    data: showData,
    lineStyle: { type: 'dashed', width: 1, color: cfg.color },
    itemStyle: { color: cfg.color },
  });
}
