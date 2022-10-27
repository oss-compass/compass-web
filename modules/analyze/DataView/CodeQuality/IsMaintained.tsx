import React from 'react';
import { genSeries, getBarOption, bar } from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { BarSeriesOption, LineSeriesOption } from 'echarts';
import LazyLoadCard from '@modules/analyze/components/LazyLoadCard';
import Chart from '@modules/analyze/components/Chart';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'is maintained', valueKey: 'isMaintained' }],
};

const getOptions = ({ xAxis, yResults }: TransResult) => {
  const series = genSeries<BarSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }) => {
      return bar({
        name: getLegendName(legendName, { label, level, isCompare }),
        data: data,
        color,
      });
    }
  );
  return getBarOption({ xAxisData: xAxis, series });
};

const IsMaintained = () => {
  return (
    <LazyLoadCard
      title="Is maintained"
      id={CodeQuality.IsMaintained}
      description={
        'Percentage of weeks with at least one code commit in the past 90 days.'
      }
    >
      <Chart getOptions={getOptions} tansOpts={tansOpts} />
    </LazyLoadCard>
  );
};

export default IsMaintained;
