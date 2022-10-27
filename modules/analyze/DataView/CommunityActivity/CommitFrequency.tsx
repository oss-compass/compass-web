import React, { useMemo } from 'react';
import { genSeries, getLineOption, lineArea } from '@modules/analyze/options';
import { Activity, CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import LazyLoadCard from '@modules/analyze/components/LazyLoadCard';
import Chart from '@modules/analyze/components/Chart';

const tansOpts: TransOpts = {
  metricType: 'metricActivity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'commit frequency', valueKey: 'commitFrequency' }],
};

const getOptions = ({ xAxis, yResults }: TransResult) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }) => {
      return lineArea({
        name: getLegendName(legendName, { label, level, isCompare }),
        data: data,
        color,
      });
    }
  );
  return getLineOption({ xAxisData: xAxis, series });
};

const CommitFrequency = () => {
  return (
    <LazyLoadCard
      title="Commit frequency"
      id={Activity.CommitFrequency}
      description={
        'The growth in the aggregated count of unique contributors analyzed during the selected time period.'
      }
    >
      <Chart getOptions={getOptions} tansOpts={tansOpts} />
    </LazyLoadCard>
  );
};

export default CommitFrequency;
