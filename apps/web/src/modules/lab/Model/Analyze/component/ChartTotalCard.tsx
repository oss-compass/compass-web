import React from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import CardHeadButtons from './CardHeadButtons';
import { LabChartOption } from '../context/ChartOption';
import useLabDataMainScore from '../hooks/useLabDataMainScore';
import useEChartBuilderFns from '../hooks/useEChartBuilderFns';
import { useLabModelDetail } from '../../hooks';
import { getLineBuilder } from '../builder';

const ChartTotalCard = () => {
  const { t } = useTranslation();
  const { data: detail, isLoading } = useLabModelDetail();
  const modelDetail = detail?.labModelDetail;

  const { data, loading } = useLabDataMainScore();
  const eChartBuilderFns = useEChartBuilderFns([getLineBuilder()]);

  return (
    <BaseCard
      title={modelDetail?.name}
      // id={mainScore.tabIdent}
      description={''}
      headRight={(ref, fullScreen, setFullScreen) => <CardHeadButtons />}
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

export default ChartTotalCard;
