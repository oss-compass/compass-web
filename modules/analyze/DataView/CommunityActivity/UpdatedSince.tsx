import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt } from '@modules/analyze/type';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const UpdatedSince = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: 'updated since',
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.updatedSince',
    summaryKey: 'summaryActivity.updatedSince',
  };
  const { getOptions, showAvg, showMedian, setShowMedian, setShowAvg } =
    useGetLineOption();

  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.updated_since')}
      id={Activity.UpdatedSince}
      description={t(
        'metrics_models:community_activity.metrics.updated_since_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#updated-since'}
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

export default UpdatedSince;
