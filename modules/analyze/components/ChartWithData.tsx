import React, { ReactNode } from 'react';
import transMetricToAxis from '@modules/analyze/DataTransform/transMetricToAxis';
import transSummaryToAxis from '@modules/analyze/DataTransform/transSummaryToAxis';
import { EChartsOption } from 'echarts';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { ChartThemeState, chartThemeState } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';
import { formatISO } from '@common/utils';
import { TransOpt, GenChartData } from '@modules/analyze/type';

const ChartWithData: React.FC<{
  tansOpts: TransOpt;
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

  const { xAxis, yResults } = transMetricToAxis(data?.items, tansOpts);
  const { summaryMean, summaryMedian } = transSummaryToAxis(
    data?.summary,
    xAxis,
    tansOpts.summaryKey
  );

  const compareLabels = yResults.map((i) => i.label);
  const isCompare = yResults.length > 1;

  const echartsOpts = getOptions(
    {
      isCompare,
      compareLabels,
      xAxis: xAxis.map((i) => formatISO(i)),
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

export default ChartWithData;
