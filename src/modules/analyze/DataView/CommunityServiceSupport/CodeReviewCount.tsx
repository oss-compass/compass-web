import React, { useMemo } from 'react';
import { Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const CodeReviewCount = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: 'code review count',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCommunity.codeReviewCount',
    summaryKey: 'summaryCommunity.codeReviewCount',
  };
  const { getOptions, showAvg, showMedian, setShowMedian, setShowAvg } =
    useGetLineOption();

  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.code_review_count'
      )}
      id={Support.CodeReviewCount}
      description={t(
        'metrics_models:community_service_and_support.metrics.code_review_count_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#code-review-count'
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

export default CodeReviewCount;
