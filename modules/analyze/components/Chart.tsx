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
import { ChartThemeContext, ChartThemeState } from '@modules/analyze/context';

const Chart: React.FC<
  ChartProps & {
    getOptions: (result: TransResult, theme?: ChartThemeState) => EChartsOption;
    tansOpts: TransOpts;
  }
> = ({ containerRef, getOptions, tansOpts }) => {
  const { state: theme } = useContext(ChartThemeContext);
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const { xAxis, yResults } = useMemo(() => {
    return transToAxis(data, tansOpts);
  }, [data, tansOpts]);

  const echartsOpts = useMemo(() => {
    return getOptions({ xAxis, yResults }, theme);
  }, [getOptions, theme, xAxis, yResults]);

  return (
    <EChartX
      option={echartsOpts}
      loading={isLoading}
      containerRef={containerRef}
    />
  );
};

export default Chart;
