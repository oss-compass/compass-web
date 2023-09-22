import React, { useMemo, useState } from 'react';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';

import useGetRatioLineOption from '@modules/analyze/hooks/useGetRatioLineOption';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const PRIssueLinked = () => {
  const { t } = useTranslation();
  const chartTabs = {
    '1': {
      legendName: t('analyze:linked_issue_ratio'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.prIssueLinkedRatio',
      summaryKey: 'summaryCodequality.prIssueLinkedRatio',
    },
    '2': {
      legendName: t('analyze:total_pr'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.prCount',
      summaryKey: 'summaryCodequality.prCount',
    },
    '3': {
      legendName: t('analyze:linked_issue'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.prIssueLinkedCount',
      summaryKey: 'summaryCodequality.prIssueLinkedCount',
    },
  };

  type TabValue = keyof typeof chartTabs;

  const tabOptions = [
    { label: t('analyze:linked_issue_ratio'), value: '1' },
    { label: t('analyze:total_pr'), value: '2' },
    { label: t('analyze:linked_issue'), value: '3' },
  ];

  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts = chartTabs[tab];
  const {
    getOptions,
    setShowMedian,
    showMedian,
    showAvg,
    setShowAvg,
    yAxisScale,
    setYAxisScale,
  } = useGetRatioLineOption({ tab });

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio'
      )}
      id={CollaborationDevelopment.PRIssueLinkedRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio_desc'
      )}
      weight={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio_more.weight'
      )}
      threshold={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio_more.threshold'
      )}
      detail={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio_more.detail'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#pr-issue-linked-ratio'
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

export default PRIssueLinked;
