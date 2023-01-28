import React from 'react';
import { Activity, Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const ClosedPrsCount = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: 'closed pr count',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCommunity.closedPrsCount',
    summaryKey: 'summaryCommunity.closedPrsCount',
  };
  const { getOptions, showAvg, showMedian, setShowMedian, setShowAvg } =
    useGetLineOption();
  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.close_pr_count'
      )}
      id={Support.ClosedPrsCount}
      description={t(
        'metrics_models:community_service_and_support.metrics.close_pr_count_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#close-pr-count'
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

export default ClosedPrsCount;
