import React, { useRef, useMemo } from 'react';
import { useIssueCompletionQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import type { EChartsOption } from 'echarts';
import { useStateType } from './issue';
import { getPieOption } from '@modules/analyze/DataView/MetricDetail/metricChartOption';

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
  }, [data, getStateText]);

  const option = getPieOption({ seriesData: getSeries });

  return (
    <div className="relative flex h-full pt-4" ref={chartRef}>
      <MetricChart
        loading={isLoading}
        option={option}
        containerRef={chartRef}
      />
    </div>
  );
};
export default IssueCompletion;
