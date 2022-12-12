import React, { useMemo, useState } from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
} from '@modules/analyze/options';
import { Activity } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';

import Chart from '@modules/analyze/components/Chart';

import { LineSeriesOption } from 'echarts';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import { useTranslation } from 'next-i18next';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';

const CommunityActivityOverview = () => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);

  const tansOpts: TransOpts = {
    metricType: 'metricActivity',
    xAxisKey: 'grimoireCreationDate',
    yAxisOpts: [
      { legendName: 'community activity', valueKey: 'activityScore' },
    ],
  };

  const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
    const series = genSeries<LineSeriesOption>({
      theme,
      comparesYAxis: yResults,
      seriesEachFunc: (
        { legendName, label, compareLabels, level, isCompare, color, data },
        len
      ) => {
        !onePointSys && (data = data.map((i) => transHundredMarkSystem(i)));
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
    });
    return getLineOption({ xAxisData: xAxis, series });
  };

  return (
    <BaseCard
      title={t('metrics_models:community_activity.title')}
      id={Activity.Overview}
      description={t('metrics_models:community_activity.desc')}
      docLink={'/docs/metrics-models/robustness/activity/'}
      headRight={
        <ScoreConversion
          onePoint={onePointSys}
          onChange={(v) => {
            setOnePointSys(v);
          }}
        />
      }
    >
      {(ref) => {
        return (
          <Chart
            containerRef={ref}
            getOptions={getOptions}
            tansOpts={tansOpts}
          />
        );
      }}
    </BaseCard>
  );
};

export default CommunityActivityOverview;
