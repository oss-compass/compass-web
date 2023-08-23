import React from 'react';
import last from 'lodash/last';
import useLabDataMetric from '../hooks/useLabDataMetric';
import CardMetric from './CardMetric';

const LayoutMetricCards = () => {
  const { data } = useLabDataMetric();
  const item = last(data);
  const panels = item?.panels || [];

  return (
    <div className="relative mb-12 grid min-w-0 grid-cols-2 gap-4 md:grid-cols-1">
      {panels?.map((panel) => {
        return <CardMetric key={panel.metric.id} metric={panel.metric} />;
      })}
    </div>
  );
};

export default LayoutMetricCards;
