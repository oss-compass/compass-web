import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
  legendFormat,
  getTooltipsFormatter,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';

import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';

import { LineSeriesOption } from 'echarts';
import transHundredMarkSystem from '@modules/analyze/DataTransform/transHundredMarkSystem';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';

const TotalScore = () => {
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

  const getOptions: GetChartOptions = (
    { xAxis, compareLabels, yResults },
    theme
  ) => {
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
    return getLineOption({
      xAxisData: xAxis,
      series,
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({ compareLabels }),
      },
    });
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

export default TotalScore;
