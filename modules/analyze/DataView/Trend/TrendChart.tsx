import React, { useMemo } from 'react';
import {
  ChartComponentProps,
  getLineOption,
  line,
  mapToLineSeries,
  toTimeXAxis,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { MetricQuery } from '@graphql/generated';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import {
  pickKeyGroupToYAxis,
  pickKeyToXAxis,
} from '@modules/analyze/options/metric';

const TrendsChart: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const echartsOpts = useMemo(() => {
    const series = yAxis.map(({ name, data }) => {
      return line({ name, data });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis]);

  return (
    <BaseCard
      loading={loading}
      title="Trending"
      id={'trending'}
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const TrendsChartWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    return pickKeyToXAxis(data, {
      typeKey: 'metricCodequality',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    return pickKeyGroupToYAxis(data, [
      {
        typeKey: 'metricCodequality',
        valueKey: 'codeQualityGuarantee',
        legendName: 'Code Quality',
      },
      {
        typeKey: 'metricActivity',
        valueKey: 'activityScore',
        legendName: 'Community Activity',
      },
      {
        typeKey: 'metricCommunity',
        valueKey: 'communitySupportScore',
        legendName: 'Community Support',
      },
    ]);
  }, [data]);

  return <TrendsChart loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default TrendsChartWithData;
