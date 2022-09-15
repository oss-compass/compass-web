import React, { useEffect, useMemo, useRef } from 'react';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  lineArea,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/SideBarConfig';
import {
  pickKeyToXAxis,
  pickKeyToYAxis,
} from '@modules/analyze/options/metric';

const CodeReviewRatio: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const echartsOpts = useMemo(() => {
    const series = yAxis.map(({ name, data }) => {
      return lineArea({ name, data });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis]);

  return (
    <BaseCard
      loading={loading}
      title="Code review ratio"
      id={CodeQuality.CodeReviewRatio}
      description="Percentage of recent 90-day code commits with at least one reviewer (not PR creator)"
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const CodeReviewRatioWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    return pickKeyToXAxis(data, {
      typeKey: 'metricCodequality',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    return pickKeyToYAxis(data, {
      typeKey: 'metricCodequality',
      valueKey: 'codeReviewRatio',
      legendName: 'Code review ratio',
    });
  }, [data]);

  return <CodeReviewRatio loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default CodeReviewRatioWithData;
