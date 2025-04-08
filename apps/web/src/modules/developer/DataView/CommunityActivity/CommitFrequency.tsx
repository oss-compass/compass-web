import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/developer/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/developer/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { GenChartOptions, TransOpt } from '@modules/developer/type';
import useGetLineOption from '@modules/developer/hooks/useGetLineOption';

import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';

const CommitFrequency = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: t('metrics_models:community_activity.metrics.commit_frequency'),
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.commitFrequency',
    summaryKey: 'summaryActivity.commitFrequency',
  };
  const {
    getOptions,
    setShowMedian,
    showMedian,
    showAvg,
    setShowAvg,
    yAxisScale,
    setYAxisScale,
  } = useGetLineOption();

  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.commit_frequency')}
      id={Activity.CommitFrequency}
      description={t(
        'metrics_models:community_activity.metrics.commit_frequency_desc'
      )}
      weight={t(
        'metrics_models:community_activity.metrics.commit_frequency_more.weight'
      )}
      threshold={t(
        'metrics_models:community_activity.metrics.commit_frequency_more.threshold'
      )}
      detail={t(
        'metrics_models:community_activity.metrics.commit_frequency_more.detail'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#commit-frequency'}
      headRight={(ref, fullScreen, setFullScreen) => (
        <CardDropDownMenu
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
          yKey={tansOpts['yKey']}
        />
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

export default CommitFrequency;
