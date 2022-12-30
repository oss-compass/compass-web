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
import ChartWithData from '@modules/analyze/components/ChartWithData';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import { GenChartOptions, TabOption, TransOpt } from '@modules/analyze/type';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const tabOptions: TabOption[] = [
  { label: 'code review ratio', value: '1' },
  { label: 'total pr', value: '2' },
  { label: 'code review', value: '3' },
];

const chartTabs = {
  '1': {
    legendName: 'code review ratio',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.codeReviewRatio',
    summaryKey: 'summaryCodequality.codeReviewRatio',
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
    yKey: 'metricCodequality.codeReviewedCount',
    summaryKey: 'summaryCodequality.codeReviewedCount',
  },
};

type TabValue = keyof typeof chartTabs;

const CodeReviewRatio = () => {
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
        'metrics_models:collaboration_development_index.metrics.code_review_ratio'
      )}
      id={CollaborationDevelopment.CodeReviewRatio}
      description={t(
        'metrics_models:collaboration_development_index.metrics.code_review_ratio_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#code-review-ratio'
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

export default CodeReviewRatio;
