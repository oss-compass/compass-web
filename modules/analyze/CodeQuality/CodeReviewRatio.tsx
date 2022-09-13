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
      description="Percentage of recent 90-day code commits with at least one reviewer (not PR creator)"
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const CodeReviewRatioWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    const codeQuality = get(data, '[0].result.metricCodequality', []);
    if (isArray(codeQuality)) {
      return toTimeXAxis(codeQuality, 'grimoireCreationDate');
    }
    return [];
  }, [data]);

  const yAxis = useMemo(() => {
    if (isArray(data)) {
      const isCompare = data.length > 1;
      return data.map((item) => {
        const codeQuality = item.result?.metricCodequality;
        const data = codeQuality?.map((i) => String(i['codeReviewRatio']));
        return {
          name: isCompare ? item.url : 'Code review ratio',
          data: data || [],
        };
      });
    }
    return [];
  }, [data]);

  return <CodeReviewRatio loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default CodeReviewRatioWithData;
