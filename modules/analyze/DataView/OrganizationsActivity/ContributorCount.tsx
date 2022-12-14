import React, { useMemo } from 'react';
import { Organizations } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const ContributorCount = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: 'contributor count',
    xKey: 'grimoireCreationDate',
    yKey: 'metricGroupActivity.contributorCount',
    summaryKey: 'summaryGroupActivity.contributorCount',
  };
  const { getOptions, showAvg, showMedian, setShowAvg, setShowMedian } =
    useGetLineOption();
  return (
    <BaseCard
      title={t(
        'metrics_models:organization_activity.metrics.contributor_count'
      )}
      id={Organizations.ContributorCount}
      description={t(
        'metrics_models:organization_activity.metrics.contributor_count_desc'
      )}
      docLink={
        '/docs/metrics-models/niche-creation/developer-retention/#contributor-count'
      }
      headRight={
        <>
          <MedianAndAvg
            showAvg={showAvg}
            onAvgChange={(b) => setShowAvg(b)}
            showMedian={showMedian}
            onMedianChange={(b) => setShowMedian(b)}
          />
        </>
      }
    >
      {(ref) => {
        return (
          <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
            {(loading, option) => {
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
