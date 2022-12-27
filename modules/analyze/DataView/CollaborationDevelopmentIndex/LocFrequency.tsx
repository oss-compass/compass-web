import React, { useMemo, useState } from 'react';
import {
  bar,
  formatNegativeNumber,
  getBarOption,
  getColorWithLabel,
  getTooltipsFormatter,
  legendFormat,
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
    legendName: 'lines add',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.linesAddedFrequency',
    summaryKey: 'summaryCodequality.linesAddedFrequency',
  },
  '2': {
    legendName: 'lines remove',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCodequality.linesRemovedFrequency',
    summaryKey: 'summaryCodequality.linesRemovedFrequency',
  },
};

type TabValue = keyof typeof chartTabs;

const tabOptions = [
  { label: 'lines add', value: '1' },
  { label: 'lines remove', value: '2' },
];

const LocFrequency = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts = chartTabs[tab];

  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults },
    theme
  ) => {
    const series = yResults.map(({ label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return bar({
        name: label,
        stack: label,
        data: formatNegativeNumber(tab === '2', data),
        color,
      });
    });

    return getBarOption({
      xAxisData: xAxis,
      series,
      legend: legendFormat(compareLabels),
      tooltip: {
        formatter: getTooltipsFormatter({ compareLabels }),
      },
    });
  };

  return (
    <BaseCard
      title={t(
        'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency'
      )}
      id={CollaborationDevelopment.LocFrequency}
      description={t(
        'metrics_models:collaboration_development_index.metrics.lines_of_code_frequency_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#lines-of-code-frequency'
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

export default LocFrequency;
