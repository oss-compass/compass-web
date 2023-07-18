import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const RecentReleasesCount = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: t(
      'metrics_models:community_activity.metrics.recent_releases_count'
    ),
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.recentReleasesCount',
    summaryKey: 'summaryActivity.recentReleasesCount',
  };
  const {
    getOptions,
    showAvg,
    showMedian,
    setShowMedian,
    setShowAvg,
    yAxisScale,
    setYAxisScale,
  } = useGetLineOption();
  return (
    <BaseCard
      title={t(
        'metrics_models:community_activity.metrics.recent_releases_count'
      )}
      id={Activity.RecentReleasesCount}
      description={t(
        'metrics_models:community_activity.metrics.recent_releases_count_desc'
      )}
      weight={t(
        'metrics_models:community_activity.metrics.recent_releases_count_more.weight'
      )}
      threshold={t(
        'metrics_models:community_activity.metrics.recent_releases_count_more.threshold'
      )}
      detail={t(
        'metrics_models:community_activity.metrics.recent_releases_count_more.detail'
      )}
      docLink={
        '/docs/metrics-models/robustness/activity/#recent-releases-count'
      }
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
          showYAxisScale={yAxisScale}
          onYAxisScaleChange={(b) => setYAxisScale(b)}
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

export default RecentReleasesCount;
