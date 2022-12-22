import React, { useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
  getLegendSelected,
  getTooltipsFormatter,
  legendFormat,
} from '@modules/analyze/options';
import { CollaborationDevelopment } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';
import Tab from '@common/components/Tab';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';

const getOptions: GetChartOptions = (
  { xAxis, compareLabels, yResults },
  theme
) => {
  const series = genSeries<LineSeriesOption>({ theme, yResults })(
    (
      { legendName, label, compareLabels, level, isCompare, color, data },
      len
    ) => {
      return line({
        name: label,
        data: data,
        color,
      });
    }
  );

  return getLineOption({
    xAxisData: xAxis,
    series,
    legend: legendFormat(compareLabels),
    tooltip: {
      formatter: getTooltipsFormatter({ compareLabels }),
    },
  });
};

const chartTabs = {
  '1': [{ legendName: 'total', valueKey: 'contributorCount' }],
  '2': [
    {
      legendName: 'code reviewer',
      valueKey: 'activeC1PrCommentsContributorCount',
    },
  ],
  '3': [
    {
      legendName: 'pr creator',
      valueKey: 'activeC1PrCreateContributorCount',
    },
  ],
  '4': [
    {
      legendName: 'commit author',
      valueKey: 'activeC2ContributorCount',
    },
  ],
};

type TabValue = keyof typeof chartTabs;

const tabOptions = [
  { label: 'total', value: '1' },
  { label: 'code reviewer', value: '2' },
  { label: 'pr creator', value: '3' },
  { label: 'commit author', value: '4' },
];

const ContributorCount = () => {
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
        'metrics_models:collaboration_development_index.metrics.contributor_count'
      )}
      id={CollaborationDevelopment.ContributorCount}
      description={t(
        'metrics_models:collaboration_development_index.metrics.contributor_count_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/collaboration-development-index/#code-contributor-count'
      }
    >
      {(ref, fullScreen) => {
        return (
          <div>
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
          </div>
        );
      }}
    </BaseCard>
  );
};

export default ContributorCount;
