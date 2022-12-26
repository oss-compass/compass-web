import React, { useMemo, useState } from 'react';
import {
  getLineOption,
  line,
  getTooltipsFormatter,
  legendFormat,
  getColorWithLabel,
  percentageValueFormat,
  percentageUnitFormat,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import ChartWithDataV2 from '@modules/analyze/components/ChartWithDataV2';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';

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
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');

  const tansOpts: TransOpt = useMemo(() => {
    return chartTabs[tab];
  }, [tab]);

  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults },
    theme
  ) => {
    const series = yResults.map(({ label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: tab === '1' ? data.map((v) => percentageValueFormat(v)) : data,
        color,
        yAxisIndex: tab === '1' ? 0 : 1,
      });
    });

    return getLineOption({
      xAxisData: xAxis,
      series,
      yAxis: [
        { type: 'value', axisLabel: { formatter: '{value}%' } },
        { type: 'value' },
      ],
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
            <ChartWithDataV2 tansOpts={tansOpts} getOptions={getOptions}>
              {(loading, option) => {
                return (
                  <EChartX
                    containerRef={ref}
                    loading={loading}
                    option={option}
                  />
                );
              }}
            </ChartWithDataV2>
          </>
        );
      }}
    </BaseCard>
  );
};

export default CommitPRLinkedRatio;
