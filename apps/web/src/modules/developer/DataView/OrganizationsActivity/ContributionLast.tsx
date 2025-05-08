import React, { useMemo } from 'react';
import { Organizations } from '@modules/developer/components/SideBar/config';
import BaseCard from '@modules/developer/components/DeveloperCard';
import ChartWithData from '@modules/developer/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/developer/type';
import useGetLineOption from '@modules/developer/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';

const ContributionLast = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: 'contribution last',
    xKey: 'grimoireCreationDate',
    yKey: 'metricGroupActivity.contributionLast',
    summaryKey: 'summaryGroupActivity.contributionLast',
  };
  const {
    getOptions,
    showAvg,
    showMedian,
    setShowAvg,
    setShowMedian,
    yAxisScale,
    setYAxisScale,
  } = useGetLineOption();

  return (
    <BaseCard
      title={t(
        'metrics_models:organization_activity.metrics.contribution_last'
      )}
      id={Organizations.ContributionLast}
      description={t(
        'metrics_models:organization_activity.metrics.contribution_last_desc'
      )}
      weight={t(
        'metrics_models:organization_activity.metrics.contribution_last_more.weight'
      )}
      threshold={t(
        'metrics_models:organization_activity.metrics.contribution_last_more.threshold'
      )}
      detail={t(
        'metrics_models:organization_activity.metrics.contribution_last_more.detail'
      )}
      docLink={
        '/docs/metrics-models/niche-creation/organization-activity/#contribution-last'
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

export default ContributionLast;
