import React, { ReactNode } from 'react';
import {
  TransOpts,
  TransResult,
  transToAxis,
} from '@modules/analyze/DataTransform/transToAxis';
import { EChartsOption } from 'echarts';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { ChartThemeState, chartThemeState } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';

const ChartWithData: React.FC<{
  getOptions: (
    result: TransResult,
    theme?: DeepReadonly<ChartThemeState>
  ) => EChartsOption;
  tansOpts: TransOpts;
  children:
    | ((loading: boolean, option: EChartsOption) => ReactNode)
    | ReactNode;
}> = ({ children, getOptions, tansOpts }) => {
  const theme = useSnapshot(chartThemeState);
  const data = useMetricQueryData();
  const loading = data?.loading;
  const { xAxis, yResults } = transToAxis(data?.items, tansOpts);
  const compareLabels = yResults.map((i) => i.label);
  const isCompare = yResults.length > 1;
  const echartsOpts = getOptions(
    { isCompare, tabValue: tansOpts.tabValue, compareLabels, xAxis, yResults },
    theme
  );

  return (
    <>
      {typeof children === 'function'
        ? children(loading, echartsOpts)
        : children}
    </>
  );
};

export default ChartWithData;
