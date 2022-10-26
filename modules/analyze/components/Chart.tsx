import React, { useMemo } from 'react';
import { ChartProps } from '@modules/analyze/options';
import {
  TransOpts,
  TransResult,
  transToAxis,
} from '@modules/analyze/DataTransform/transToAxis';
import { EChartsOption } from 'echarts';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import EChartX from '@common/components/EChartX';

const Chart: React.FC<
  ChartProps & {
    getOptions: (a: TransResult) => EChartsOption;
    tansOpts: TransOpts;
  }
> = ({ containerRef, getOptions, tansOpts }) => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const { xAxis, yResults } = useMemo(() => {
    return transToAxis(data, tansOpts);
  }, [data, tansOpts]);

  const echartsOpts = useMemo(() => {
    return getOptions({ xAxis, yResults });
  }, [getOptions, xAxis, yResults]);

  return (
    <EChartX
      option={echartsOpts}
      loading={isLoading}
      containerRef={containerRef}
    />
  );
};

export default Chart;
