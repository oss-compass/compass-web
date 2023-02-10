import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import EChartX from '@common/components/EChartX';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

const TotalScore = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.codeQualityGuarantee',
    legendName: t('metrics_models:collaboration_development_index.title'),
    summaryKey: 'summaryCodequality.codeQualityGuarantee',
  };
  const {
    getOptions,
    onePointSys,
    setOnePointSys,
    showAvg,
    setShowAvg,
    showMedian,
    setShowMedian,
  } = useGetLineOption({
    enableDataFormat: true,
    defaultOnePointSystem: false,
  });

  return (
    <BaseCard
      title={t('metrics_models:collaboration_development_index.title')}
      id={CollaborationDevelopment.Overview}
      description={t('metrics_models:collaboration_development_index.desc')}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/'
      }
      headRight={
        <>
          <MedianAndAvg
            showAvg={showAvg}
            onAvgChange={(b) => setShowAvg(b)}
            showMedian={showMedian}
            onMedianChange={(b) => setShowMedian(b)}
          />
          <ScoreConversion
            onePoint={onePointSys}
            onChange={(v) => {
              setOnePointSys(v);
            }}
          />
        </>
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
