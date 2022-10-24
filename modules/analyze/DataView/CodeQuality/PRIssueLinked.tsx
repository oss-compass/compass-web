import React, { useEffect, useMemo, useRef } from 'react';
import EChartX from '@common/components/EChartX';
import {
  ChartComponentProps,
  getLineOption,
  lineArea,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import {
  pickKeyGroupToYAxis,
  pickKeyToXAxis,
  pickKeyToYAxis,
} from '@modules/analyze/options/metric';
import { colorGenerator } from '@modules/analyze/options/color';

const PRIssueLinked: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const echartsOpts = useMemo(() => {
    const gen = colorGenerator();
    const series = yAxis.map(({ label, name, data }) => {
      const color = gen(label);
      return lineArea({ name, data, color });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis]);

  return (
    <BaseCard
      title="PR issue linked ratio"
      id={CodeQuality.PRIssueLinkedRatio}
      description={`Percentage of new pr link issues in the last 90 days.`}
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

const PRIssueLinkedWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const xAxis = useMemo(() => {
    return pickKeyToXAxis(data, {
      typeKey: 'metricCodequality',
      valueKey: 'grimoireCreationDate',
    });
  }, [data]);

  const yAxis = useMemo(() => {
    return pickKeyGroupToYAxis(data, [
      {
        typeKey: 'metricCodequality',
        valueKey: 'prCount',
        legendName: 'Total PR',
      },
      {
        typeKey: 'metricCodequality',
        valueKey: 'prIssueLinkedCount',
        legendName: 'Linked Issue',
      },
    ]);
  }, [data]);

  return <PRIssueLinked loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default PRIssueLinkedWithData;
