import React, { useMemo, useState } from 'react';
import { Organizations } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const TotalScore = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: 'organizations activity',
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
  } = useGetLineOption({
    enableDataFormat: true,
    defaultOnePointSystem: false,
  });

  return (
    <BaseCard
      title={t('metrics_models:organization_activity.title')}
      id={Organizations.Overview}
      description={t('metrics_models:organization_activity.desc')}
      docLink={'/docs/metrics-models/niche-creation/developer-retention/'}
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
