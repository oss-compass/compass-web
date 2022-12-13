import React, { useMemo, useState } from 'react';
import { LineSeriesOption } from 'echarts';
import {
  genSeries,
  getLineOption,
  line,
  GetChartOptions,
  getLegendSelected,
} from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import BaseCard from '@common/components/BaseCard';

import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';

import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const isCompare = yResults.length > 1;
  const series = genSeries<LineSeriesOption>({
    theme,
    yResults,
  })(
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
  });
};

const tabOptions = [
  { label: 'avg', value: '1' },
  { label: 'mid', value: '2' },
];

const chartTabs = {
  '1': [{ legendName: 'avg', valueKey: 'prOpenTimeAvg' }],
  '2': [{ legendName: 'mid', valueKey: 'prOpenTimeMid' }],
};

type TabValue = keyof typeof chartTabs;

const PrOpenTime = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<TabValue>('1');

  const tansOpts: TransOpts = useMemo(() => {
    return {
      metricType: 'metricCommunity',
      xAxisKey: 'grimoireCreationDate',
      yAxisOpts: chartTabs[tab],
    };
  }, [tab]);

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
