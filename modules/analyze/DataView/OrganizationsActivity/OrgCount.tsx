import React, { useMemo } from 'react';
import { Organizations } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import { useTranslation } from 'next-i18next';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const OrgCount = () => {
  const { t } = useTranslation();
  const tansOpts: TransOpt = {
    legendName: 'org count',
    xKey: 'grimoireCreationDate',
    yKey: 'metricGroupActivity.orgCount',
    summaryKey: 'summaryGroupActivity.orgCount',
  };
  const { getOptions, showAvg, showMedian, setShowAvg, setShowMedian } =
    useGetLineOption();
  return (
    <BaseCard
      title={t('metrics_models:organization_activity.metrics.org_count')}
      id={Organizations.OrgCount}
      description={t(
        'metrics_models:organization_activity.metrics.org_count_desc'
      )}
      docLink={
        '/docs/metrics-models/niche-creation/developer-retention/#org-count'
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

export default OrgCount;
