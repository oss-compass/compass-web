import React, { useMemo, useState } from 'react';
import { Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import ScoreConversion from '@modules/analyze/components/ScoreConversion';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const TotalScore = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: t('metrics_models:community_service_and_support.title'),
    xKey: 'grimoireCreationDate',
    yKey: 'metricCommunity.communitySupportScore',
    summaryKey: 'summaryCommunity.communitySupportScore',
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
      title={t('metrics_models:community_service_and_support.title')}
      id={Support.Overview}
      description={t('metrics_models:community_service_and_support.desc')}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/'
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
