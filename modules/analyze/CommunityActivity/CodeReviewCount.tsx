import React, { useMemo } from 'react';
import { MetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import { getLineOption, mapToLineSeries, toTimeXAxis } from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const CodeReviewCount: React.FC<{
  loading?: boolean;
  data: { url: string; result: MetricQuery | undefined }[];
}> = ({ loading = false, data }) => {
  const echartsOpts = useMemo(() => {
    if (!data[0]?.result?.metricActivity) return {};

    const metricActivity = data[0].result.metricActivity;
    const xAxisDate = toTimeXAxis(metricActivity, 'grimoireCreationDate');

    const isCompare = data?.length > 1;

    const series = data.map((item) => {
      return mapToLineSeries(
        item.result!.metricActivity,
        'codeReviewCount',
        isCompare ? item.url : 'code review count'
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
      title="Code review count"
      description="Determine the average number of review comments per pull request created in the last 90 days"
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const CodeReviewCountWithData = () => {
  const data = useMetricQueryData();
  return <CodeReviewCount data={data} />;
};

export default CodeReviewCountWithData;
