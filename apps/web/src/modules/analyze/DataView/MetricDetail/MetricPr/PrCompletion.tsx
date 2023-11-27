import React, { useRef, useMemo } from 'react';
import { usePullsCompletionQuery } from '@oss-compass/graphql';
import client from '@common/gqlClient';
import MetricChart from '@modules/analyze/DataView/MetricDetail/MetricChart';
import { getPieOption } from '@modules/analyze/DataView/MetricDetail/metricChartOption';
import { useStateType } from '@modules/analyze/DataView/MetricDetail/MetricPr/PR';

const PrCompletion: React.FC<{
  label: string;
  level: string;
  beginDate: Date;
  endDate: Date;
}> = ({ label, level, beginDate, endDate }) => {
  const stateOption = useStateType();
  const chartRef = useRef<HTMLDivElement>(null);
  const { data, isLoading } = usePullsCompletionQuery(client, {
    label: label,
    level: level,
    beginDate: beginDate,
    endDate: endDate,
  });
  const getStateText = (text) => {
    return stateOption.find((i) => i.value === text)?.text || text;
  };
  const getSeries = useMemo(() => {
    const distribution = data?.pullsDetailOverview?.pullStateDistribution;
    if (data && distribution?.length > 0) {
      return distribution.map(({ subCount, subName }) => {
        return { name: getStateText(subName), value: subCount };
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
export default PrCompletion;
