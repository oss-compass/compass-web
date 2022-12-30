import React, { useMemo, useState } from 'react';
import {
  getLineOption,
  line,
  getTooltipsFormatter,
  legendFormat,
  getColorWithLabel,
  percentageValueFormat,
  percentageUnitFormat,
  summaryLine,
  checkFormatPercentageValue,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const tabOptions = [
  { label: 'commit pr linked ratio', value: '1' },
  { label: 'commit pr', value: '2' },
  { label: 'commit pr linked', value: '3' },
];

const chartTabs = {
  '1': {
    legendName: 'commit pr linked ratio',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.gitPrLinkedRatio',
    summaryKey: 'summaryCodequality.gitPrLinkedRatio',
  },
  '2': {
    legendName: 'commit pr',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prCommitCount',
    summaryKey: 'summaryCodequality.prCommitCount',
  },
  '3': {
    legendName: 'commit pr linked',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.prCommitLinkedCount',
    summaryKey: 'summaryCodequality.prCommitLinkedCount',
  },
};

type TabValue = keyof typeof chartTabs;

const CommitPRLinkedRatio = () => {
  const [showAvg, setShowAvg] = useState(true);
  const [showMedian, setShowMedian] = useState(true);

  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');

  const tansOpts: TransOpt = chartTabs[tab];

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

    if (showMedian) {
      series.push(
        summaryLine({
          id: 'median',
          name: 'Median',
          data: checkFormatPercentageValue(tab === '1', summaryMedian),
          color: '#5B8FF9',
        })
      );
    }
    if (showAvg) {
      series.push(
        summaryLine({
          id: 'average',
          name: 'Average',
          data: checkFormatPercentageValue(tab === '1', summaryMean),
          color: '#F95B5B',
        })
      );
    }

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
        'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio'
      )}
      id={CollaborationDevelopment.CommitPRLinkedRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.commit_pr_linked_ratio_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#commit-pr-linked-ratio'
      }
      headRight={
        <>
          <MedianAndAvg
            showAvg={showAvg}
            onAvgChange={(b) => setShowAvg(b)}
            showMedian={showMedian}
            onMedianChange={(b) => setShowMedian(b)}
          />
        </>
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

export default CommitPRLinkedRatio;
