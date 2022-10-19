import React, { useEffect, useMemo, useRef } from 'react';
import EChartX from '@common/components/EChartX';
import {
  bar,
  ChartComponentProps,
  getBarOption,
  getLineOption,
  lineArea,
  toTimeXAxis,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import {
  pickKeyGroupToYAxis,
  pickKeyToXAxis,
} from '@modules/analyze/options/metric';
import useDatePickerFormat from '@modules/analyze/hooks/useDatePickerFormat';
import { toFixed } from '@common/utils';
import { colorGenerator } from '@modules/analyze/options/color';

const LocFrequency: React.FC<ChartComponentProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const dateDesc = useDatePickerFormat();
  const echartsOpts = useMemo(() => {
    const gen = colorGenerator();
    const series = yAxis.map(({ name, label, data }) => {
      const color = gen(label);
      return bar({ name, data, stack: label, color });
    });
    return getBarOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis]);

  return (
    <BaseCard
      loading={loading}
      title="Lines of code changed"
      id={CodeQuality.LocFrequency}
      description={`Determine the average number of lines touched (lines added plus lines removed) per week in the past ${dateDesc}.`}
    >
      {(containerRef) => (
        <EChartX option={echartsOpts} containerRef={containerRef} />
      )}
    </BaseCard>
  );
};

const LocFrequencyWithData = () => {
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
        valueKey: 'linesAddedFrequency',
        legendName: 'Lines add',
      },
      {
        typeKey: 'metricCodequality',
        valueKey: 'linesRemovedFrequency',
        valueFormat: (v) => toFixed(v * -1, 3),
        legendName: 'Lines remove',
      },
    ]);
  }, [data]);

  return <LocFrequency loading={isLoading} xAxis={xAxis} yAxis={yAxis} />;
};

export default LocFrequencyWithData;
