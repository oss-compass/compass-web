import React, { useMemo } from 'react';
import { Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';

import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const CommentFrequency = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: t(
      'metrics_models:community_service_and_support.metrics.comment_frequency'
    ),
    xKey: 'grimoireCreationDate',
    yKey: 'metricCommunity.commentFrequency',
    summaryKey: 'summaryCommunity.commentFrequency',
  };
  const { getOptions, showAvg, showMedian, setShowMedian, setShowAvg } =
    useGetLineOption();

  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.comment_frequency'
      )}
      id={Support.CommentFrequency}
      description={t(
        'metrics_models:community_service_and_support.metrics.comment_frequency_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#comment-frequency'
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

export default CommentFrequency;
