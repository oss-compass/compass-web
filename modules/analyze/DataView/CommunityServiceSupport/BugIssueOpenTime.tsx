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

import Chart from '@modules/analyze/components/Chart';

import { useTranslation } from 'next-i18next';
import { toFixed } from '@common/utils';
import Tab from '@common/components/Tab';

const getOptions: GetChartOptions = ({ xAxis, yResults }, theme) => {
  const isCompare = yResults.length > 1;
  const series = genSeries<LineSeriesOption>({ theme, yResults })(
    (opts, len) => {
      const getName = getLegendName(opts.legendName, {
        label: opts.label,
        compareLabels: opts.compareLabels,
        level: opts.level,
        isCompare: opts.isCompare,
        legendTypeCount: len,
      });
      return line({
        name: getName,
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
            <Chart
              containerRef={ref}
              getOptions={getOptions}
              tansOpts={tansOpts}
            />
          </>
        );
      }}
    </BaseCard>
  );
};

export default BugIssueOpenTime;
