import React, { useMemo, useState } from 'react';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';
import useGetRatioLineOption from '@modules/analyze/hooks/useGetRatioLineOption';

const chartTabs = {
  '1': {
    legendName: 'linked issue ratio',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prIssueLinkedRatio',
    summaryKey: 'summaryCodequality.prIssueLinkedRatio',
  },
  '2': {
    legendName: 'total pr',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prCount',
    summaryKey: 'summaryCodequality.prCount',
  },
  '3': {
    legendName: 'linked issue',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prIssueLinkedCount',
    summaryKey: 'summaryCodequality.prIssueLinkedCount',
  },
};

type TabValue = keyof typeof chartTabs;

const tabOptions = [
  { label: 'linked issue ratio', value: '1' },
  { label: 'total pr', value: '2' },
  { label: 'linked issue', value: '3' },
];

const PRIssueLinked = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts = chartTabs[tab];
  const { getOptions, setShowMedian, showMedian, showAvg, setShowAvg } =
    useGetRatioLineOption({ tab });

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio'
      )}
      id={CollaborationDevelopment.PRIssueLinkedRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#pr-issue-linked-ratio'
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
      bodyClass={'h-[400px]'}
    >
      {(ref) => {
        return (
          <>
            <div className="mb-4">
              <Tab
                options={tabOptions}
                value={tab}
                onChange={(v) => setTab(v as TabValue)}
              />
            </div>
            <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
              {(loading, option) => {
                return (
                  <EChartX
                    containerRef={ref}
                    loading={loading}
                    option={option}
                  />
                );
              }}
            </ChartWithData>
          </>
        );
      }}
    </BaseCard>
  );
};

export default PRIssueLinked;
