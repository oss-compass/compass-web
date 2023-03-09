import React, { useMemo } from 'react';
import { Organizations } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const ContributionLast = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: 'contribution last',
    xKey: 'grimoireCreationDate',
    yKey: 'metricGroupActivity.contributionLast',
    summaryKey: 'summaryGroupActivity.contributionLast',
  };
  const { getOptions, showAvg, showMedian, setShowAvg, setShowMedian } =
    useGetLineOption();

  return (
    <BaseCard
      title={t(
        'metrics_models:organization_activity.metrics.contribution_last'
      )}
      id={Organizations.ContributionLast}
      description={t(
        'metrics_models:organization_activity.metrics.contribution_last_desc'
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
