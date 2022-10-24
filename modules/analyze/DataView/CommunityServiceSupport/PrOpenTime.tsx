import React, { useEffect, useMemo, useRef } from 'react';
import { LineSeriesOption } from 'echarts';
import { MetricQuery, useMetricQuery } from '@graphql/generated';
import {
  ChartComponentProps,
  getLineOption,
  line,
  mapToLineSeries,
  toTimeXAxis,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { Support } from '@modules/analyze/Misc/SideBar/menus';
import { repoUrlFormat } from '@common/utils/url';
import {
  pickKeyGroupToYAxis,
  pickKeyToXAxis,
} from '@modules/analyze/options/metric';

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
      title="PR open time"
      id={Support.PrOpenTime}
      description={`Average/Median processing time (days) for new change requests created in the last 90 days, including closed/accepted change request and unresolved change request.`}
    >
      {(containerRef) => (
        <EChartX
          option={echartsOpts}
          loading={loading}
          containerRef={containerRef}
        />
      )}
    </BaseCard>
  );
};

const PrOpenTimeWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    return pickKeyToXAxis(data, {
      typeKey: 'metricCommunity',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    return pickKeyGroupToYAxis(data, [
      {
        typeKey: 'metricCommunity',
        valueKey: 'prOpenTimeAvg',
        legendName: 'avg',
      },
      {
        typeKey: 'metricCommunity',
        valueKey: 'prOpenTimeMid',
        legendName: 'mid',
      },
    ]);
  }, [data]);

  return <PrOpenTime loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default PrOpenTimeWithData;
