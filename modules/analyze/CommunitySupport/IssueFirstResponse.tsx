import React, { useEffect, useMemo, useRef } from 'react';
import { LineSeriesOption } from 'echarts';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import { getLineOption, mapToLineSeries, toTimeXAxis } from '../options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const IssueFirstResponse: React.FC<{
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
        'issueFirstReponseAvg',
        isCompare ? item.url : 'Issue first response avg'
      );
      const mid = mapToLineSeries(
        item.result!.metricCommunity,
        'issueFirstReponseMid',
        isCompare ? item.url : 'Issue first response mid'
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
      title="Issue first response"
      description="Average/Median first comments response (in days) for new Issues created in the last 90 days."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const IssueFirstResponseWithData = () => {
  const data = useMetricQueryData();
  return <IssueFirstResponse data={data} />;
};

export default IssueFirstResponseWithData;
