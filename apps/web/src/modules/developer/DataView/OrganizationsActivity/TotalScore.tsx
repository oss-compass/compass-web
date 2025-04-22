import React, { useMemo, useState } from 'react';
import { Organizations } from '@modules/developer/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/developer/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import ScoreConversion from '@modules/developer/components/ScoreConversion';
import { TransOpt, GenChartOptions } from '@modules/developer/type';
import useGetLineOption from '@modules/developer/hooks/useGetLineOption';

import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';

const TotalScore = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: t('metrics_models:organizations_activity.title'),
    xKey: 'grimoireCreationDate',
    yKey: 'metricGroupActivity.organizationsActivity',
    summaryKey: 'summaryGroupActivity.organizationsActivity',
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
      title={'代码提交趋势'}
      id={Organizations.Overview}
      description={''}
      docLink={'/docs/metrics-models/niche-creation/organization-activity/'}
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
