import React, { useRef, useEffect } from 'react';
import { Card } from 'antd';
import * as echarts from 'echarts';

interface ServiceTrendChartProps {
  className?: string;
}

const ServiceTrendChart: React.FC<ServiceTrendChartProps> = ({ className }) => {
  const trendChartRef = useRef<HTMLDivElement>(null);

  const trendData = {
    categories: ['01-15', '01-16', '01-17', '01-18', '01-19', '01-20', '01-21'],
    series: [
      {
        name: '开源健康评估',
        data: [12, 15, 11, 18, 14, 22, 19],
        color: '#1890ff',
      },
      {
        name: '开发者画像评估',
        data: [25, 20, 23, 28, 31, 35, 33],
        color: '#52c41a',
      },
      {
        name: '开源选型评估',
        data: [18, 26, 22, 19, 24, 38, 42],
        color: '#faad14',
      },
      {
        name: '开源态势洞察',
        data: [35, 38, 32, 36, 41, 39, 37],
        color: '#f5222d',
      },
      {
        name: '开源数据中枢',
        data: [45, 52, 48, 51, 58, 62, 59],
        color: '#722ed1',
      },
      {
        name: '实验室',
        data: [8, 6, 9, 11, 13, 15, 17],
        color: '#13c2c2',
      },
    ],
  };

  useEffect(() => {
    if (trendChartRef.current) {
      const trendChart = echarts.init(trendChartRef.current);

      const trendOption = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        legend: {
          show: true,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: trendData.categories,
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 11,
          },
        },
        series: trendData.series.map((item) => ({
          name: item.name,
          type: 'line',
          stack: 'Total',
          emphasis: {
            focus: 'series',
          },
          data: item.data,
          itemStyle: {
            color: item.color,
          },
          areaStyle: {
            color: item.color,
            opacity: 0.4,
          },
        })),
      };

      trendChart.setOption(trendOption);

      const handleTrendResize = () => {
        trendChart.resize();
      };

      window.addEventListener('resize', handleTrendResize);

      return () => {
        window.removeEventListener('resize', handleTrendResize);
        trendChart.dispose();
      };
    }
  }, []);

  return (
    <Card title="服务点击量趋势" className={className}>
      <div ref={trendChartRef} className="h-72 w-full"></div>
    </Card>
  );
};

export default ServiceTrendChart;
