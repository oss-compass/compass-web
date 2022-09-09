import React, { useMemo } from 'react';
import { MetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import { getLineOption, mapToLineSeries, toTimeXAxis } from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const UpdatedIssuesCount: React.FC<{
  loading?: boolean;
  data: { url: string; result: MetricQuery | undefined }[];
}> = ({ loading = false, data }) => {
  const echartsOpts = useMemo(() => {
    if (!data[0]?.result?.metricCommunity) return {};

    const metricCommunity = data[0].result.metricCommunity;
    const xAxisDate = toTimeXAxis(metricCommunity, 'grimoireCreationDate');

    const isCompare = data?.length > 1;

    const series = data.map((item) => {
      return mapToLineSeries(
        item.result!.metricCommunity,
        'updatedIssuesCount',
        isCompare ? item.url : 'updatedIssuesCount'
      );
    });

    return getLineOption({
      xAxisData: xAxisDate,
      series,
    });
  }, [data]);

  return (
    <BaseCard
      loading={loading}
      title="updated Issues Count"
      description="Number of issue updates in the last 90 days."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const UpdatedIssuesCountWithData = () => {
  const data = useMetricQueryData();
  return <UpdatedIssuesCount data={data} />;
};

export default UpdatedIssuesCountWithData;
