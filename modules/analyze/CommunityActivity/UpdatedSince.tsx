import React, { useMemo } from 'react';
import { MetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import { getLineOption, mapToLineSeries, toTimeXAxis } from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const UpdatedSince: React.FC<{
  loading?: boolean;
  data: { url: string; result: MetricQuery | undefined }[];
}> = ({ loading = false, data }) => {
  const echartsOpts = useMemo(() => {
    if (!data[0]?.result?.metricActivity) return {};

    const metricCommunity = data[0].result.metricCommunity;
    const xAxisDate = toTimeXAxis(metricCommunity, 'grimoireCreationDate');

    const isCompare = data?.length > 1;

    const series = data.map((item) => {
      return mapToLineSeries(
        item.result!.metricActivity,
        'updatedSince',
        isCompare ? item.url : 'updated since'
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
      title="Updated since"
      description="Determine the average time per repository since the repository was last updated (in months)."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const UpdatedSinceWithData = () => {
  const data = useMetricQueryData();
  return <UpdatedSince data={data} />;
};

export default UpdatedSinceWithData;
