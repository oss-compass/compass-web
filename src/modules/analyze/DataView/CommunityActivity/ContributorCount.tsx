import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

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
      weight={t(
        'metrics_models:community_activity.metrics.contributor_count_more.weight'
      )}
      threshold={t(
        'metrics_models:community_activity.metrics.contributor_count_more.threshold'
      )}
      detail={t(
        'metrics_models:community_activity.metrics.contributor_count_more.detail'
      )}
      notes={t(
        'metrics_models:community_activity.metrics.contributor_count_more.notes'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#contributor-count'}
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

export default ContributorCount;
