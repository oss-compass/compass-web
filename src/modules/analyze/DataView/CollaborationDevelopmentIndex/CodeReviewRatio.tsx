import React, { useMemo, useState } from 'react';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import ChartDataContainer from '@modules/analyze/components/Container/ChartDataContainer';
import ChartOptionContainer from '@modules/analyze/components/Container/ChartOptionContainer';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import { TabOption, TransOpt } from '@modules/analyze/type';
import useGetRatioLineOption from '@modules/analyze/hooks/useGetRatioLineOption';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const CodeReviewRatio = () => {
  const { t } = useTranslation();
  const tabOptions: TabOption[] = [
    { label: t('analyze:code_review_ratio'), value: '1' },
    { label: t('analyze:total_pr'), value: '2' },
    { label: t('analyze:code_review'), value: '3' },
  ];

  const chartTabs = {
    '1': {
      legendName: t('analyze:code_review_ratio'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.codeReviewRatio',
      summaryKey: 'summaryCodequality.codeReviewRatio',
    },
    '2': {
      legendName: t('analyze:total_pr'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.prCount',
      summaryKey: 'summaryCodequality.prCount',
    },
    '3': {
      legendName: t('analyze:code_review'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.codeReviewedCount',
      summaryKey: 'summaryCodequality.codeReviewedCount',
    },
  };

  type TabValue = keyof typeof chartTabs;

  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts: TransOpt = chartTabs[tab];
  const { getOptions, setShowMedian, showMedian, showAvg, setShowAvg } =
    useGetRatioLineOption({ tab });

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.code_review_ratio'
      )}
      id={CollaborationDevelopment.CodeReviewRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.code_review_ratio_desc'
      )}
      weight={t(
        'metrics_models:collaboration_development_index.metrics.code_review_ratio_more.weight'
      )}
      threshold={t(
        'metrics_models:collaboration_development_index.metrics.code_review_ratio_more.threshold'
      )}
      detail={t(
        'metrics_models:collaboration_development_index.metrics.code_review_ratio_more.detail'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#code-review-ratio'
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
            <ChartDataContainer tansOpts={tansOpts}>
              {({ loading, result }) => {
                return (
                  <ChartOptionContainer
                    data={result}
                    optionCallback={getOptions}
                  >
                    {({ option }) => {
                      return (
                        <EChartX
                          loading={loading}
                          option={option}
                          containerRef={ref}
                        />
                      );
                    }}
                  </ChartOptionContainer>
                );
              }}
            </ChartDataContainer>
          </>
        );
      }}
    </BaseCard>
  );
};

export default CodeReviewRatio;
