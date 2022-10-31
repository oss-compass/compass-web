import React from 'react';
import { genSeries, getBarOption, bar } from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
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

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'is maintained', valueKey: 'isMaintained' }],
};

const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  const series = genSeries<BarSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }) => {
      return bar({
        name: getLegendName(legendName, { label, level, isCompare }),
        data: data,
        color,
      });
    },
    theme
  );
  return getBarOption({ xAxisData: xAxis, series });
};

const IsMaintained = () => {
  return (
    <BaseCard
      title="Is maintained"
      id={CodeQuality.IsMaintained}
      description={
        'Percentage of weeks with at least one code commit in the past 90 days.'
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

export default IsMaintained;
