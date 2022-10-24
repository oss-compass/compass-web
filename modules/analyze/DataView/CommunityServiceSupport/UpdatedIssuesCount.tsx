import React, { useMemo } from 'react';
import { MetricQuery } from '@graphql/generated';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  line,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { Support } from '@modules/analyze/Misc/SideBar/menus';
import {
  pickKeyToXAxis,
  pickKeyToYAxis,
} from '@modules/analyze/options/metric';

const UpdatedIssuesCount: React.FC<ChartComponentProps> = ({
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
      title="Updated issues count"
      id={Support.UpdatedIssuesCount}
      description={`Number of issue updates in the last 90 days.`}
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

const UpdatedIssuesCountWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    return pickKeyToXAxis(data, {
      typeKey: 'metricCommunity',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    return pickKeyToYAxis(data, {
      typeKey: 'metricCommunity',
      valueKey: 'updatedIssuesCount',
      legendName: 'Updated Issues Count',
    });
  }, [data]);

  return <UpdatedIssuesCount loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default UpdatedIssuesCountWithData;
