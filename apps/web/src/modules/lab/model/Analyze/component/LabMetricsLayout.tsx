import React from 'react';
import last from 'lodash/last';
import useLabDataMetric from '../hooks/useLabDataMetric';
import ChartCard from './ChartCard';

const LabMetricsLayout = () => {
  const { data } = useLabDataMetric();
  const item = last(data);
  const panels = item?.panels || [];

  return (
    <>
      {panels?.map((panel) => {
        return <ChartCard key={panel.metric.id} metric={panel.metric} />;
      })}
    </>
  );
};

export default LabMetricsLayout;
