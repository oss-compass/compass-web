import React, { useMemo } from 'react';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  line,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';

const Overview: React.FC<ChartComponentProps> = ({
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
      title="Overview"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const OverviewWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    const codeQuality = get(data, '[0].result.metricCodequality', []);
    if (isArray(codeQuality)) {
      return toTimeXAxis(codeQuality, 'grimoireCreationDate');
    }
    return [];
  }, [data]);

  const yAxis = useMemo(() => {
    if (isArray(data)) {
      const isCompare = data.length > 1;
      return data.map((item) => {
        const codeQuality = item.result?.metricCodequality;
        const data = codeQuality?.map((i) => String(i['codeQualityGuarantee']));
        return {
          name: isCompare ? item.url : 'Code Quality',
          data: data || [],
        };
      });
    }
    return [];
  }, [data]);

  return <Overview loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default OverviewWithData;
