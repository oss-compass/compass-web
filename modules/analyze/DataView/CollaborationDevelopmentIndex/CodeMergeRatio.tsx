import React, { useMemo, useState } from 'react';
import {
  getLineOption,
  line,
  percentageValueFormat,
  legendFormat,
  getTooltipsFormatter,
  getColorWithLabel,
  percentageUnitFormat,
  summaryLine,
  checkFormatPercentageValue,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import EChartX from '@common/components/EChartX';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';

const tabOptions = [
  { label: 'code merge ratio', value: '1' },
  { label: 'total pr', value: '2' },
  { label: 'code merge', value: '3' },
];

const chartTabs = {
  '1': {
    legendName: 'code merge ratio',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.codeMergeRatio',
    summaryKey: 'summaryCodequality.codeMergeRatio',
  },
  '2': {
    legendName: 'total pr',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prCount',
    summaryKey: 'summaryCodequality.prCount',
  },
  '3': {
    legendName: 'code merge',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.codeMergedCount',
    summaryKey: 'summaryCodequality.codeMergedCount',
  },
};

type TabValue = keyof typeof chartTabs;

const CodeMergeRatio = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts: TransOpt = chartTabs[tab];
  const getOptions: GenChartOptions = (
    { isCompare, compareLabels, xAxis, yResults, summaryMedian, summaryMean },
    theme
  ) => {
    const series = yResults.map(({ label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: tab === '1' ? data.map((v) => percentageValueFormat(v)) : data,
        color,
      });
    });

    series.push(
      summaryLine({
        id: 'median',
        name: 'Median',
        data: checkFormatPercentageValue(tab === '1', summaryMedian),
        color: '#5B8FF9',
      })
    );
    series.push(
      summaryLine({
        id: 'average',
        name: 'Average',
        data: checkFormatPercentageValue(tab === '1', summaryMean),
        color: '#F95B5B',
      })
    );

    return getLineOption({
      xAxisData: xAxis,
      series,
      yAxis:
        tab === '1'
          ? { type: 'value', axisLabel: { formatter: '{value}%' } }
          : { type: 'value' },
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({
          compareLabels,
          valueFormat: tab === '1' ? percentageUnitFormat : undefined,
        }),
      },
    });
  };

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.code_merge_ratio'
      )}
      id={CollaborationDevelopment.CodeMergeRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.code_merge_ratio_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#code-merge-ratio'
      }
    >
      {(ref, fullScreen) => {
        return (
          <>
            <div className="mb-4">
              <Tab
                options={tabOptions}
                value={tab}
                onChange={(v) => setTab(v as TabValue)}
              />
            </div>
            <ChartWithData tansOpts={tansOpts} getOptions={getOptions}>
              {(loading, option) => {
                return (
                  <EChartX
                    containerRef={ref}
                    loading={loading}
                    option={option}
                  />
                );
              }}
            </ChartWithData>
          </>
        );
      }}
    </BaseCard>
  );
};

export default CodeMergeRatio;
