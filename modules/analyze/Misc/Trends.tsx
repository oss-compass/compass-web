import React from 'react';
import BaseCard from '@common/components/BaseCard';
import EChartsReact from 'echarts-for-react';

const Trends = () => {
  return (
    <BaseCard
      loading={false}
      title="Trending"
      description="The growth in the aggregated count of unique contributors analyzed during the selected time period."
    >
      {/*<EChartsReact option={echartsOpts} />*/}
    </BaseCard>
  );
};

export default Trends;
