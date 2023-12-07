import React from 'react';
import { ContributorMilestonePersona } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import { TransOpt } from '@modules/analyze/type';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const TotalScore = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: t('metrics_models:contributor_milestone_persona.title'),
    xKey: 'grimoireCreationDate',
    yKey: 'metricMilestonePersona.milestonePersonaScore',
    summaryKey: '',
  };
  const {
    getOptions,
    onePointSys,
    setOnePointSys,
    showAvg,
    setShowAvg,
    showMedian,
    setShowMedian,
    yAxisScale,
    setYAxisScale,
  } = useGetLineOption({
    enableDataFormat: true,
  });

  return (
    <BaseCard
      title={t('metrics_models:contributor_milestone_persona.title')}
      id={ContributorMilestonePersona.Overview}
      description={t('metrics_models:contributor_milestone_persona.desc')}
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <ScoreConversion
            onePoint={onePointSys}
            onChange={(v) => {
              setOnePointSys(v);
            }}
          />
          <CardDropDownMenu
            // downloadImageSize={'full'}
            cardRef={ref}
            fullScreen={fullScreen}
            onFullScreen={(b) => {
              setFullScreen(b);
            }}
            showAvg={showAvg}
            onAvgChange={(b) => setShowAvg(b)}
            showMedian={showMedian}
            onMedianChange={(b) => setShowMedian(b)}
            yAxisScale={yAxisScale}
            onYAxisScaleChange={(b) => setYAxisScale(b)}
            onePointSys={onePointSys}
            yKey={tansOpts['yKey']}
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
