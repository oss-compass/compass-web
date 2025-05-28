import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
// import { TooltipComponent } from 'echarts/components';
// import { CanvasRenderer } from 'echarts/renderers';
import 'echarts-wordcloud';

interface Topic {
  name: string;
  value: number;
}

interface CloudProps {
  topics: Topic[];
}

const Cloud: React.FC<CloudProps> = ({ topics }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current || !topics || topics.length === 0) return;

    // 初始化图表
    const chart = echarts.init(chartRef.current);

    // 配置项
    const option = {
      tooltip: {
        show: true,
        formatter: function (params) {
          return `${params.name}: ${params.value}`;
        },
      },
      series: [
        {
          type: 'wordCloud',
          shape: 'circle',
          left: 'center',
          top: 'center',
          width: '90%',
          height: '90%',
          right: null,
          bottom: null,
          sizeRange: [12, 30],
          rotationRange: [-90, 90],
          rotationStep: 45,
          gridSize: 8,
          drawOutOfBound: false,
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
              // 随机颜色
              return (
                'rgb(' +
                [
                  Math.round(Math.random() * 160) + 60,
                  Math.round(Math.random() * 160) + 60,
                  Math.round(Math.random() * 160) + 60,
                ].join(',') +
                ')'
              );
            },
          },
          emphasis: {
            focus: 'self',
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
          data: topics,
        },
      ],
    };

    // 设置配置项并渲染图表
    chart.setOption(option);

    // 响应窗口大小变化
    const handleResize = () => {
      chart.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [topics]);

  return (
    <div className="mt-6 mb-4">
      <h3 className="mb-2 text-lg font-medium text-gray-700">技术领域词云</h3>
      <div ref={chartRef} style={{ width: '100%', height: '200px' }} />
    </div>
  );
};

export default Cloud;
