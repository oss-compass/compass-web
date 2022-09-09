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

const CodeReviewRatio: React.FC<{
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
        'codeReviewRatio',
        isCompare ? item.url : 'Code review ratio'
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
      title="Code review ratio"
      description="Percentage of recent 90-day code commits with at least one reviewer (not PR creator)"
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const CodeReviewRatioWithData = () => {
  const data = useMetricQueryData();
  return <CodeReviewRatio data={data} />;
};

export default CodeReviewRatioWithData;
