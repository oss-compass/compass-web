import React, { useRef, useEffect } from 'react';
import { Card, message } from 'antd';
import * as echarts from 'echarts';
import { useServiceVisitData } from '../../hooks';

interface ServiceClickChartProps {
  className?: string;
}

const ServiceClickChart: React.FC<ServiceClickChartProps> = ({ className }) => {
  const serviceChartRef = useRef<HTMLDivElement>(null);
  const { data: apiData, isLoading, error } = useServiceVisitData();

  // 服务名称映射
  const serviceNameMap: Record<string, string> = {
    analyze: '开源健康评估',
    'os-selection': '开源选型评估',
    lab: '实验室',
    dataHub: '开源数据中枢',
    developer: '开发者画像评估',
    'os-situation': '开源态势洞察',
  };

  // 颜色配置
  const colorMap: Record<string, string> = {
    开源健康评估: '#1890ff',
    开发者画像评估: '#52c41a',
    开源选型评估: '#faad14',
    开源态势洞察: '#f5222d',
    开源数据中枢: '#722ed1',
    实验室: '#13c2c2',
  };

  // 模拟数据（作为后备）
  const mockServiceData = [
    { name: '开源健康评估', value: 2856, color: '#1890ff' },
    { name: '开发者画像评估', value: 2134, color: '#52c41a' },
    { name: '开源选型评估', value: 1987, color: '#faad14' },
    { name: '开源态势洞察', value: 1654, color: '#f5222d' },
    { name: '开源数据中枢', value: 1432, color: '#722ed1' },
    { name: '实验室', value: 1098, color: '#13c2c2' },
  ];

  // 处理 API 数据
  const processServiceData = () => {
    if (apiData && apiData.length > 0) {
      return apiData.map((item) => ({
        name: serviceNameMap[item.name] || item.name,
        value: item.value,
        color: colorMap[serviceNameMap[item.name]] || '#1890ff',
      }));
    }
    return mockServiceData;
  };

  const serviceData = processServiceData();

  // 错误处理
  useEffect(() => {
    if (error) {
      console.error('服务访问数据获取失败：', error);
      message.error('服务访问数据获取失败，使用模拟数据');
    }
  }, [error]);

  useEffect(() => {
    if (serviceChartRef.current && !isLoading) {
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
  }, [serviceData, isLoading]);

  return (
    <Card title="服务点击量占比" className={className} loading={isLoading}>
      <div ref={serviceChartRef} className="h-72 w-full"></div>
    </Card>
  );
};

export default ServiceClickChart;
