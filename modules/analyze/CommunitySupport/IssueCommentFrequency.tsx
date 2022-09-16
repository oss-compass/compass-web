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
import { CommunitySupport } from '@modules/analyze/Misc/SideBar/SideBarConfig';
import {
  pickKeyToXAxis,
  pickKeyToYAxis,
} from '@modules/analyze/options/metric';

const IssueCommentFrequency: React.FC<ChartComponentProps> = ({
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
      id={CommunitySupport.IssueCommentFrequency}
      description="Determine the average number of comments per issue created in the last 90 days"
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const IssueCommentFrequencyWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    return pickKeyToXAxis(data, {
      typeKey: 'metricCommunity',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    return pickKeyToYAxis(data, {
      typeKey: 'metricCommunity',
      valueKey: 'commentFrequency',
      legendName: 'Issue comment frequency',
    });
  }, [data]);

  return (
    <IssueCommentFrequency loading={isLoading} xAxis={xAxis} yAxis={yAxis} />
  );
};

export default IssueCommentFrequencyWithData;
