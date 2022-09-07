import React, { useEffect, useMemo, useRef } from 'react';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import {
  getLineOption,
  mapToLineSeries,
  toTimeXAxis,
} from '@modules/analyze/options';

const Trends = () => {
  const { data, isLoading } = useMetricQuery(client, {
    url: 'https://github.com/facebook/react',
  });

  const echartsOpts = useMemo(() => {
    if (!data) return {};
    const metricActivity = data?.metricActivity;
    const metricCodequality = data?.metricCodequality;
    const metricCommunity = data?.metricCommunity;

    const xAxisDate = toTimeXAxis(metricActivity, 'grimoireCreationDate');

    const activityScore = mapToLineSeries(
      metricActivity,
      'activityScore',
      'Community Activity'
    );
    const codeQuality = mapToLineSeries(
      metricCodequality,
      'codeQualityGuarantee',
      'Code Quality'
    );
    const communitySupport = mapToLineSeries(
      metricCommunity,
      'communitySupportScore',
      'Community Support'
    );

    return getLineOption({
      xAxisData: xAxisDate,
      series: [activityScore, codeQuality, communitySupport],
    });
  }, [data]);

  return (
    <BaseCard
      loading={isLoading}
      title="Trending"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

export default Trends;
