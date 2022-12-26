import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  getLineOption,
  line,
  legendFormat,
  getTooltipsFormatter,
  getColorWithLabel,
  summaryLine,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import EChartX from '@common/components/EChartX';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import ChartWithDataV2 from '@modules/analyze/components/ChartWithDataV2';

const TotalScore = () => {
  const { t } = useTranslation();
  const [onePointSys, setOnePointSys] = useState(false);

  const tansOpts: TransOpt = {
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.codeQualityGuarantee',
    legendName: 'collaboration development index',
    summaryKey: 'summaryCodequality.codeQualityGuarantee',
  };

  const getOptions: GenChartOptions = (
    { compareLabels, xAxis, yResults, summaryMedian, summaryMean },
    theme
  ) => {
    const series = yResults.map(({ legendName, label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: data,
        color,
        formatDataToHundred: !onePointSys,
      });
    });

    series.push(
      summaryLine({
        id: 'median',
        name: 'Median',
        data: summaryMedian,
        color: '#5B8FF9',
        formatDataToHundred: !onePointSys,
      })
    );
    series.push(
      summaryLine({
        id: 'average',
        name: 'Average',
        data: summaryMean,
        color: '#F95B5B',
        formatDataToHundred: !onePointSys,
      })
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
          <ChartWithDataV2 tansOpts={tansOpts} getOptions={getOptions}>
            {(loading, option) => {
              return (
                <EChartX containerRef={ref} loading={loading} option={option} />
              );
            }}
          </ChartWithDataV2>
        );
      }}
    </BaseCard>
  );
};

export default TotalScore;
