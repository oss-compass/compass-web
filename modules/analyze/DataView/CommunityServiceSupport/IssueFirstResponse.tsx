import React, { useEffect, useMemo, useRef } from 'react';
import { LineSeriesOption } from 'echarts';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { Support } from '@modules/analyze/Misc/SideBar/menus';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import LazyLoadCard from '@modules/analyze/components/LazyLoadCard';
import Chart from '@modules/analyze/components/Chart';

const tansOpts: TransOpts = {
  metricType: 'metricCommunity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    { legendName: 'avg', valueKey: 'issueFirstReponseAvg' },
    { legendName: 'mid', valueKey: 'issueFirstReponseMid' },
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

const IssueFirstResponse = () => {
  return (
    <LazyLoadCard
      title="Issue first response "
      id={Support.IssueFirstResponse}
      description={
        'Average/Median first comments response (in days) for new Issues created in the last 90 days.'
      }
    >
      <Chart getOptions={getOptions} tansOpts={tansOpts} />
    </LazyLoadCard>
  );
};

export default IssueFirstResponse;
