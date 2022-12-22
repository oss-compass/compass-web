import React, { useMemo, useState } from 'react';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
  percentageValueFormat,
  legendFormat,
  getTooltipsFormatter,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import { TransOpts } from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import { toFixed } from '@common/utils';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import EChartX from '@common/components/EChartX';

const getOptions: GetChartOptions = (
  { isCompare, tabValue, compareLabels, xAxis, yResults },
  theme
) => {
  const series = genSeries<LineSeriesOption>({ theme, yResults })(
    (opt, len) => {
      const { legendName, label, color, data } = opt;
      if (legendName === 'code merge ratio') {
        return line({
          name: label,
          data,
          color,
          yAxisIndex: 0,
        });
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
  { label: 'code merge ratio', value: '1' },
  { label: 'total pr', value: '2' },
  { label: 'code merge', value: '3' },
];

const chartTabs = {
  '1': [
    {
      legendName: 'code merge ratio',
      valueKey: 'codeMergeRatio',
      valueFormat: (v: number) => toFixed(v * 100, 2),
    },
  ],
  '2': [{ legendName: 'total pr', valueKey: 'prCount' }],
  '3': [{ legendName: 'code merge', valueKey: 'codeMergedCount' }],
};

type TabValue = keyof typeof chartTabs;

const CodeMergeRatio = () => {
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
