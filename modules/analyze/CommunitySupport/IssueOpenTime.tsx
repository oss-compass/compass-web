import React, { useMemo } from 'react';
import { MetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import { getLineOption, mapToLineSeries, toTimeXAxis } from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { LineSeriesOption } from 'echarts';

const IssueOpenTime: React.FC<{
  loading?: boolean;
  data: { url: string; result: MetricQuery | undefined }[];
}> = ({ loading = false, data }) => {
  const echartsOpts = useMemo(() => {
    if (!data[0]?.result?.metricCommunity) return {};

    const metricCommunity = data[0].result.metricCommunity;
    const xAxisDate = toTimeXAxis(metricCommunity, 'grimoireCreationDate');

    const isCompare = data?.length > 1;

    const series = data.reduce<LineSeriesOption[]>((acc, item) => {
      const avg = mapToLineSeries(
        item.result!.metricCommunity,
        'issueOpenTimeAvg',
        isCompare ? item.url : 'Issue open time avg'
      );
      const mid = mapToLineSeries(
        item.result!.metricCommunity,
        'issueOpenTimeMid',
        isCompare ? item.url : 'Issue open time mid'
      );
      return [...acc, avg, mid];
    }, []);

    return getLineOption({
      xAxisData: xAxisDate,
      series,
    });
  }, [data]);

  return (
    <BaseCard
      loading={loading}
      title="IssueOpenTime"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const IssueOpenTimeWithData = () => {
  const data = useMetricQueryData();
  return <IssueOpenTime data={data} />;
};

export default IssueOpenTimeWithData;
