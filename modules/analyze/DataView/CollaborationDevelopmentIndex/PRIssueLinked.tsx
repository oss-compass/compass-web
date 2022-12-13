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
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
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
      if (legendName === 'linked issue ratio') {
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

const chartTabs = {
  '1': [
    {
      legendName: 'linked issue ratio',
      valueKey: 'prIssueLinkedRatio',
      valueFormat: (v: number) => toFixed(v * 100, 2),
    },
  ],
  '2': [{ legendName: 'total pr', valueKey: 'prCount' }],
  '3': [
    {
      legendName: 'linked issue',
      valueKey: 'prIssueLinkedCount',
    },
  ],
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
