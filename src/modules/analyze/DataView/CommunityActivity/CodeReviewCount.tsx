import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import { useTranslation } from 'next-i18next';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const CodeReviewCount = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: 'code review count',
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.codeReviewCount',
    summaryKey: 'summaryActivity.codeReviewCount',
  };
  const { showAvg, setShowAvg, showMedian, setShowMedian, getOptions } =
    useGetLineOption();

  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.code_review_count')}
      id={Activity.CodeReviewCount}
      description={t(
        'metrics_models:community_activity.metrics.code_review_count_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#code-review-count'}
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

export default CodeReviewCount;
