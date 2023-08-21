import React from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import CardHeadButtons from './CardHeadButtons';
import useLabDataMainScore from '../hooks/useLabDataMainScore';
import useEChartBuilderFns from '../hooks/useEChartBuilderFns';
import { LabChartOption } from '../context/LabChartOption';
import { getChartBuilder } from '../builder';
import { useLabModelDetail, useLabModelVersion } from '../../hooks';

const TotalScoreCard = ({ className }: { className: string }) => {
  const { t } = useTranslation();
  const { data: detail } = useLabModelDetail();
  const { data: versionDetail } = useLabModelVersion();
  const modelDetail = detail.labModelDetail;

  const { data, loading } = useLabDataMainScore();
  const eChartBuilderFns = useEChartBuilderFns([getChartBuilder()]);

  const id = `card_model_${detail.labModelDetail.id}`;
  return (
    <BaseCard
      className={className}
      id={id}
      title={modelDetail.name}
      description={versionDetail.labModelVersion.version}
      headRight={(ref, fullScreen, setFullScreen) => (
        <CardHeadButtons id={id} />
      )}
      // bodyClass={'h-[400px]'}
      bodyRender={(ref, fullScreen) => {
        return (
          <LabChartOption
            data={data}
            optionFn={eChartBuilderFns}
            render={({ option }) => {
              return (
                <EChartX loading={loading} option={option} containerRef={ref} />
              );
            }}
          />
        );
      }}
    />
  );
};

export default TotalScoreCard;
