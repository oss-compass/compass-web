import React, { useMemo, useState } from 'react';
import {
  getLineOption,
  line,
  getLegendSelected,
  legendFormat,
  getTooltipsFormatter,
  getColorWithLabel,
  summaryLine,
} from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import { TransOpt, GenChartOptions } from '@modules/analyze/type';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';

const tabOptions = [
  { label: 'avg', value: '1' },
  { label: 'mid', value: '2' },
];

const chartTabs = {
  '1': {
    legendName: 'avg',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCommunity.prOpenTimeAvg',
    summaryKey: 'summaryCommunity.prOpenTimeAvg',
  },
  '2': {
    legendName: 'mid',
    xKey: 'grimoireCreationDate',
    yKey: 'metricCommunity.prOpenTimeMid',
    summaryKey: 'summaryCommunity.prOpenTimeMid',
  },
};

type TabValue = keyof typeof chartTabs;

const PrOpenTime = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');
  const tansOpts: TransOpt = chartTabs[tab];

  const getOptions: GenChartOptions = (
    { xAxis, compareLabels, yResults, summaryMedian, summaryMean },
    theme
  ) => {
    const series = yResults.map(({ legendName, label, level, data }) => {
      const color = getColorWithLabel(theme, label);
      return line({
        name: label,
        data: data,
        color,
      });
    });

    series.push(
      summaryLine({
        id: 'median',
        name: 'Median',
        data: summaryMedian,
        color: '#5B8FF9',
      })
    );
    series.push(
      summaryLine({
        id: 'average',
        name: 'Average',
        data: summaryMean,
        color: '#F95B5B',
      })
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

  return (
    <BaseCard
      title={t(
        'metrics_models:community_service_and_support.metrics.pr_open_time'
      )}
      id={Support.PrOpenTime}
      description={t(
        'metrics_models:community_service_and_support.metrics.pr_open_time_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#pr-open-time'
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

export default PrOpenTime;
