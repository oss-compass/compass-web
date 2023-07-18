import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const TotalScore = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: t('metrics_models:community_activity.title'),
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.activityScore',
    summaryKey: 'summaryActivity.activityScore',
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
    defaultOnePointSystem: false,
  });

  return (
    <BaseCard
      title={t('metrics_models:community_activity.title')}
      id={Activity.Overview}
      description={t('metrics_models:community_activity.desc')}
      docLink={'/docs/metrics-models/robustness/activity/'}
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
            showAvg={showAvg}
            onAvgChange={(b) => setShowAvg(b)}
            showMedian={showMedian}
            onMedianChange={(b) => setShowMedian(b)}
            showYAxisScale={yAxisScale}
            onYAxisScaleChange={(b) => setYAxisScale(b)}
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
