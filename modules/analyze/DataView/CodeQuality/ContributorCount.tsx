import React from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import LazyLoadCard from '@modules/analyze/components/LazyLoadCard';
import Chart from '@modules/analyze/components/Chart';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'total', valueKey: 'contributorCount' },
    {
      legendName: 'code reviewer',
      valueKey: 'activeC1PrCommentsContributorCount',
    },
    {
      legendName: 'pr creator',
      valueKey: 'activeC1PrCreateContributorCount',
    },
    { legendName: 'commit author', valueKey: 'activeC2ContributorCount' },
  ],
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

const ContributorCount = () => {
  return (
    <LazyLoadCard
      title="Contributors"
      id={CodeQuality.ContributorCount}
      description={
        'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.'
      }
    >
      <Chart getOptions={getOptions} tansOpts={tansOpts} />
    </LazyLoadCard>
  );
};

export default ContributorCount;
