import React, { useEffect, useMemo, useRef } from 'react';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import { getLineOption, mapToLineSeries, toTimeXAxis } from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const IsMaintained: React.FC<{
  loading?: boolean;
  data: { url: string; result: MetricQuery | undefined }[];
}> = ({ loading = false, data }) => {
  const echartsOpts = useMemo(() => {
    if (!data[0]?.result?.metricCodequality) return {};

    const metricCodequality = data[0].result.metricCodequality;
    const xAxisDate = toTimeXAxis(metricCodequality, 'grimoireCreationDate');

    const isCompare = data?.length > 1;

    const series = data.map((item) => {
      return mapToLineSeries(
        item.result!.metricCodequality,
        'isMaintained',
        isCompare ? item.url : 'Contributor Count'
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
      title="Is Maintained"
      description="Percentage of weeks with at least one code commit in the past 90 days."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const IsMaintainedWithData = () => {
  const data = useMetricQueryData();
  return <IsMaintained data={data} />;
};

export default IsMaintainedWithData;
