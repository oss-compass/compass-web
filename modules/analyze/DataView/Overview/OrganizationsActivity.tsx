import React, { useMemo, useState } from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
} from '@modules/analyze/options';
import { Organizations } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import LoadInView from '@modules/analyze/components/LoadInView';
import Chart from '@modules/analyze/components/Chart';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';

import { useTranslation } from 'next-i18next';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';

const OrganizationsActivity = () => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);

  const tansOpts: TransOpts = {
    metricType: 'groupMetricActivity',
    xAxisKey: 'grimoireCreationDate',
    yAxisOpts: [
      {
        legendName: 'organizations activity',
        valueKey: 'organizationsActivity',
      },
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
      title={t('metrics_models:organization_activity.title')}
      id={Organizations.Overview}
      description={t('metrics_models:organization_activity.desc')}
      docLink={'/docs/metrics-models/niche-creation/developer-retention/'}
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
          <LoadInView containerRef={ref}>
            <Chart getOptions={getOptions} tansOpts={tansOpts} />
          </LoadInView>
        );
      }}
    </BaseCard>
  );
};

export default OrganizationsActivity;
