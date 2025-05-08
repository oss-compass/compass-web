import React, { useMemo } from 'react';
import { Organizations } from '@modules/developer/components/SideBar/config';
import BaseCard from '@modules/developer/components/DeveloperCard';
import ChartWithData from '@modules/developer/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/developer/type';
import useGetLineOption from '@modules/developer/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';

const ContributorCount = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: t(
      'metrics_models:organization_activity.metrics.contributor_count'
    ),
    xKey: 'grimoireCreationDate',
    yKey: 'metricGroupActivity.contributorCount',
    summaryKey: 'summaryGroupActivity.contributorCount',
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
        'metrics_models:organization_activity.metrics.contributor_count'
      )}
      id={Organizations.ContributorCount}
      description={t(
        'metrics_models:organization_activity.metrics.contributor_count_desc'
      )}
      weight={t(
        'metrics_models:organization_activity.metrics.contributor_count_more.weight'
      )}
      threshold={t(
        'metrics_models:organization_activity.metrics.contributor_count_more.threshold'
      )}
      detail={t(
        'metrics_models:organization_activity.metrics.contributor_count_more.detail'
      )}
      docLink={
        '/docs/metrics-models/niche-creation/organization-activity/#contributor-count'
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

export default ContributorCount;
