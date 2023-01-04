import React, { useState } from 'react';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';

import { useTranslation } from 'next-i18next';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

const CommitFrequency = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: 'commit frequency',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.commitFrequency',
    summaryKey: 'summaryCodequality.commitFrequency',
  };
  const { getOptions, showAvg, setShowAvg, showMedian, setShowMedian } =
    useGetLineOption();

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.commit_frequency'
      )}
      id={CollaborationDevelopment.CommitFrequency}
      description={t(
        'metrics_models:collaboration_development_index.metrics.commit_frequency_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#commit-frequency'
      }
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
