import React from 'react';
import { ContributorRolePersona } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const ActivityIndividualContribution = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: t(
      'metrics_models:contributor_role_persona.metrics.activity_individual_contribution_per_person'
    ),
    xKey: 'grimoireCreationDate',
    yKey: 'metricRolePersona.activityIndividualContributionPerPerson',
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
        'metrics_models:contributor_role_persona.metrics.activity_individual_contribution_per_person'
      )}
      id={ContributorRolePersona.ActivityIndividualContribution}
      description={t(
        'metrics_models:contributor_role_persona.metrics.activity_individual_contribution_per_person_desc'
      )}
      weight={t(
        'metrics_models:contributor_role_persona.metrics.activity_individual_contribution_per_person_more.weight'
      )}
      threshold={t(
        'metrics_models:contributor_role_persona.metrics.activity_individual_contribution_per_person_more.threshold'
      )}
      detail={t(
        'metrics_models:contributor_role_persona.metrics.activity_individual_contribution_per_person_more.detail'
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

export default ActivityIndividualContribution;
