import React, { useMemo } from 'react';
import { MetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import { getLineOption, mapToLineSeries, toTimeXAxis } from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const IssueCommentCount: React.FC<{
  loading?: boolean;
  data: { url: string; result: MetricQuery | undefined }[];
}> = ({ loading = false, data }) => {
  const echartsOpts = useMemo(() => {
    return {};
    // if (!data[0]?.result?.metricCommunity) return {};
    //
    // const metricCommunity = data[0].result.metricCommunity;
    // const xAxisDate = toTimeXAxis(metricCommunity, 'grimoireCreationDate');
    //
    // const isCompare = data?.length > 1;
    //
    // const series = data.map((item) => {
    //   return mapToLineSeries(
    //     item.result!.metricCommunity,
    //     'communitySupportScore',
    //     isCompare ? item.url : 'Community Support'
    //   );
    // });
    //
    // return getLineOption({
    //   xAxisData: xAxisDate,
    //   series,
    // });
  }, [data]);

  return (
    <BaseCard
      loading={loading}
      title="Issue comment count"
      description="Determine the average number of comments per issue created in the last 90 days"
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const IssueCommentCountWithData = () => {
  const data = useMetricQueryData();
  return <IssueCommentCount data={data} />;
};

export default IssueCommentCountWithData;
