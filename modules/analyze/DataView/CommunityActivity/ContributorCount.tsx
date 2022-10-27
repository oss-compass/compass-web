import React, { useMemo } from 'react';
import { genSeries, getLineOption, lineArea } from '@modules/analyze/options';
import { Activity } from '@modules/analyze/Misc/SideBar/menus';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import LazyLoadCard from '@modules/analyze/components/LazyLoadCard';
import Chart from '@modules/analyze/components/Chart';
import { LineSeriesOption } from 'echarts';

const tansOpts: TransOpts = {
  metricType: 'metricActivity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'contributor count', valueKey: 'contributorCount' },
  ],
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

const ContributorCount = () => {
  return (
    <LazyLoadCard
      title="Contributor count"
      id={Activity.ContributorCount}
      description={
        'The growth in the aggregated count of unique contributors analyzed during the selected time period.'
      }
    >
      <Chart getOptions={getOptions} tansOpts={tansOpts} />
    </LazyLoadCard>
  );
};

export default ContributorCount;
