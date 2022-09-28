import React, { useEffect, useMemo, useRef } from 'react';
import EChartX from '@common/components/EChartX';
import { ChartComponentProps, getLineOption, lineArea } from '../options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import {
  pickKeyGroupToYAxis,
  pickKeyToXAxis,
  pickKeyToYAxis,
} from '@modules/analyze/options/metric';
import useDatePickerFormat from '@modules/analyze/hooks/useDatePickerFormat';

const PRIssueLinked: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const dateDesc = useDatePickerFormat();
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
      id={CodeQuality.PRIssueLinked}
      description={`Percentage of new pr link issues in the last ${dateDesc}.`}
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
