import React, { useMemo, useState } from 'react';
import {
  getLineOption,
  line,
  getTooltipsFormatter,
  legendFormat,
  percentageValueFormat,
  getColorWithLabel,
  summaryLine,
  percentageUnitFormat,
  checkFormatPercentageValue,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import { GenChartOptions } from '@modules/analyze/type';

const chartTabs = {
  '1': {
    legendName: 'linked issue ratio',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prIssueLinkedRatio',
    summaryKey: 'summaryCodequality.prIssueLinkedRatio',
  },
  '2': {
    legendName: 'total pr',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prCount',
    summaryKey: 'summaryCodequality.prCount',
  },
  '3': {
    legendName: 'linked issue',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prIssueLinkedCount',
    summaryKey: 'summaryCodequality.prIssueLinkedCount',
  },
};

type TabValue = keyof typeof chartTabs;

const tabOptions = [
  { label: 'linked issue ratio', value: '1' },
  { label: 'total pr', value: '2' },
  { label: 'linked issue', value: '3' },
];

const PRIssueLinked = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts = chartTabs[tab];

  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults, summaryMedian, summaryMean },
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
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio'
      )}
      id={CollaborationDevelopment.PRIssueLinkedRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.pr_issue_linked_ratio_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#pr-issue-linked-ratio'
      }
    >
      {(ref) => {
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

export default PRIssueLinked;
