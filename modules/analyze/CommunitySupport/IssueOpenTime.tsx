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
import { LineSeriesOption } from 'echarts';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { CommunitySupport } from '@modules/analyze/Misc/SideBar/SideBarConfig';
import { repoUrlFormatForChart } from '@common/utils/url';
import { pickKeyToXAxis } from '@modules/analyze/options/metric';

const IssueOpenTime: React.FC<ChartComponentProps> = ({
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
      title="Issue open time"
      id={CommunitySupport.IssueOpenTime}
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const IssueOpenTimeWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    return pickKeyToXAxis(data, {
      typeKey: 'metricCommunity',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    if (isArray(data)) {
      const isCompare = data.length > 1;

      return data.reduce<any>((acc, item) => {
        if (!item.result) return [];
        const metricCommunity = item.result.metricCommunity;
        const avg = metricCommunity.map((i) => String(i['issueOpenTimeAvg']));
        const mid = metricCommunity?.map((i) => String(i['issueOpenTimeMid']));
        return [
          ...acc,
          {
            name: isCompare
              ? `${repoUrlFormatForChart(item.label)} avg`
              : 'Issue open time avg',
            data: avg,
          },
          {
            name: isCompare
              ? `${repoUrlFormatForChart(item.label)} mid`
              : 'Issue open time mid',
            data: mid,
          },
        ];
      }, []);
    }
    return [];
  }, [data]);

  return <IssueOpenTime loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default IssueOpenTimeWithData;
