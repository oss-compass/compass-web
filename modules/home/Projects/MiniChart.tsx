import React, { useRef, useEffect } from 'react';
import { init } from 'echarts';
import type { ECharts } from 'echarts';
import { useDeepCompareEffect } from 'ahooks';

interface EchartsData {
  echartsData: Array<number | string>;
}

const MiniChart: React.FC<EchartsData> = ({ echartsData }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const echartsOpts = {
    title: {},
    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //         type: 'none'
    //     },
    // },
    grid: {
      backgroundColor: 'white',
      top: '1',
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: false,
    },
    yAxis: {
      type: 'value',
      show: false,
      min: function (value: { min: number }) {
        return value.min - 5;
      },
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
      data: echartsData,
    },
  };
  useDeepCompareEffect(() => {
    // init
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current);
      chart.setOption(echartsOpts);
    }
    return () => {
      chart?.dispose();
    };
  }, [echartsData]);

  return <div ref={chartRef} style={{ width: '100%', height: '100%' }} />;
};
export default React.memo(MiniChart);
