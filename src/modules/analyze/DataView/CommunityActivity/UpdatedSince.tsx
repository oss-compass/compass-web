import React, { useMemo, useState } from 'react';
import { Activity } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt } from '@modules/analyze/type';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';
import { getYAxisWithUnit } from '@modules/analyze/options';

const UpdatedSince = () => {
  const { t, i18n } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: t('metrics_models:community_activity.metrics.updated_since'),
    xKey: 'grimoireCreationDate',
    yKey: 'metricActivity.updatedSince',
    summaryKey: 'summaryActivity.updatedSince',
  };

  const indicators = t('analyze:negative_indicators');
  const unit = t('analyze:unit_label', {
    unit: t('analyze:unit_day'),
  });

  const { getOptions, showAvg, showMedian, setShowMedian, setShowAvg } =
    useGetLineOption({
      echartsOpt: getYAxisWithUnit({
        indicators,
        unit,
        namePaddingLeft: i18n.language === 'zh' ? 0 : 35,
      }),
    });

  return (
    <BaseCard
      title={t('metrics_models:community_activity.metrics.updated_since')}
      id={Activity.UpdatedSince}
      description={t(
        'metrics_models:community_activity.metrics.updated_since_desc'
      )}
      docLink={'/docs/metrics-models/robustness/activity/#updated-since'}
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

export default UpdatedSince;
