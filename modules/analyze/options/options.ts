import { BarSeriesOption, LineSeriesOption, EChartsOption } from 'echarts';

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
} from '@modules/analyze/options/color';
import React from 'react';
import { ChartThemeState } from '@modules/analyze/context';
import { number } from 'echarts/types/dist/echarts';
import { ScaleDataValue } from 'echarts/types/src/util/types';

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

export const getLineOption = (
  opts: {
    xAxisData: string[];
    series: LineSeriesOption[];
    tooltip?: EChartsOption['tooltip'];
  } & EChartsOption
): EChartsOption => {
  const { xAxisData, series, tooltip, ...restOpts } = opts;
  return {
    color: colors,
    title: {},
    tooltip: tooltip ? tooltip : defaultTooltip,
    legend,
    grid,
    xAxis: categoryAxis(xAxisData),
    yAxis: {
      type: 'value',
      scale: true,
    },
    series,
    ...restOpts,
  };
};

export const getBarOption = (
  opts: {
    xAxisData: string[];
    series: BarSeriesOption[];
  } & EChartsOption
): EChartsOption => {
  const { xAxisData, series, ...restOpts } = opts;
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
  seriesItem: (
    item: {
      label: string;
      level: Level;
      legendName: string;
      isCompare: boolean;
      color: string;
      key: string;
      data: (string | number)[];
    },
    length?: number
  ) => T | null,
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

        return seriesItem(
          { isCompare, color: color, level, label, ...item },
          yAxisResult.length
        );
      })
      .filter(Boolean) as T[];
    acc = [...acc, ...result];
    return acc;
  }, []);
}
