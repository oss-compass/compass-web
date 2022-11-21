import React, { useMemo } from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { Organizations } from '@modules/analyze/Misc/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';
import { ChartThemeState } from '@modules/analyze/context';
import { LineSeriesOption } from 'echarts';

const tansOpts: TransOpts = {
  metricType: 'groupMetricActivity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'contribution last', valueKey: 'contributionLast' },
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
      title="Contribution Last"
      id={Organizations.ContributionLast}
      description={
        'Total contribution time of all organizations to the community in the past 90 days (weeks).'
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
