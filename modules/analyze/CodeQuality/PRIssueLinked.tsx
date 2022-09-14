import React, { useEffect, useMemo, useRef } from 'react';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  lineArea,
  toTimeXAxis,
} from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';

const PRIssueLinked: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const echartsOpts = useMemo(() => {
    const series = yAxis.map(({ name, data }) => {
      return lineArea({ name, data });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis]);

  return (
    <BaseCard
      loading={loading}
      title="PR Issue Linked"
      description="Percentage of new pr link issues in the last 90 days."
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const PRIssueLinkedWithData = () => {
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
        const data = codeQuality?.map((i) => String(i['prIssueLinkedRatio']));
        return {
          name: isCompare ? item.url : 'PR Issue Linked',
          data: data || [],
        };
      });
    }
    return [];
  }, [data]);

  return <PRIssueLinked loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default PRIssueLinkedWithData;
