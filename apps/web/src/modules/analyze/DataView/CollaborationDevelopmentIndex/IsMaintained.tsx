import React from 'react';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import CardDropDownMenu from '@modules/analyze/components/CardDropDownMenu';

const IsMaintained = () => {
  const { t } = useTranslation();

  const tansOpt = {
    legendName: 'is maintained',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.isMaintained',
    summaryKey: 'summaryCodequality.isMaintained',
  };
  const {
    getOptions,
    showAvg,
    showMedian,
    setShowAvg,
    setShowMedian,
    yAxisScale,
    setYAxisScale,
  } = useGetLineOption();
  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained'
      )}
      id={CollaborationDevelopment.IsMaintained}
      description={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained_desc'
      )}
      weight={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained_more.weight'
      )}
      threshold={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained_more.threshold'
      )}
      detail={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained_more.detail'
      )}
      notes={t(
        'metrics_models:collaboration_development_index.metrics.is_maintained_more.notes'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#is-maintained'
      }
      headRight={(ref, fullScreen, setFullScreen) => (
        <CardDropDownMenu
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
          cardRef={ref}
          yKey={tansOpt['yKey']}
        />
      )}
    >
      {(ref) => {
        return (
          <ChartWithData tansOpts={tansOpt} getOptions={getOptions}>
            {({ loading, option }) => {
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

export default IsMaintained;
