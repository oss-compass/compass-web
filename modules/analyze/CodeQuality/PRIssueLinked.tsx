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

const PRIssueLinked: React.FC<{
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
        'prIssueLinkedRatio',
        isCompare ? item.url : 'PR Issue Linked'
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
      title="PR Issue Linked"
      description="Percentage of new pr link issues in the last 90 days."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const PRIssueLinkedWithData = () => {
  const data = useMetricQueryData();
  return <PRIssueLinked data={data} />;
};

export default PRIssueLinkedWithData;
