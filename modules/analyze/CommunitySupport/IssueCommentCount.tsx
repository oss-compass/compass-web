import React, { useMemo } from 'react';
import { MetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  line,
  mapToLineSeries,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';

const IssueCommentCount: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const echartsOpts = useMemo(() => {
    const series = yAxis.map(({ name, data }) => {
      return line({ name, data });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis]);

  return (
    <BaseCard
      loading={loading}
      title="Issue comment count"
      description="Determine the average number of comments per issue created in the last 90 days"
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const IssueCommentCountWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);
  //
  // const xAxis = useMemo(() => {
  //   const metricCommunity = get(data, '[0].result.metricCommunity', []);
  //   if (isArray(metricCommunity)) {
  //     return toTimeXAxis(metricCommunity, 'grimoireCreationDate');
  //   }
  //   return [];
  // }, [data]);
  //
  // const yAxis = useMemo(() => {
  //   if (isArray(data)) {
  //     const isCompare = data.length > 1;
  //     return data.map((item) => {
  //       const metricCommunity = item.result?.metricCommunity;
  //       const data = metricCommunity?.map((i) =>
  //         String(i['communitySupportScore'])
  //       );
  //       return {
  //         name: isCompare ? item.url : 'Community Support',
  //         data: data || [],
  //       };
  //     });
  //   }
  //   return [];
  // }, [data]);

  return <IssueCommentCount loading={isLoading} xAxis={[]} yAxis={[]} />;
};

export default IssueCommentCountWithData;
