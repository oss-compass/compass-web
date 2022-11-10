import React from 'react';
import {
  genSeries,
  getLineOption,
  line,
  lineArea,
} from '@modules/analyze/options';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import Chart from '@modules/analyze/components/Chart';
import { ChartThemeState } from '@modules/analyze/context';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'total pr', valueKey: 'prCount' },
    { legendName: 'code review', valueKey: 'codeReviewedCount' },
    { legendName: 'code review ratio', valueKey: 'codeReviewRatio' },
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
      if (legendName === 'code review ratio') {
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

const CodeReviewRatio = () => {
  return (
    <BaseCard
      title="Code Review Ratio"
      id={CodeQuality.CodeReviewRatio}
      description={
        'Determine the percentage of code commits with at least one reviewer (not PR creator) in the last 90 days.'
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

export default CodeReviewRatio;
