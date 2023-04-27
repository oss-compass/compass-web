import { BarSeriesOption, EChartsOption } from 'echarts';
import { colors } from '@common/options/color';
import { line } from '@common/options/series';
import { shortenAxisLabel } from '@common/utils/format';
import { DataContainerResult } from '@modules/analyze/type';

export const defaultTooltip: EChartsOption['tooltip'] = {
  trigger: 'axis',
  axisPointer: {
    type: 'cross',
  },
  order: 'valueDesc',
  enterable: true,
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
};

export const defaultLegend: EChartsOption['legend'] = {
  type: 'scroll',
  icon: 'circle',
  left: 0,
  // orient: 'vertical',
};

export const defaultGrid: EChartsOption['grid'] = {
  top: 60,
  left: '50px',
  right: '30px',
  bottom: '50px',
};

export const getYAxisWithUnit = ({
  unit,
  indicators,
  namePaddingLeft = 35,
  shortenYaxisNumberLabel,
  result,
}: {
  unit: string;
  indicators: string;
  namePaddingLeft?: number;
  shortenYaxisNumberLabel?: boolean;
  result: DataContainerResult;
}): EChartsOption => {
  return {
    grid: {
      top: result.isCompare ? 90 : 48,
      left: '40px',
      right: '30px',
      bottom: '40px',
    },
    yAxis: {
      type: 'value',
      name: [`{a|${unit}}`, `{b|${indicators}}`].join('\n'),
      nameTextStyle: {
        align: 'center',
        padding: [0, 0, 0, namePaddingLeft],
        rich: {
          a: {
            align: 'left',
            color: '#2C3542',
            fontSize: 10,
            lineHeight: 14,
            fontStyle: 'italic',
            fontWeight: 'bold',
          },
          b: {
            align: 'left',
            color: '#A0A4AA',
            fontSize: 10,
            lineHeight: 14,
            fontStyle: 'italic',
          },
        },
      },
      axisLabel: {
        formatter: (value: any) => {
          if (shortenYaxisNumberLabel) {
            return shortenAxisLabel(value);
          }
          return value;
        },
      },
    },
  };
};

/**
 * @deprecated use getYAxisWithUnit instead
 */
export const getYAxisWithUnitV1 = ({
  unit,
  indicators,
  namePaddingLeft = 35,
}: {
  unit: string;
  indicators: string;
  namePaddingLeft?: number;
}): EChartsOption => {
  return {
    grid: {
      top: 90,
      left: '40px',
      right: '30px',
      bottom: '40px',
    },
    yAxis: {
      name: [`{a|${unit}}`, `{b|${indicators}}`].join('\n'),
      nameTextStyle: {
        align: 'center',
        padding: [0, 0, 0, namePaddingLeft],
        rich: {
          a: {
            align: 'left',
            color: '#2C3542',
            fontSize: 10,
            lineHeight: 14,
            fontStyle: 'italic',
            fontWeight: 'bold',
          },
          b: {
            align: 'left',
            color: '#A0A4AA',
            fontSize: 10,
            lineHeight: 14,
            fontStyle: 'italic',
          },
        },
      },
    },
  };
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
    tooltip?: EChartsOption['tooltip'];
    legend?: EChartsOption['legend'];
  } & EChartsOption
): EChartsOption => {
  const { xAxisData, series, grid, legend, tooltip, yAxis, ...restOpts } = opts;

  return {
    color: colors,
    title: {},
    grid: grid || defaultGrid,
    legend: { ...defaultLegend, ...legend },
    tooltip: { ...defaultTooltip, ...tooltip },
    xAxis: categoryAxis(xAxisData),
    yAxis: yAxis || {
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
    legend?: EChartsOption['legend'];
  } & EChartsOption
): EChartsOption => {
  const { xAxisData, series, legend, tooltip, yAxis, ...restOpts } = opts;
  return {
    color: colors,
    title: {},
    grid: defaultGrid,
    legend: { ...defaultLegend, ...legend },
    tooltip: { ...defaultTooltip, ...tooltip },
    xAxis: categoryAxis(xAxisData),
    yAxis: yAxis || { type: 'value' },
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
