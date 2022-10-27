import React from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { Activity, Support } from '@modules/analyze/Misc/SideBar/menus';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import LazyLoadCard from '@modules/analyze/components/LazyLoadCard';
import Chart from '@modules/analyze/components/Chart';

const tansOpts: TransOpts = {
  metricType: 'metricCommunity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'closed pr count', valueKey: 'closedPrsCount' }],
};

const getOptions = ({ xAxis, yResults }: TransResult) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }) => {
      return line({
        name: getLegendName(legendName, { label, level, isCompare }),
        data: data,
        color,
      });
    }
  );
  return getLineOption({ xAxisData: xAxis, series });
};

const ClosedPrsCount = () => {
  return (
    <LazyLoadCard
      title="Closed PR count"
      id={Support.ClosedPrsCount}
      description={
        'The growth in the aggregated count of unique contributors analyzed during the selected time period.'
      }
    >
      <Chart getOptions={getOptions} tansOpts={tansOpts} />
    </LazyLoadCard>
  );
};

export default ClosedPrsCount;
