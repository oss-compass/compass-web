import React, { useMemo, useState } from 'react';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';

import useGetRatioLineOption from '@modules/analyze/hooks/useGetRatioLineOption';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const CommitPRLinkedRatio = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');

  const tabOptions = [
    { label: t('analyze:commit_pr_linked_ratio'), value: '1' },
    { label: t('analyze:commit_pr'), value: '2' },
    { label: t('analyze:commit_pr_linked'), value: '3' },
  ];

  const chartTabs = {
    '1': {
      legendName: t('analyze:commit_pr_linked_ratio'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.gitPrLinkedRatio',
      summaryKey: 'summaryCodequality.gitPrLinkedRatio',
    },
    '2': {
      legendName: t('analyze:commit_pr'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.prCommitCount',
      summaryKey: 'summaryCodequality.prCommitCount',
    },
    '3': {
      legendName: t('analyze:commit_pr_linked'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.prCommitLinkedCount',
      summaryKey: 'summaryCodequality.prCommitLinkedCount',
    },
  };

  type TabValue = keyof typeof chartTabs;
  const tansOpts: TransOpt = chartTabs[tab];
  const { getOptions, setShowMedian, showMedian, showAvg, setShowAvg } =
    useGetRatioLineOption({ tab });

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio'
      )}
      id={CollaborationDevelopment.CommitPRLinkedRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#commit-pr-linked-ratio'
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
              {({ loading, option }) => {
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

export default CommitPRLinkedRatio;
