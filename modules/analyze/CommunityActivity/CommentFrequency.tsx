import React, { useMemo } from 'react';
import { MetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  lineArea,
  mapToLineSeries,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';

const CommentFrequency: React.FC<ChartComponentProps> = ({
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
      title="commentFrequency"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const CommentFrequencyWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    const metricActivity = get(data, '[0].result.metricActivity', []);
    if (isArray(metricActivity)) {
      return toTimeXAxis(metricActivity, 'grimoireCreationDate');
    }
    return [];
  }, [data]);

  const yAxis = useMemo(() => {
    if (isArray(data)) {
      const isCompare = data.length > 1;
      return data.map((item) => {
        const metricActivity = item.result?.metricActivity;
        const data = metricActivity?.map((i) => String(i['commentFrequency']));
        return {
          name: isCompare ? item.url : 'commentFrequency',
          data: data || [],
        };
      });
    }
    return [];
  }, [data]);

  return <CommentFrequency loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default CommentFrequencyWithData;
