import React, { useMemo, useState } from 'react';
import { CollaborationDevelopment } from '@modules/developer/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import EChartX from '@common/components/EChartX';
import { TransOpt } from '@modules/developer/type';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import {
  ChartDataProvider,
  ChartOptionProvider,
  useCardManual,
  useOptionBuilderFns,
  getRatioLineBuilder,
  getCompareStyleBuilder,
} from '@modules/developer/options';

const CodeMergeRatio = () => {
  const { t } = useTranslation();

  const tabOptions = [
    { label: '创建PR', value: '1' },
    { label: '合并PR', value: '2' },
  ];

  const chartTabs = {
    '1': {
      legendName: t('analyze:code_merge_ratio'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.codeMergeRatio',
      summaryKey: 'summaryCodequality.codeMergeRatio',
    },
    '2': {
      legendName: t('analyze:total_pr'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.prCount',
      summaryKey: 'summaryCodequality.prCount',
    },
    '3': {
      legendName: t('analyze:code_merge'),
      xKey: 'grimoireCreationDate',
      yKey: 'metricCodequality.codeMergedCount',
      summaryKey: 'summaryCodequality.codeMergedCount',
    },
  };

  type TabValue = keyof typeof chartTabs;
  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts: TransOpt = chartTabs[tab];

  const {
    showMedian,
    setShowMedian,
    showAvg,
    setShowAvg,
    yAxisScale,
    setYAxisScale,
  } = useCardManual();

  const geOptionFn = useOptionBuilderFns([
    getRatioLineBuilder({
      isRatio: tab === '1',
      yAxisScale,
      showMedian,
      showAvg,
      medianMame: t('analyze:median'),
      avgName: t('analyze:average'),
    }),
    getCompareStyleBuilder({}),
  ]);

  return (
    <BaseCard
      _tracing={'CodeMergeRatio'}
      title={'PR总览'}
      id={CollaborationDevelopment.CodeMergeRatio}
      description={'每月创建PR和合并PR的数量'}
      weight={t(
        'metrics_models:collaboration_development_index.metrics.code_merge_ratio_more.weight'
      )}
      threshold={t(
        'metrics_models:collaboration_development_index.metrics.code_merge_ratio_more.threshold'
      )}
      detail={t(
        'metrics_models:collaboration_development_index.metrics.code_merge_ratio_more.detail'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#code-merge-ratio'
      }
      headRight={(ref, fullScreen, setFullScreen) => (
        <CardDropDownMenu
          cardRef={ref}
          fullScreen={fullScreen}
          onFullScreen={(v) => {
            setFullScreen(v);
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
      bodyRender={(ref, fullScreen) => {
        return (
          <>
            <div className="mb-4">
              <Tab
                options={tabOptions}
                value={tab}
                onChange={(v) => setTab(v as TabValue)}
              />
            </div>
            <ChartDataProvider _tracing={'CodeMergeRatio'} tansOpts={tansOpts}>
              {({ loading, result }) => {
                return (
                  <ChartOptionProvider
                    _tracing={'CodeMergeRatio'}
                    data={result}
                    optionFn={geOptionFn}
                    render={({ option }) => (
                      <EChartX
                        _tracing={'CodeMergeRatio'}
                        loading={loading}
                        option={option}
                        containerRef={ref}
                      />
                    )}
                  />
                );
              }}
            </ChartDataProvider>
          </>
        );
      }}
    />
  );
};

export default CodeMergeRatio;
