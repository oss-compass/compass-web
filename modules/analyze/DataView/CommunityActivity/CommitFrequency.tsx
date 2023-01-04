import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const CommitFrequency = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: 'commit frequency',
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.commitFrequency',
    summaryKey: 'summaryActivity.commitFrequency',
  };
  const { getOptions, setShowMedian, showMedian, showAvg, setShowAvg } =
    useGetLineOption();

  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.commit_frequency')}
      id={Activity.CommitFrequency}
      description={t(
        'metrics_models:community_activity.metrics.commit_frequency_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#commit-frequency'}
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

export default CommitFrequency;
