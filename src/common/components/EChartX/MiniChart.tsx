import React, { useRef, useEffect } from 'react';
import { EChartsOption, init, LineSeriesOption } from 'echarts';
import type { ECharts } from 'echarts';

interface EchartsData {
  width?: string;
  height?: string;
  data: LineSeriesOption['data'];
}

const MiniChart: React.FC<EchartsData> = ({
  width = '50px',
  height = '30px',
  data,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const echartsOpts: EChartsOption = {
      title: {},
      grid: {
        backgroundColor: 'white',
        top: '2%',
        left: '0',
        right: '0',
        bottom: '2%',
        containLabel: false,
      },
      yAxis: {
        type: 'value',
        show: false,
        scale: true,
      },
      xAxis: {
        type: 'category',
        show: false,
      },
      series: {
        color: '#2AB400',
        type: 'line',
        symbol: 'none',
        smooth: true,
        lineStyle: {
          width: 2,
        },
        data: data,
      },
    };

    // init
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current);
      chart.setOption(echartsOpts);
    }
    return () => {
      chart?.dispose();
    };
  }, [data]);

  return <div ref={chartRef} style={{ width, height }} />;
};
export default React.memo(MiniChart);
