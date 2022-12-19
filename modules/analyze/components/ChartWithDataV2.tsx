import React, { ReactNode } from 'react';
import transToAxisWithSummary from '@modules/analyze/DataTransform/transToAxisWithSummary';
import { EChartsOption } from 'echarts';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { ChartThemeState, chartThemeState } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';
import { TransOpt, GenChartData } from '@modules/analyze/type';

const ChartWithDataV2: React.FC<{
  tansOpts: TransOpt & { tabValue?: string };
  getOptions: (
    input: GenChartData,
    theme?: DeepReadonly<ChartThemeState>
  ) => EChartsOption;
  children:
    | ((loading: boolean, option: EChartsOption) => ReactNode)
    | ReactNode;
}> = ({ children, getOptions, tansOpts }) => {
  const theme = useSnapshot(chartThemeState);
  const data = useMetricQueryData();
  const loading = data?.loading;

  const { xAxis, yResults, summaryMean, summaryMedian } =
    transToAxisWithSummary(data?.items, tansOpts);

  const compareLabels = yResults.map((i) => i.label);
  const isCompare = yResults.length > 1;

  const echartsOpts = getOptions(
    {
      isCompare,
      tabValue: tansOpts.tabValue,
      compareLabels,
      xAxis,
      yResults,
      summaryMean,
      summaryMedian,
    },
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

export default ChartWithDataV2;
