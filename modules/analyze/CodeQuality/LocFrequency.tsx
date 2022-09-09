import React, { useEffect, useMemo, useRef } from 'react';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import {
  getLineOption,
  mapToLineAreaSeries,
  mapToLineSeries,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const CodeMergeRatio: React.FC<{
  loading?: boolean;
  data: { url: string; result: MetricQuery | undefined }[];
}> = ({ loading = false, data }) => {
  const echartsOpts = useMemo(() => {
    if (!data[0]?.result?.metricCodequality) return {};

    const metricCodequality = data[0].result.metricCodequality;
    const xAxisDate = toTimeXAxis(metricCodequality, 'grimoireCreationDate');

    const isCompare = data?.length > 1;

    const series = data.map((item) => {
      return mapToLineAreaSeries(
        item.result!.metricCodequality,
        'locFrequency',
        isCompare ? item.url : 'locFrequency'
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
      title="loc frequency"
      description="Determine the average number of lines touched (lines added plus lines removed) per week in the past 90 days."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const CodeMergeRatioWithData = () => {
  const data = useMetricQueryData();
  return <CodeMergeRatio data={data} />;
};

export default CodeMergeRatioWithData;
