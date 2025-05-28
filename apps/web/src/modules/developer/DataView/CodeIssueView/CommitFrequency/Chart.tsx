import React, { useMemo } from 'react';
import EchartCommon from '@modules/developer/components/EchartCommon';

interface CommitFrequencyData {
  date: string;
  value: number;
}

interface ChartProps {
  containerRef?: React.RefObject<HTMLElement>;
  data?: CommitFrequencyData[];
}

const Chart: React.FC<ChartProps> = ({ containerRef, data = [] }) => {
  const processedData = useMemo(() => {
    if (!data || data.length === 0) return { dates: [], values: [] };
    const dates = data.map((item) => {
      return item.date;
    });
    const values = data.map((item) => item.value);
    return { dates, values };
  }, [data]);

  const option = {
    color: [
      '#4791ff',
      '#02bc77',
      '#ffd950',
      '#ff2366',
      '#ef6667',
      '#fcb32c',
      '#409eff',
      '#76d275',
      '#505d96',
      '#ededed',
      '#5686a5',
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        const param = params[0];
        return `${param.name}<br/>${param.seriesName}: ${param.value}`;
      },
    },
    grid: {
      top: 60,
      left: '50px',
      right: '30px',
      bottom: '50px',
    },
    xAxis: {
      type: 'category',
      data: processedData.dates,
      axisLine: {
        lineStyle: {},
      },
      axisLabel: {
        align: 'center',
        rotate: 5,
        margin: 20,
      },
      axisTick: {
        alignWithLabel: true,
      },
    },
    yAxis: {
      type: 'value',
      nameTextStyle: {
        color: '#696d6e',
        padding: [0, 0, 0, 40],
      },
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: '#696d6e',
      },
      splitLine: {
        lineStyle: {
          color: '#e6ebf1',
        },
      },
    },
    series: [
      {
        name: '提交次数',
        type: 'line',
        data: processedData.values,
        smooth: true,
        symbol: 'circle',
        symbolSize: 0,
        // itemStyle: {
        //     color: '#28b5e1'
        // },
        // lineStyle: {
        //     width: 3,
        //     color: '#28b5e1'
        // },
        emphasis: {
          itemStyle: {
            color: '#28b5e1',
            borderWidth: 3,
            borderColor: '#fff',
            shadowColor: 'rgba(0, 0, 0, 0.2)',
            shadowBlur: 8,
          },
        },
      },
    ],
  };

  return (
    <>
      <EchartCommon option={option} containerRef={containerRef} />
    </>
  );
};

export default React.memo(Chart);
