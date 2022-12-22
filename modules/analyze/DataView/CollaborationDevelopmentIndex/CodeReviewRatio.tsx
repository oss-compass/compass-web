import React, { useMemo, useState } from 'react';
import {
  genSeries,
  getLineOption,
  line,
  lineArea,
  GetChartOptions,
  getLegendSelected,
  getTooltipsFormatter,
  legendFormat,
  percentageValueFormat,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import {
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import { toFixed } from '@common/utils';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';

const getOptions: GetChartOptions = (
  { xAxis, compareLabels, tabValue, yResults },
  theme
) => {
  const series = genSeries<LineSeriesOption>({ theme, yResults })(
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      if (legendName === 'code review ratio') {
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
    legend: legendFormat(compareLabels),
    tooltip: {
      formatter: getTooltipsFormatter({
        compareLabels,
        valueFormat: tabValue === '1' ? percentageValueFormat : undefined,
      }),
    },
  });
};

const tabOptions = [
  { label: 'code review ratio', value: '1' },
  { label: 'total pr', value: '2' },
  { label: 'code review', value: '3' },
];

const chartTabs = {
  '1': [
    {
      legendName: 'code review ratio',
      valueKey: 'codeReviewRatio',
      valueFormat: (v: number) => toFixed(v * 100, 2),
    },
  ],
  '2': [{ legendName: 'total pr', valueKey: 'prCount' }],
  '3': [{ legendName: 'code review', valueKey: 'codeReviewedCount' }],
};

type TabValue = keyof typeof chartTabs;

const CodeReviewRatio = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');

  const tansOpts: TransOpts = useMemo(() => {
    return {
      metricType: 'metricCodequality',
      xAxisKey: 'grimoireCreationDate',
      yAxisOpts: chartTabs[tab],
      tabValue: tab,
    };
  }, [tab]);

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
