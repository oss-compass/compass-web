import React from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const CommentFrequency = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: 'comment frequency',
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.commentFrequency',
    summaryKey: 'summaryActivity.commentFrequency',
  };
  const { showAvg, setShowAvg, showMedian, setShowMedian, getOptions } =
    useGetLineOption();

  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.comment_frequency')}
      id={Activity.CommentFrequency}
      description={t(
        'metrics_models:community_activity.metrics.comment_frequency_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#comment-frequency'}
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

export default CommentFrequency;
