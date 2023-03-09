import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import Tab from '@common/components/Tab';
import EChartX from '@common/components/EChartX';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';

import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const ContributorCount = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');

  const chartTabs = {
    '1': {
      legendName: t('analyze:total'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.contributorCount',
      summaryKey: 'summaryCodequality.contributorCount',
    },
    '2': {
      legendName: t('analyze:code_reviewer'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.activeC1PrCommentsContributorCount',
      summaryKey: 'summaryCodequality.activeC1PrCommentsContributorCount',
    },
    '3': {
      legendName: t('analyze:pr_creator'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.activeC1PrCreateContributorCount',
      summaryKey: 'summaryCodequality.activeC1PrCreateContributorCount',
    },
    '4': {
      legendName: t('analyze:commit_author'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.activeC2ContributorCount',
      summaryKey: 'summaryCodequality.activeC2ContributorCount',
    },
  };

  const tansOpts: TransOpt = chartTabs[tab];
  type TabValue = keyof typeof chartTabs;

  const tabOptions = [
    { label: t('analyze:total'), value: '1' },
    { label: t('analyze:code_reviewer'), value: '2' },
    { label: t('analyze:pr_creator'), value: '3' },
    { label: t('analyze:commit_author'), value: '4' },
  ];
  const { getOptions, setShowMedian, showMedian, showAvg, setShowAvg } =
    useGetLineOption();

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.contributor_count'
      )}
      id={CollaborationDevelopment.ContributorCount}
      description={t(
        'metrics_models:collaboration_development_index.metrics.contributor_count_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#code-contributor-count'
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
      {(ref, fullScreen) => {
        return (
          <div>
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
          </div>
        );
      }}
    </BaseCard>
  );
};

export default ContributorCount;
