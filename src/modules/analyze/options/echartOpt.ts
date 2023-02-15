import { BarSeriesOption, LineSeriesOption, EChartsOption } from 'echarts';
import { colors } from '@modules/analyze/options/color';
import { line } from '@modules/analyze/options/series';

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

export type ChartSummaryProps = {
  loading?: boolean;
  xAxis: string[];
  yAxis: { name: string; legendName: string; data: any[] }[];
};

export function summaryLine(cfg: {
  id: string;
  name: string;
  data: (string | number)[];
  color: string;
}) {
  return line({
    id: cfg.id,
    name: cfg.name,
    data: cfg.data,
    lineStyle: { type: 'dashed', width: 1, color: cfg.color },
    itemStyle: { color: cfg.color },
  });
}
