import React, { useMemo } from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { Support } from '@modules/analyze/Misc/SideBar/menus';
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
  yAxisOpts: [
    { legendName: 'avg', valueKey: 'issueOpenTimeAvg' },
    { legendName: 'mid', valueKey: 'issueOpenTimeMid' },
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

const IssueOpenTime = () => {
  return (
    <LazyLoadCard
      title="Bug issue open time"
      id={Support.BugIssueOpenTime}
      description={
        'The growth in the aggregated count of unique contributors analyzed during the selected time period.'
      }
    >
      <Chart getOptions={getOptions} tansOpts={tansOpts} />
    </LazyLoadCard>
  );
};

export default IssueOpenTime;
