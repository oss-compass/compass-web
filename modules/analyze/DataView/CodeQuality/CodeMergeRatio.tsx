import React from 'react';
import {
  ChartComponentProps,
  genSeries,
  getLineOption,
  lineArea,
  line,
} from '@modules/analyze/options';
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
    { legendName: 'total pr', valueKey: 'prCount' },
    { legendName: 'code merge', valueKey: 'codeMergedCount' },
    { legendName: 'code merge ratio', valueKey: 'codeMergeRatio' },
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
      if (legendName === 'code merge ratio') {
        return line({ name, data, color, yAxisIndex: 1 });
      }
      return line({ name, data, color, yAxisIndex: 0 });
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

const CodeMergeRatio = () => {
  return (
    <BaseCard
      title="Code Merge Ratio"
      id={CodeQuality.CodeMergeRatio}
      description={
        'Determine the percentage of PR Mergers and PR authors who are not the same person in the last 90 days of commits.'
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

export default CodeMergeRatio;
