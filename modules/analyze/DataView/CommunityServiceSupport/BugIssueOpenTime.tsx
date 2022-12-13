import React, { useMemo, useState } from 'react';
import {
  genSeries,
  GetChartOptions,
  getLegendSelected,
  getLineOption,
  line,
} from '@modules/analyze/options';
import { Support } from '@modules/analyze/components/SideBar/config';
import {
  getLegendName,
  TransOpts,
  TransResult,
} from '@modules/analyze/DataTransform/transToAxis';
import { LineSeriesOption } from 'echarts';
import BaseCard from '@common/components/BaseCard';

import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';

import { useTranslation } from 'next-i18next';
import { toFixed } from '@common/utils';
import Tab from '@common/components/Tab';

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const isCompare = yResults.length > 1;
  const series = genSeries<LineSeriesOption>({ theme, yResults })(
    (opts, len) => {
      return line({
        name: opts.label,
        data: opts.data,
        color: opts.color,
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
  '1': [{ legendName: 'avg', valueKey: 'issueOpenTimeAvg' }],
  '2': [{ legendName: 'mid', valueKey: 'issueOpenTimeMid' }],
};

type TabValue = keyof typeof chartTabs;

const BugIssueOpenTime = () => {
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
        'metrics_models:community_service_and_support.metrics.bug_issue_open_time'
      )}
      id={Support.BugIssueOpenTime}
      description={t(
        'metrics_models:community_service_and_support.metrics.bug_issue_open_time_desc'
      )}
      docLink={
        '/docs/metrics-models/productivity/community-service-and-support/#bug-issue-open-time'
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

export default BugIssueOpenTime;
