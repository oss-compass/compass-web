import React, { useMemo } from 'react';
import { MetricQuery } from '@graphql/generated';
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

const CodeReviewCount: React.FC<ChartComponentProps> = ({
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
      title="Code review count"
      description="Determine the average number of review comments per pull request created in the last 90 days"
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const CodeReviewCountWithData = () => {
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
        const data = metricActivity?.map((i) => String(i['codeReviewCount']));
        return {
          name: isCompare ? item.url : 'code review count',
          data: data || [],
        };
      });
    }
    return [];
  }, [data]);

  return <CodeReviewCount loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default CodeReviewCountWithData;
