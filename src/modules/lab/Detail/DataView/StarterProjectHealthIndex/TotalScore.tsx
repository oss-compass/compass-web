import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import EChartX from '@common/components/EChartX';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import ChartWithData from '@modules/lab/components/ChartWithData';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const TotalScore = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    xKey: 'grimoireCreationDate',
    yKey: 'metricStarterProjectHealth.starterProjectHealth',
    legendName: t('metrics_models:starter_project_health.title'),
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
      title={t('metrics_models:starter_project_health.title')}
      id={CollaborationDevelopment.Overview}
      description={t('metrics_models:starter_project_health.desc')}
      docLink={
        'https://chaoss.community/kb/metrics-model-starter-project-health/'
      }
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <ScoreConversion
            onePoint={onePointSys}
            onChange={(v) => {
              setOnePointSys(v);
            }}
          />
          <CardDropDownMenu
            downloadImageSize={'full'}
            cardRef={ref}
            fullScreen={fullScreen}
            onFullScreen={(b) => {
              setFullScreen(b);
            }}
            enableReference={false}
            // showAvg={showAvg}
            // onAvgChange={(b) => setShowAvg(b)}
            // showMedian={showMedian}
            // onMedianChange={(b) => setShowMedian(b)}
          />
        </>
      )}
    >
      {(ref) => {
        return (
          <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
            {({ loading, option }) => {
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
