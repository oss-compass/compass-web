import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import first from 'lodash/first';
import { ModelMetric, Diagram } from '@oss-compass/graphql';
import useLabDataMetric from '../hooks/useLabDataMetric';
import { useDataBuilder, useEChartBuilder } from '../hooks/useBuilderFns';
import CardHeadButtons from './CardHeadButtons';
import { LabChartOption } from '../context/LabChartOption';
import {
  getChartBuilder,
  getAlignValuesBuilder,
  getDataFormatBuilder,
} from '../builder';
import { pickTabs, pickDataByTab } from '../context/dataHandle';

const CardMetric = ({ metric }: { metric: ModelMetric }) => {
  const { t } = useTranslation();
  const { pickDataByMetric, loading } = useLabDataMetric();
  const slugsData = pickDataByMetric(metric.ident);
  const tabs = pickTabs(slugsData);
  const showData = pickDataByTab(slugsData, first(tabs)?.value);

  // const [tab, setTab] = useState<string>(first(tabs)?.value);

  const eChartBuilderFns = useEChartBuilder([getChartBuilder()]);
  const dataBuilder = useDataBuilder([
    getAlignValuesBuilder(),
    getDataFormatBuilder(),
  ]);

  const id = `card_${metric.category}_${metric.ident}`;

  return (
    <BaseCard
      id={id}
      title={t(`lab_metrics:${metric.category}.${metric.ident}`)}
      description={t(`lab_metrics:${metric.category}.${metric.ident}_desc`)}
      headRight={(ref, fullScreen, setFullScreen) => (
        <CardHeadButtons id={id} />
      )}
      bodyClass={'h-[360px]'}
      bodyRender={(ref, fullScreen) => {
        return (
          <>
            {/*{tabs.length > 1 ? (*/}
            {/*  <div className="mb-4">*/}
            {/*    <Tab options={tabs} value={tab} onChange={(v) => setTab(v)} />*/}
            {/*  </div>*/}
            {/*) : null}*/}

            <LabChartOption
              originData={showData}
              dataFormatFn={dataBuilder}
              optionFn={eChartBuilderFns}
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
          </>
        );
      }}
    />
  );
};

export default CardMetric;
