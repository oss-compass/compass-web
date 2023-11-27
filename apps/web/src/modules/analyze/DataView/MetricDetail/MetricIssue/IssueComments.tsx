import React, { useRef, useMemo } from 'react';
import { useIssueCommentQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import type { EChartsOption } from 'echarts';
import { getPieOption } from '@modules/analyze/DataView/MetricDetail/metricChartOption';

const IssueCompletion: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
}> = ({ label, level, beginDate, endDate }) => {
  const { t } = useTranslation();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = useIssueCommentQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
  });

  const getSeries = useMemo(() => {
    const distribution = data?.issuesDetailOverview?.issueCommentDistribution;
    if (data && distribution?.length > 0) {
      return distribution.map(({ subCount, subName }) => {
        return {
          name: subName + t('analyze:metric_detail:comments'),
          value: subCount,
          count: subCount,
        };
      });
    } else {
      return [];
    }
  }, [data]);

  const option = getPieOption({ seriesData: getSeries });

  return (
    <div className="h-[600px] pt-4" ref={chartRef}>
      <MetricChart
        loading={isLoading}
        option={option}
        containerRef={chartRef}
      />
    </div>
  );
};
export default IssueCompletion;
