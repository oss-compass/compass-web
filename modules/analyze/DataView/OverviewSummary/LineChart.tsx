import React, { useMemo, useState } from 'react';
import {
  ChartSummaryProps,
  getLineOption,
  line,
} from '@modules/analyze/options';
import BaseCard from '@common/components/BaseCard';
import EChartX from '@common/components/EChartX';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import { transMarkingSystem } from '@modules/analyze/DataTransform/transMarkingSystem';
import { transDataForOverview } from '@modules/analyze/DataTransform/transDataForOverview';
import { Topic } from '@modules/analyze/Misc/SideBar/config';

const TrendsChart: React.FC<ChartSummaryProps> = ({
  loading = false,
  xAxis,
  yAxis,
}) => {
  const [markingSys, setMarkingSys] = useState(true);
  const echartsOpts = useMemo(() => {
    const series = yAxis.map(({ legendName, data }) => {
      markingSys && (data = data.map((i) => transMarkingSystem(i)));
      return line({ name: legendName, data });
    });
    return getLineOption({ xAxisData: xAxis, series });
  }, [xAxis, yAxis, markingSys]);

  return (
    <BaseCard
      title="Overview"
      id={Topic.Overview}
      description=""
      showMarkingSysBtn={true}
      getMarkingSys={(val) => setMarkingSys(val)}
    >
      {(containerRef) => (
        <EChartX
          option={echartsOpts}
          loading={loading}
          containerRef={containerRef}
        />
      )}
    </BaseCard>
  );
};

const opts = [
  {
    type: 'metricCodequality',
    key: 'codeQualityGuarantee',
    legendName: 'code quality guarantee',
  },
  {
    type: 'metricCommunity',
    key: 'communitySupportScore',
    legendName: 'community support score',
  },
  {
    type: 'metricActivity',
    key: 'activityScore',
    legendName: 'activity score',
  },
  {
    type: 'groupMetricActivity',
    key: 'organizationsActivity',
    legendName: 'organizations activity',
  },
];

const dateKey = 'grimoireCreationDate';

const TrendsChartWithData = () => {
  const data = useMetricQueryData();
  const isLoading = data?.some((i) => i.loading);

  const { xAxis, yAxisResult } = useMemo(() => {
    const result = data[0].result;
    if (!result) return { xAxis: [], yAxisResult: [] };
    return transDataForOverview(result, opts, dateKey);
  }, [data]);

  return <TrendsChart loading={isLoading} xAxis={xAxis} yAxis={yAxisResult} />;
};

export default TrendsChartWithData;
