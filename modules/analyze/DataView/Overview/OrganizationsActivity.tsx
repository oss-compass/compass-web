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

import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
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
      yResults,
    })(
      (
        { legendName, label, compareLabels, level, isCompare, color, data },
        len
      ) => {
        !onePointSys && (data = data.map((i) => transHundredMarkSystem(i)));
        return line({
          name: label,
          data: data,
          color,
        });
      }
    );
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
          <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
            {(loading, option) => {
              return (
                <EChartX containerRef={ref} loading={loading} option={option} />
              );
            }}
          </ChartWithData>
        );
      }}
    </BaseCard>
  );
};

export default OrganizationsActivity;
