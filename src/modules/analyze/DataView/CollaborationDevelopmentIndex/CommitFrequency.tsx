import React, { useState } from 'react';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import BaseCard from '@common/components/BaseCard';
import ChartDataContainer from '@modules/analyze/components/Container/ChartDataContainer';
import ChartOptionContainer from '@modules/analyze/components/Container/ChartOptionContainer';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

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
    getOptions,
    showAvg,
    setShowAvg,
    showMedian,
    setShowMedian,
    yAxisScale,
    setYAxisScale,
  } = useGetLineOption();

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
          showYAxisScale={yAxisScale}
          onYAxisScaleChange={(b) => setYAxisScale(b)}
        />
      )}
    >
      {(ref) => {
        return (
          <ChartDataContainer tansOpts={tansOpts}>
            {({ loading, result }) => {
              return (
                <ChartOptionContainer data={result} optionCallback={getOptions}>
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
        );
      }}
    </BaseCard>
  );
};

export default CommitFrequency;
