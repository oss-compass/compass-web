import React, { useMemo } from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { Support } from '@modules/analyze/Misc/SideBar/menus';
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
  metricType: 'metricCommunity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'code review count', valueKey: 'codeReviewCount' }],
};

const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }) => {
      return line({
        name: getLegendName(legendName, { label, level, isCompare }),
        data: data,
        color,
      });
    },
    theme
  );
  return getLineOption({ xAxisData: xAxis, series });
};

const CodeReviewCount = () => {
  return (
    <BaseCard
      title="Code review count"
      id={Support.CodeReviewCount}
      description={
        'Determine the average number of review comments per pull request created in the last 90 days.'
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

export default CodeReviewCount;
