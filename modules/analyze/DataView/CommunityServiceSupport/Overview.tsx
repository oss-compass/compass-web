import React, { useMemo, useState } from 'react';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  line,
  toTimeXAxis,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import get from 'lodash/get';
import isArray from 'lodash/isArray';
import { Support } from '@modules/analyze/Misc/SideBar/menus';
import { repoUrlFormat } from '@common/utils/url';
import {
  pickKeyToXAxis,
  pickKeyToYAxis,
} from '@modules/analyze/options/metric';
import { transMarkingSystem } from '@modules/analyze/DataTransform/transMarkingSystem';

const Overview: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const [percentage, setPercentage] = useState(true);
  const echartsOpts = useMemo(() => {
    const series = yAxis.map(({ name, data }) => {
      percentage && (data = data.map((i) => transMarkingSystem(Number(i))));
      return line({ name, data });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis, percentage]);

  return (
    <BaseCard
      title="Overview"
      id={Support.Overview}
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
      typeKey: 'metricCommunity',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    return pickKeyToYAxis(data, {
      typeKey: 'metricCommunity',
      valueKey: 'communitySupportScore',
      legendName: 'Community Support',
    });
  }, [data]);

  return <Overview loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default OverviewWithData;
