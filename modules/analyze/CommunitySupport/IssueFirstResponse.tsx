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

const IssueFirstResponse: React.FC<ChartComponentProps> = ({
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
      title="Issue first response"
      description="Average/Median first comments response (in days) for new Issues created in the last 90 days."
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const IssueFirstResponseWithData = () => {
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
        const avg = metricCommunity.map((i) =>
          String(i['issueFirstReponseAvg'])
        );
        const mid = metricCommunity?.map((i) =>
          String(i['issueFirstReponseMid'])
        );
        return [
          ...acc,
          {
            name: isCompare ? `${item.url} avg` : 'Issue first response avg',
            data: avg,
          },
          {
            name: isCompare ? `${item.url} mid` : 'Issue first response mid',
            data: mid,
          },
        ];
      }, []);
    }
    return [];
  }, [data]);

  return <IssueFirstResponse loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default IssueFirstResponseWithData;
