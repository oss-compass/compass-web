import React from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';
import { ChartThemeState } from '@modules/analyze/context';

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

const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      return line({
        name: getLegendName(legendName, {
          label,
          compareLabels,
          level,
          isCompare,
          legendTypeCount: len,
        }),
        data: data,
        color,
      });
    },
    theme
  );
  return getLineOption({ xAxisData: xAxis, series });
};

const ContributorCount = () => {
  return (
    <BaseCard
      title="Contributor Count"
      id={CodeQuality.ContributorCount}
      description={
        'Determine how many active pr creators, code reviewers, commit authors there are in the past 90 days.'
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

export default ContributorCount;
