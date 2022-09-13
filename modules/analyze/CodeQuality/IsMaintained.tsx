import React, { useEffect, useMemo, useRef } from 'react';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  line,
  mapToLineSeries,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';

const IsMaintained: React.FC<ChartComponentProps> = ({
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
      title="Is Maintained"
      description="Percentage of weeks with at least one code commit in the past 90 days."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const IsMaintainedWithData = () => {
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
        const data = codeQuality?.map((i) => String(i['isMaintained']));
        return {
          name: isCompare ? item.url : 'Is Maintained',
          data: data || [],
        };
      });
    }
    return [];
  }, [data]);

  return <IsMaintained loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default IsMaintainedWithData;
