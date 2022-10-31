import React, { useMemo, useState } from 'react';
import { genSeries, getLineOption, lineArea } from '@modules/analyze/options';
import { Activity } from '@modules/analyze/Misc/SideBar/menus';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';
import { LineSeriesOption } from 'echarts';
import { transMarkingSystem } from '@modules/analyze/DataTransform/transMarkingSystem';

const tansOpts: TransOpts = {
  metricType: 'metricActivity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'activity score', valueKey: 'activityScore' }],
};

let hundredMarkingSys = true;
const getOptions = ({ xAxis, yResults }: TransResult) => {
  const series = genSeries<LineSeriesOption>(
    yResults,
    ({ legendName, label, level, isCompare, color, data }) => {
      hundredMarkingSys &&
        (data = data.map((i) => transMarkingSystem(Number(i))));
      return lineArea({
        name: getLegendName(legendName, { label, level, isCompare }),
        data: data,
        color,
      });
    }
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
      id={Activity.Overview}
      description={
        'Community Activity is used to describe how active an open source community is.'
      }
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
