import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Level } from '@common/constant';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import first from 'lodash/first';
import { ModelMetric, Diagram } from '@oss-compass/graphql';
import useLabDataMetric from '../hooks/useLabDataMetric';
import useEChartBuilderFns from '../hooks/useEChartBuilderFns';
import CardHeadButtons from './CardHeadButtons';
import { LabChartOption } from '../context/LabChartOption';
import { getChartBuilder } from '../builder';

const pickTabs = (
  slugsData: {
    label: string;
    level: Level;
    metric?: ModelMetric | null;
    __typename?: 'Panel';
    diagrams?: Array<Diagram> | null;
  }[]
): { label: string; value: string }[] => {
  const firstSlugItem = first(slugsData);
  const diagrams = firstSlugItem?.diagrams;

  return diagrams?.map?.((i) => ({
    label: i.tabIdent,
    value: i.tabIdent,
  }));
};

const pickDataByTab = (
  slugsData: {
    label: string;
    level: Level;
    metric?: ModelMetric | null;
    __typename?: 'Panel';
    diagrams?: Array<Diagram> | null;
  }[],
  tab: string
): {
  label: string;
  level: Level;
  chartType: string;
  tab: string;
  dates: string[];
  values: number[];
}[] => {
  return slugsData.map(({ diagrams, level, label }) => {
    const diagram = diagrams?.find((i) => i.tabIdent === tab);
    return {
      label,
      level,
      chartType: diagram?.type,
      tab: diagram?.tabIdent,
      dates: diagram?.dates as string[],
      values: diagram?.values,
    };
  });
};

const ChartCard = ({ metric }: { metric: ModelMetric }) => {
  const { t } = useTranslation();
  const { pickDataByMetric, loading } = useLabDataMetric();
  const slugsData = pickDataByMetric(metric.ident);
  console.log(slugsData);

  const tabs = pickTabs(slugsData);
  // const [tab, setTab] = useState<string>(first(tabs)?.value);

  const showData = pickDataByTab(slugsData, first(tabs)?.value);
  const eChartBuilderFns = useEChartBuilderFns([getChartBuilder()]);

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
              data={showData}
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

export default ChartCard;
