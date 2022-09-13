import React, { useEffect, useMemo, useRef } from 'react';
import { LineSeriesOption } from 'echarts';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import {
  ChartComponentProps,
  getLineOption,
  line,
  mapToLineSeries,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';

const PrOpenTime: React.FC<ChartComponentProps> = ({
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
      title="PR open time"
      description="Average/Median processing time (days) for new change requests created in the last 90 days, including closed/accepted change request and unresolved change request."
    >
      <EChartX option={echartsOpts} />
    </BaseCard>
  );
};

const PrOpenTimeWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    const metricCommunity = get(data, '[0].result.metricCommunity', []);
    if (isArray(metricCommunity)) {
      return toTimeXAxis(metricCommunity, 'grimoireCreationDate');
    }
    return [];
  }, [data]);

  const yAxis = useMemo(() => {
    if (isArray(data)) {
      const isCompare = data.length > 1;

      return data.reduce<any>((acc, item) => {
        if (!item.result) return [];
        const metricCommunity = item.result.metricCommunity;
        const avg = metricCommunity.map((i) => String(i['prOpenTimeAvg']));
        const mid = metricCommunity?.map((i) => String(i['prOpenTimeMid']));
        return [
          ...acc,
          {
            name: isCompare ? `${item.url} avg` : 'Rr open time avg',
            data: avg,
          },
          {
            name: isCompare ? `${item.url} mid` : 'Rr open time mid',
            data: mid,
          },
        ];
      }, []);
    }
    return [];
  }, [data]);

  return <PrOpenTime loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default PrOpenTimeWithData;
