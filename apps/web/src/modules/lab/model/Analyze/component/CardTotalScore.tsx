import React from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import CardHeadButtons from './CardHeadButtons';
import useLabDataMainScore from '../hooks/useLabDataMainScore';
import { useEChartBuilder, useDataBuilder } from '../hooks/useBuilderFns';
import { LabChartOption } from '../context/LabChartOption';
import {
  getChartBuilder,
  getDataFormatBuilder,
  getAlignValuesBuilder,
} from '../builder';
import { useLabModelDetail, useLabModelVersion } from '../../hooks';

const CardTotalScore = ({ className }: { className: string }) => {
  const { t } = useTranslation();
  const { data: detail } = useLabModelDetail();
  const { data: versionDetail } = useLabModelVersion();
  const modelDetail = detail.labModelDetail;

  const { data, loading } = useLabDataMainScore();
  const dataBuilderFn = useDataBuilder([
    getAlignValuesBuilder(),
    getDataFormatBuilder(),
  ]);
  const eChartBuilderFns = useEChartBuilder([getChartBuilder()]);

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
            originData={data}
            dataFormatFn={dataBuilderFn}
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

export default CardTotalScore;
