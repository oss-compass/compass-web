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
} from 'echarts/types/src/util/types';

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
    // legend: {
    //   data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
    // },
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
    },
    yAxis: {
      type: 'value',
    },
    series,
  };
};
