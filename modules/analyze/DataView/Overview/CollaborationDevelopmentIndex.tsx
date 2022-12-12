import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';

import Chart from '@modules/analyze/components/Chart';

import { LineSeriesOption } from 'echarts';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';

const CollaborationDevelopmentIndex = () => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);

  const tansOpts: TransOpts = {
    metricType: 'metricCodequality',
    xAxisKey: 'grimoireCreationDate',
    yAxisOpts: [
      {
        legendName: 'collaboration development index',
        valueKey: 'codeQualityGuarantee',
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
      title={t('metrics_models:collaboration_development_index.title')}
      id={CollaborationDevelopment.Overview}
      description={t('metrics_models:collaboration_development_index.desc')}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/'
      }
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

export default CollaborationDevelopmentIndex;
