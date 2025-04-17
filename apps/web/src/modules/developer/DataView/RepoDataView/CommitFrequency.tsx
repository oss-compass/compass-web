import React, { useState } from 'react';
import { CollaborationDevelopment } from '@modules/developer/components/SideBar/config';
import { GenChartOptions, TransOpt } from '@modules/developer/type';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import useGetLineOption from '@modules/developer/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import {
  ChartDataProvider,
  ChartOptionProvider,
  useCardManual,
  useOptionBuilderFns,
  getRatioLineBuilder,
  getCompareStyleBuilder,
  getLineBuilder,
} from '@modules/developer/options';

const CommitFrequency = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    legendName: t(
      'metrics_models:collaboration_development_index.metrics.commit_frequency'
    ),
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.commitFrequency',
    summaryKey: 'summaryCodequality.commitFrequency',
  };

  const {
    showMedian,
    setShowMedian,
    showAvg,
    setShowAvg,
    yAxisScale,
    setYAxisScale,
  } = useCardManual();

  const geOptionFn = useOptionBuilderFns([
    getLineBuilder({
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
      title={t(
        'metrics_models:collaboration_development_index.metrics.commit_frequency'
      )}
      id={CollaborationDevelopment.CommitFrequency}
      description={t(
        'metrics_models:collaboration_development_index.metrics.commit_frequency_desc'
      )}
      weight={t(
        'metrics_models:collaboration_development_index.metrics.commit_frequency_more.weight'
      )}
      threshold={t(
        'metrics_models:collaboration_development_index.metrics.commit_frequency_more.threshold'
      )}
      detail={t(
        'metrics_models:collaboration_development_index.metrics.commit_frequency_more.detail'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#commit-frequency'
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
    >
      {(ref) => {
        return (
          <ChartDataProvider tansOpts={tansOpts}>
            {({ loading, result }) => {
              return (
                <ChartOptionProvider
                  data={result}
                  optionFn={geOptionFn}
                  render={({ option }) => {
                    return (
                      <EChartX
                        loading={loading}
                        option={option}
                        containerRef={ref}
                      />
                    );
                  }}
                />
              );
            }}
          </ChartDataProvider>
        );
      }}
    </BaseCard>
  );
};

export default CommitFrequency;
