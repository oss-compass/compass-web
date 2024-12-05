import { EChartsOption } from 'echarts';
import { DataResults } from '../type';

export type getDataBuilderFn<T> = (option?: T) => DataBuilderFn;

type DataBuilderFn = (data: DataResults, layout?: string | null) => DataResults;

export const useDataBuilder = (fns: DataBuilderFn[]) => {
  return (data: DataResults, layout?: string | null) => {
    return fns.reduce<DataResults>((pre, current) => {
      return current(pre, layout);
    }, data);
  };
};

export type getChartBuilderFn<T> = (option?: T) => ChartBuilderFn;

type ChartBuilderFn = (pre: EChartsOption, data: DataResults) => EChartsOption;
export const useEChartBuilder = (fns: ChartBuilderFn[]) => {
  return (data: DataResults) => {
    return fns.reduce((pre, current) => {
      return current(pre, data);
    }, {});
  };
};
