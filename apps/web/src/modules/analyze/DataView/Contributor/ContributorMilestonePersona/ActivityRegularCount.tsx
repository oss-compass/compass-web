import React from 'react';
import { ContributorMilestonePersona } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const ActivityRegularCount = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: t(
      'metrics_models:contributor_milestone_persona.metrics.activity_regular_contributor_count'
    ),
    xKey: 'grimoireCreationDate',
    yKey: 'metricMilestonePersona.activityRegularContributorCount',
    summaryKey: '',
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
        'metrics_models:contributor_milestone_persona.metrics.activity_regular_contributor_count'
      )}
      id={ContributorMilestonePersona.ActivityRegularCount}
      description={t(
        'metrics_models:contributor_milestone_persona.metrics.activity_regular_contributor_count_desc'
      )}
      weight={t(
        'metrics_models:contributor_milestone_persona.metrics.activity_regular_contributor_count_more.weight'
      )}
      threshold={t(
        'metrics_models:contributor_milestone_persona.metrics.activity_regular_contributor_count_more.threshold'
      )}
      detail={t(
        'metrics_models:contributor_milestone_persona.metrics.activity_regular_contributor_count_more.detail'
      )}
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

export default ActivityRegularCount;
