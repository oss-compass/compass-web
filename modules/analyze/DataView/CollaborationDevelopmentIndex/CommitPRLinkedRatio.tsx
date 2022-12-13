import React, { useMemo, useState } from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
  getLegendSelected,
  getTooltipsFormatter,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import {
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import { LineSeriesOption } from 'echarts';
import { toFixed } from '@common/utils';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';

const getOptions: GetChartOptions = (
  { xAxis, compareLabels, yResults },
  theme
) => {
  const isCompare = yResults.length > 1;
  const series = genSeries<LineSeriesOption>({ theme, yResults })(
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      if (legendName === 'commit pr linked ratio') {
        return line({ name: label, data, color, yAxisIndex: 0 });
      }
      return line({ name: label, data, color, yAxisIndex: 1 });
    }
  );

  return getLineOption({
    xAxisData: xAxis,
    series,
    yAxis: [
      { type: 'value', axisLabel: { formatter: '{value}%' } },
      { type: 'value' },
    ],
    tooltip: {
      formatter: getTooltipsFormatter({ compareLabels }),
    },
  });
};

const tabOptions = [
  { label: 'commit pr linked ratio', value: '1' },
  { label: 'commit pr', value: '2' },
  { label: 'commit pr linked', value: '3' },
];

const chartTabs = {
  '1': [
    {
      legendName: 'commit pr linked ratio',
      valueKey: 'gitPrLinkedRatio',
      valueFormat: (v: number) => toFixed(v * 100, 2),
    },
  ],
  '2': [{ legendName: 'commit pr', valueKey: 'prCommitCount' }],
  '3': [{ legendName: 'commit pr linked', valueKey: 'prCommitLinkedCount' }],
};

type TabValue = keyof typeof chartTabs;

const CommitPRLinkedRatio = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');

  const tansOpts: TransOpts = useMemo(() => {
    return {
      metricType: 'metricCodequality',
      xAxisKey: 'grimoireCreationDate',
      yAxisOpts: chartTabs[tab],
    };
  }, [tab]);

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
