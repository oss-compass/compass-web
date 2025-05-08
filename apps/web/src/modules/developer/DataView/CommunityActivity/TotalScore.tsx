import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/developer/components/SideBar/config';
import BaseCard from '@modules/developer/components/DeveloperCard';
import ChartWithData from '@modules/developer/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import ScoreConversion from '@modules/developer/components/ScoreConversion';
import { TransOpt, GenChartOptions } from '@modules/developer/type';
import useGetLineOption from '@modules/developer/hooks/useGetLineOption';

import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import ImageFallback from '@common/components/ImageFallback';

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
  });

  return (
    <BaseCard
      className="h-[550px]"
      title={'开发者协作关系总览'}
      id={Activity.Overview}
      description={''}
      docLink={'/docs/metrics-models/robustness/activity/'}
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
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
                <ImageFallback
                  src={'/images/test/test2.png'}
                  width={1530}
                  height={450}
                  fallbackSrc={'/images/default.png'}
                  alt="logo"
                />
                // <EChartX containerRef={ref} loading={loading} option={option} />
              );
            }}
          </ChartWithData>
        );
      }}
    </BaseCard>
  );
};

export default TotalScore;
