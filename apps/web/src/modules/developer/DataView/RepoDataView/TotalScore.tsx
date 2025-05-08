import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@modules/developer/components/DeveloperCard';
import { CollaborationDevelopment } from '@modules/developer/components/SideBar/config';
import { GenChartOptions, TransOpt } from '@modules/developer/type';
import EChartX from '@common/components/EChartX';
import ChartWithData from '@modules/developer/components/ChartWithData';
import useGetLineOption from '@modules/developer/hooks/useGetLineOption';
import CardDropDownMenu from '@modules/developer/components/CardDropDownMenu';
import ImageFallback from '@common/components/ImageFallback';

const TotalScore = () => {
  const { t } = useTranslation();

  const tansOpts: TransOpt = {
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.codeQualityGuarantee',
    legendName: t('metrics_models:collaboration_development_index.title'),
    summaryKey: 'summaryCodequality.codeQualityGuarantee',
  };
  const {
    getOptions,
    onePointSys,
    setOnePointSys,
    showAvg,
    setShowAvg,
    showMedian,
    setShowMedian,
    yAxisScale,
    setYAxisScale,
  } = useGetLineOption({
    enableDataFormat: true,
  });

  return (
    <BaseCard
      className="h-[550px]"
      title={'仓库贡献关系'}
      id={CollaborationDevelopment.Overview}
      description={''}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/'
      }
      headRight={(ref, fullScreen, setFullScreen) => (
        <>
          <CardDropDownMenu
            // downloadImageSize={'full'}
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
            onePointSys={onePointSys}
            yKey={tansOpts['yKey']}
          />
        </>
      )}
    >
      {(ref) => {
        return (
          <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
            {({ loading, option }) => {
              return (
                // <EChartX containerRef={ref} loading={loading} option={option} />
                <ImageFallback
                  src={'/images/test/test1.png'}
                  width={1530}
                  height={450}
                  fallbackSrc={'/images/default.png'}
                  alt="logo"
                />
              );
            }}
          </ChartWithData>
        );
      }}
    </BaseCard>
  );
};

export default TotalScore;
