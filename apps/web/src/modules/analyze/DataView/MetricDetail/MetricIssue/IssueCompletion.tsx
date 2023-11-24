import React, { useRef, useMemo } from 'react';
import { useIssueCompletionQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import type { EChartsOption } from 'echarts';
import { useStateType } from './issue';

const IssueCompletion: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
}> = ({ label, level, beginDate, endDate }) => {
  const { t } = useTranslation();
  const stateOption = useStateType();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useIssueCompletionQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
  });
  const getStateText = (text) => {
    return stateOption.find((i) => i.value === text)?.text || text;
  };
  const getSeries = useMemo(() => {
    const distribution = data?.issuesDetailOverview?.issueStateDistribution;
    if (data && distribution?.length > 0) {
      return distribution.map(({ subCount, subName }) => {
        return {
          name: getStateText(subName),
          value: subCount,
        };
      });
    } else {
      return [];
    }
  }, [data]);

  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)',
    },
    color: [
      // '#5470c6',
      // '#91cc75',
      // '#fac858',
      // '#ee6666',
      '#2ec7c9',
      '#b6a2de',
      '#5ab1ef',
      '#ffb980',
      '#d87a80',
      '#8d98b3',
      '#e5cf0d',
      '#97b552',
      '#95706d',
      '#dc69aa',
      '#07a2a4',
      '#9a7fd1',
      '#588dd5',
      '#f5994e',
      '#c05050',
      '#59678c',
      '#c9ab00',
      '#7eb00a',
      '#6f5553',
      '#c14089',
    ],
    legend: {
      top: '2%',
      left: 'center',
    },
    series: [
      {
        name: '',
        type: 'pie',
        selectedMode: 'single',
        radius: [0, '65%'],
        label: {
          position: 'inner',
          fontSize: 14,
          color: '#333',
          formatter: '{b}: {c} ({d}%)',
        },
        data: getSeries,
      },
    ],
  };

  return (
    <div className="flex-1 pt-4" ref={chartRef}>
      <MetricChart
        loading={isLoading}
        option={option}
        containerRef={chartRef}
      />
    </div>
  );
};
export default IssueCompletion;
