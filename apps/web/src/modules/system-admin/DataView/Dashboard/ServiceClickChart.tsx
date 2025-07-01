import React, { useRef, useEffect } from 'react';
import { Card } from 'antd';
import * as echarts from 'echarts';

interface ServiceClickChartProps {
  className?: string;
}

const ServiceClickChart: React.FC<ServiceClickChartProps> = ({ className }) => {
  const serviceChartRef = useRef<HTMLDivElement>(null);

  const serviceData = [
    { name: '开源健康评估', value: 2856, color: '#1890ff' },
    { name: '开发者画像评估', value: 2134, color: '#52c41a' },
    { name: '开源选型评估', value: 1987, color: '#faad14' },
    { name: '开源态势洞察', value: 1654, color: '#f5222d' },
    { name: '开源数据中枢', value: 1432, color: '#722ed1' },
    { name: '实验室', value: 1098, color: '#13c2c2' },
  ];

  useEffect(() => {
    if (serviceChartRef.current) {
      const serviceChart = echarts.init(serviceChartRef.current);

      const serviceOption = {
        tooltip: {
          trigger: 'item',
          formatter: '{b}: {c} ({d}%)',
        },
        legend: {
          show: false,
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {c} ({d}%)',
              fontSize: 12,
              fontWeight: 'normal',
            },
            labelLine: {
              show: true,
              length: 15,
              length2: 10,
              smooth: false,
            },
            data: serviceData.map((item) => ({
              name: item.name,
              value: item.value,
              itemStyle: {
                color: item.color,
              },
            })),
          },
        ],
      };

      serviceChart.setOption(serviceOption);

      const handleServiceResize = () => {
        serviceChart.resize();
      };

      window.addEventListener('resize', handleServiceResize);

      return () => {
        window.removeEventListener('resize', handleServiceResize);
        serviceChart.dispose();
      };
    }
  }, []);

  return (
    <Card title="服务点击量占比" className={className}>
      <div ref={serviceChartRef} className="h-72 w-full"></div>
    </Card>
  );
};

export default ServiceClickChart;
