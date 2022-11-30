import React, { useContext, useMemo } from 'react';
import { ChartProps } from '@modules/analyze/options';
import {
  TransOpts,
  TransResult,
  transToAxis,
} from '@modules/analyze/DataTransform/transToAxis';
import { EChartsOption } from 'echarts';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import EChartX from '@common/components/EChartX';
import { ChartThemeState, chartThemeState } from '@modules/analyze/store';
import { useSnapshot } from 'valtio';

const Chart: React.FC<
  ChartProps & {
    getOptions: (
      result: TransResult,
      theme?: DeepReadonly<ChartThemeState>
    ) => EChartsOption;
    tansOpts: TransOpts;
  }
> = ({ containerRef, getOptions, tansOpts }) => {
  const theme = useSnapshot(chartThemeState);
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);
  const { xAxis, yResults } = transToAxis(data, tansOpts);
  const echartsOpts = getOptions({ xAxis, yResults }, theme);

  return (
    <EChartX
      option={echartsOpts}
      loading={isLoading}
      containerRef={containerRef}
    />
  );
};

export default Chart;
