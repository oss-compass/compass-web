import React, { useMemo } from 'react';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  line,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { CommunitySupport } from '@modules/analyze/Misc/SideBar/SideBarConfig';
import { repoUrlFormatForChart } from '@common/utils/url';
import { pickKeyToXAxis } from '@modules/analyze/options/metric';

const Overview: React.FC<ChartComponentProps> = ({
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
      title="Overview"
      id={CommunitySupport.Overview}
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const OverviewWithData = () => {
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
      return data.map((item) => {
        const metricCommunity = item.result?.metricCommunity;
        const data = metricCommunity?.map((i) =>
          String(i['communitySupportScore'])
        );
        return {
          name: isCompare
            ? repoUrlFormatForChart(item.label)
            : 'Community Support',
          data: data || [],
        };
      });
    }
    return [];
  }, [data]);

  console.log(yAxis);

  return <Overview loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default OverviewWithData;
