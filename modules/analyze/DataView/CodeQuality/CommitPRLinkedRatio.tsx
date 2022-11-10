import React from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/config';
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
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'commit pr', valueKey: 'prCommitCount' },
    { legendName: 'commit pr linked', valueKey: 'prCommitLinkedCount' },
    { legendName: 'commit pr linked ratio', valueKey: 'gitPrLinkedRatio' },
  ],
};

const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }, len) => {
      const name = getLegendName(legendName, {
        label,
        level,
        isCompare,
        legendTypeCount: len,
      });
      if (legendName === 'commit pr linked ratio') {
        return line({ name, data, color, yAxisIndex: 1 });
      }
      return line({ name, data, color });
    },
    theme
  );
  return getLineOption({
    xAxisData: xAxis,
    series,
    yAxis: [{ type: 'value' }, { type: 'value' }],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      order: 'seriesDesc',
    },
  });
};
const CommitPRLinkedRatio = () => {
  return (
    <BaseCard
      title="Commit PR Linked Ratio"
      id={CodeQuality.CommitPRLinkedRatio}
      description={
        'Determine the percentage of new code commit link pull request in the last 90 days.'
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

export default CommitPRLinkedRatio;
