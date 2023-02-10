import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const ContributorCount = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: t(
      'metrics_models:community_activity.metrics.contributor_count'
    ),
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.contributorCount',
    summaryKey: 'summaryActivity.contributorCount',
  };
  const { getOptions, showAvg, showMedian, setShowMedian, setShowAvg } =
    useGetLineOption();

  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.contributor_count')}
      id={Activity.ContributorCount}
      description={t(
        'metrics_models:community_activity.metrics.contributor_count_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#contributor-count'}
      headRight={
        <>
          <MedianAndAvg
            showAvg={showAvg}
            onAvgChange={(b) => setShowAvg(b)}
            showMedian={showMedian}
            onMedianChange={(b) => setShowMedian(b)}
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

export default ContributorCount;
