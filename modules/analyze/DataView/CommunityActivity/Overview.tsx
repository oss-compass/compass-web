import React, { useMemo, useState } from 'react';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  line,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import {
  pickKeyToXAxis,
  pickKeyToYAxis,
} from '@modules/analyze/options/metric';
import { Activity } from '@modules/analyze/Misc/SideBar/menus';

const Overview: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const [percentage, setPercentage] = useState(true);
  const echartsOpts = useMemo(() => {
    const series = yAxis.map(({ name, data }) => {
      return line({ name, data });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis, percentage]);

  return (
    <BaseCard
      id={Activity.Overview}
      title="Overview"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
      showPercentageBtn={true}
      getPercentage={(val) => setPercentage(val)}
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

const OverviewWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    return pickKeyToXAxis(data, {
      typeKey: 'metricActivity',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    return pickKeyToYAxis(data, {
      typeKey: 'metricActivity',
      valueKey: 'activityScore',
      legendName: 'Activity Score',
    });
  }, [data]);

  return <Overview loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default OverviewWithData;
