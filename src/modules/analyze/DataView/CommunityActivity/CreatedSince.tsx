import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const CreatedSince = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: t('metrics_models:community_activity.metrics.created_since'),
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.createdSince',
    summaryKey: 'summaryActivity.createdSince',
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
      title={t('metrics_models:community_activity.metrics.created_since')}
      id={Activity.CreatedSince}
      description={t(
        'metrics_models:community_activity.metrics.created_since_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#created-since'}
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

export default CreatedSince;
