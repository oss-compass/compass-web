import {
  BarSeriesOption,
  BoxplotSeriesOption,
  EffectScatterSeriesOption,
  HeatmapSeriesOption,
  LineSeriesOption,
  ScatterSeriesOption,
  TreemapSeriesOption,
  EChartsOption,
} from 'echarts';
import {
  DimensionLoose,
  OptionEncodeValue,
  OptionDataValue,
} from 'echarts/types/src/util/types';
import { formatISO } from '@common/utils/time';

export const getLineOption = ({
  xAxisData,
  series,
}: {
  xAxisData: string[];
  series: LineSeriesOption[];
}): EChartsOption => {
  return {
    title: {},
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      icon: 'circle',
      left: 0,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: xAxisData,
      axisLabel: {
        align: 'center',
        rotate: 10,
        margin: 20,
      },
    },
    yAxis: {
      type: 'value',
    },
    series,
  };
};

export const toTimeXAxis = (arr: any[], key: string): string[] => {
  return arr.map((i) => formatISO(i[key]));
};

export const toLineSeries = (opts: {
  name: string;
  data: (string | number)[];
}): LineSeriesOption => {
  return {
    name: opts.name,
    type: 'line',
    smooth: true,
    data: opts.data,
  };
};
export const mapToLineSeries = (
  arr: any[],
  key: string,
  name: string
): LineSeriesOption => {
  const values = arr.map((i) => String(i[key]));
  return toLineSeries({ name: name, data: values });
};
