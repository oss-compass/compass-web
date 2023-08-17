import { EChartsOption } from 'echarts';
import { DataResults } from '../type';

export type getBuilderOptionFn<T> = (option?: T) => BuilderFn;

type BuilderFn = (pre: EChartsOption, data: DataResults) => EChartsOption;

const useEChartBuilderFns = (fns: BuilderFn[]) => {
  return (data: DataResults) => {
    return fns.reduce((pre, current) => {
      return current(pre, data);
    }, {});
  };
};

export default useEChartBuilderFns;
