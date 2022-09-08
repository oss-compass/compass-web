import React, { useMemo } from 'react';
import {
  getLineOption,
  mapToLineSeries,
  toTimeXAxis,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { MetricQuery } from '@graphql/generated';

const TrendsChart: React.FC<{
  loading: boolean;
  data: MetricQuery | undefined;
}> = ({ loading = false, data }) => {
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
      loading={loading}
      title="Trending"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

export default TrendsChart;
