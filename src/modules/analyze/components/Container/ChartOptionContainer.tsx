import React, { ReactNode } from 'react';
import { EChartsOption } from 'echarts';
import { formatISO } from '@common/utils';
import { useSnapshot } from 'valtio';
import { ChartThemeState, chartThemeState } from '@modules/analyze/store';
import { DataContainerResult } from '@modules/analyze/type';

const ChartOptionContainer = (props: {
  data: DataContainerResult;
  optionCallback: (
    input: DataContainerResult,
    theme?: DeepReadonly<ChartThemeState>
  ) => EChartsOption;
  indicators?: string;
  children: ((args: { option: EChartsOption }) => ReactNode) | ReactNode;
}) => {
  const { optionCallback, indicators, children, data } = props;
  const theme = useSnapshot(chartThemeState);
  const {
    isCompare,
    compareLabels,
    xAxis,
    yResults,
    summaryMean,
    summaryMedian,
  } = data;

  const echartsOpts = optionCallback(
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

  if (!isCompare) {
    echartsOpts.grid = {
      ...echartsOpts.grid,
      top: indicators ? 50 : 10,
    };
    echartsOpts.legend = {
      show: false,
    };
  }

  return (
    <>
      {typeof children === 'function'
        ? children({ option: echartsOpts })
        : children}
    </>
  );
};

export default ChartOptionContainer;
