import React, { useMemo, useState } from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import { CodeQuality } from '@modules/analyze/Misc/SideBar/menus';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';
import { ChartThemeState } from '@modules/analyze/context';
import { LineSeriesOption } from 'echarts';
import { transMarkingSystem } from '@modules/analyze/DataTransform/transMarkingSystem';

const tansOpts: TransOpts = {
  metricType: 'metricCodequality',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [
    {
      legendName: 'code quality',
      valueKey: 'codeQualityGuarantee',
    },
  ],
};

let hundredMarkingSys = true;
const getOptions = (
  { xAxis, yResults }: TransResult,
  theme?: ChartThemeState
) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }) => {
      hundredMarkingSys &&
        (data = data.map((i) => transMarkingSystem(Number(i))));
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

const Overview = () => {
  const [markingSys, setMarkingSys] = useState(true);
  const getMarkingSys = (val: boolean) => {
    hundredMarkingSys = val;
    setMarkingSys(val);
  };
  return (
    <BaseCard
      title="Overview"
      id={CodeQuality.Overview}
      showMarkingSysBtn={true}
      getMarkingSys={(val) => getMarkingSys(val)}
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

export default Overview;
