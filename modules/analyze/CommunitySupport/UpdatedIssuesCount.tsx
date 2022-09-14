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
import { CommunitySupport } from '@modules/analyze/Misc/SideBar/SideBarConfig';

const UpdatedIssuesCount: React.FC<ChartComponentProps> = ({
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
      title="Updated issues count"
      id={CommunitySupport.UpdatedIssuesCount}
      description="Number of issue updates in the last 90 days."
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const UpdatedIssuesCountWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    const metricCommunity = get(data, '[0].result.metricCommunity', []);
    if (isArray(metricCommunity)) {
      return toTimeXAxis(metricCommunity, 'grimoireCreationDate');
    }
    return [];
  }, [data]);

  const yAxis = useMemo(() => {
    if (isArray(data)) {
      const isCompare = data.length > 1;
      return data.map((item) => {
        const metricCommunity = item.result?.metricCommunity;
        const data = metricCommunity?.map((i) =>
          String(i['updatedIssuesCount'])
        );
        return {
          name: isCompare ? item.url : 'updatedIssuesCount',
          data: data || [],
        };
      });
    }
    return [];
  }, [data]);

  return <UpdatedIssuesCount loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default UpdatedIssuesCountWithData;
