import React from 'react';
import { bar, genSeries, getBarOption } from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/config';

import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { BarSeriesOption, LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';
import { ChartThemeState } from '@modules/analyze/context';
import { toFixed } from '@common/utils';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    {
      legendName: 'lines add',
      valueKey: 'linesAddedFrequency',
    },
    {
      legendName: 'lines remove',
      valueKey: 'linesRemovedFrequency',
      valueFormat: (v) => toFixed(v * -1, 3),
    },
  ],
};

const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  const series = genSeries<BarSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }, len) => {
      return bar({
        name: getLegendName(legendName, {
          label,
          level,
          isCompare,
          legendTypeCount: len,
        }),
        stack: label,
        data: data,
        color,
      });
    },
    theme
  );
  return getBarOption({ xAxisData: xAxis, series });
};

const LocFrequency = () => {
  return (
    <BaseCard
      title="Lines of Code Frequency"
      id={CodeQuality.LocFrequency}
      description={
        'Determine the average number of lines touched (lines added plus lines removed) per week in the past 90 days.'
      }
    >
      {(ref) => {
        return (
          <LoadInView containerRef={ref}>
            <Chart getOptions={getOptions} tansOpts={tansOpts} />
          </LoadInView>
        );
      }}
    </BaseCard>
  );
};

export default LocFrequency;
