import React, { useEffect, useMemo, useRef } from 'react';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import {
  ChartComponentProps,
  getLineOption,
  line,
  mapToLineSeries,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { CommunityActivity } from '@modules/analyze/Misc/SideBar/SideBarConfig';

const ClosedPrsCount: React.FC<ChartComponentProps> = ({
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
      title="Closed PR count"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const ClosedPrsCountWithData = () => {
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
        const data = metricCommunity?.map((i) => String(i['closedPrsCount']));
        return {
          name: isCompare ? item.url : 'Closed PR Count',
          data: data || [],
        };
      });
    }
    return [];
  }, [data]);

  return <ClosedPrsCount loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default ClosedPrsCountWithData;
