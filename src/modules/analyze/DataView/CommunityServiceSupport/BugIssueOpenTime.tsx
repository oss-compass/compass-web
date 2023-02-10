import React, { useMemo, useState } from 'react';
import { Support } from '@modules/analyze/components/SideBar/config';
import BaseCard from '@common/components/BaseCard';
import ChartWithData from '@modules/analyze/components/ChartWithData';
import EChartX from '@common/components/EChartX';
import { useTranslation } from 'next-i18next';
import Tab from '@common/components/Tab';
import { GenChartOptions, TransOpt } from '@modules/analyze/type';
import useGetLineOption from '@modules/analyze/hooks/useGetLineOption';
import MedianAndAvg from '@modules/analyze/components/MedianAndAvg';

const BugIssueOpenTime = () => {
  const { t } = useTranslation();

  const tabOptions = [
    { label: 'avg', value: '1' },
    { label: 'mid', value: '2' },
  ];

  const chartTabs = {
    '1': {
      legendName: 'avg',
      xKey: 'grimoireCreationDate',
      yKey: 'metricCommunity.issueOpenTimeAvg',
      summaryKey: 'summaryCommunity.issueOpenTimeAvg',
    },
    '2': {
      legendName: 'mid',
      xKey: 'grimoireCreationDate',
      yKey: 'metricCommunity.issueOpenTimeMid',
      summaryKey: 'summaryCommunity.issueOpenTimeMid',
    },
  };

  const [tab, setTab] = useState<TabValue>('1');
  type TabValue = keyof typeof chartTabs;
  const tansOpts: TransOpt = chartTabs[tab];
  const { getOptions, showAvg, showMedian, setShowMedian, setShowAvg } =
    useGetLineOption();

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
      headRight={
        <>
          <MedianAndAvg
            showAvg={showAvg}
            onAvgChange={(b) => setShowAvg(b)}
            showMedian={showMedian}
            onMedianChange={(b) => setShowMedian(b)}
          />
        </>
      }
      bodyClass={'h-[400px]'}
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
