import React, { useEffect, useMemo, useRef } from 'react';
import {
  ChartComponentProps,
  getLineOption,
  line,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import {
  pickKeyToXAxis,
  pickKeyToYAxis,
} from '@modules/analyze/options/metric';
import { Support } from '@modules/analyze/Misc/SideBar/menus';

const ClosedPrsCount: React.FC<ChartComponentProps> = ({
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
      title="Closed PR count"
      id={Support.ClosedPrsCount}
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
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

const ClosedPrsCountWithData = () => {
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
      valueKey: 'closedPrsCount',
      legendName: 'Closed PR Count',
    });
  }, [data]);

  return <ClosedPrsCount loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default ClosedPrsCountWithData;
