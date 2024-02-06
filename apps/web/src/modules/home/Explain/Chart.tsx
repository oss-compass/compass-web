import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import useOptions from '@common/components/EChartGl/useOptions';
import type { EChartsOption } from 'echarts';

const EChartGl = dynamic(() => import('@common/components/EChartGl'), {
  ssr: false,
});

const Chart = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { echartsOpts } = useOptions();
  return (
    <div className="h-full flex-1" ref={containerRef}>
      <EChartGl
        option={echartsOpts as EChartsOption}
        containerRef={containerRef}
      />
    </div>
  );
};
export default Chart;
