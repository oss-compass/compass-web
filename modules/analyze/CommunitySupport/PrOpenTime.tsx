import React, { useEffect, useMemo, useRef } from 'react';
import { LineSeriesOption } from 'echarts';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import { getLineOption, mapToLineSeries, toTimeXAxis } from '../options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const PrOpenTime: React.FC<{
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
        'prOpenTimeAvg',
        isCompare ? item.url : 'Rr open time avg'
      );
      const mid = mapToLineSeries(
        item.result!.metricCommunity,
        'prOpenTimeMid',
        isCompare ? item.url : 'Rr open time mid'
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
      title="PR open time"
      description="Average/Median processing time (days) for new change requests created in the last 90 days, including closed/accepted change request and unresolved change request."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const PrOpenTimeWithData = () => {
  const data = useMetricQueryData();
  return <PrOpenTime data={data} />;
};

export default PrOpenTimeWithData;
