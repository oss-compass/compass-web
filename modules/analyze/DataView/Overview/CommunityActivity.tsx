import React, { useMemo, useState } from 'react';
import { genSeries, getLineOption, line } from '@modules/analyze/options';
import { Activity } from '@modules/analyze/components/SideBar/config';
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
import { transMarkingSystem } from '@modules/analyze/DataTransform/transMarkingSystem';
import { useTranslation } from 'next-i18next';

const tansOpts: TransOpts = {
  metricType: 'metricActivity',
  xAxisKey: 'grimoireCreationDate',
  yAxisOpts: [{ legendName: 'community activity', valueKey: 'activityScore' }],
};

let hundredMarkingSys = true;
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
      hundredMarkingSys && (data = data.map((i) => transMarkingSystem(i)));
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

const CommunityActivityOverview = () => {
  const { t } = useTranslation();
  const [markingSys, setMarkingSys] = useState(true);
  const getMarkingSys = (val: boolean) => {
    hundredMarkingSys = val;
    setMarkingSys(val);
  };
  return (
    <BaseCard
      title={t('metrics_models:community_activity.title')}
      id={Activity.Overview}
      description={t('metrics_models:community_activity.desc')}
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

export default CommunityActivityOverview;
