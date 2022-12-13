import React, { useMemo, useState } from 'react';
import {
  bar,
  genSeries,
  getBarOption,
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
import { BarSeriesOption, LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { toFixed } from '@common/utils';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';

const getOptions: GetChartOptions = (
  { xAxis, compareLabels, yResults },
  theme
) => {
  const isCompare = yResults.length > 1;
  const series = genSeries<BarSeriesOption>({ theme, yResults })(
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      return bar({
        name: label,
        stack: label,
        data: data,
        color,
      });
    }
  );
  return getBarOption({
    xAxisData: xAxis,
    series,
    tooltip: {
      formatter: getTooltipsFormatter({ compareLabels }),
    },
  });
};

const chartTabs = {
  '1': [
    {
      legendName: 'lines add',
      valueKey: 'linesAddedFrequency',
    },
  ],
  '2': [
    {
      legendName: 'lines remove',
      valueKey: 'linesRemovedFrequency',
      valueFormat: (v: number) => toFixed(v * -1, 3),
    },
  ],
};

type TabValue = keyof typeof chartTabs;

const tabOptions = [
  { label: 'lines add', value: '1' },
  { label: 'lines remove', value: '2' },
];

const LocFrequency = () => {
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
