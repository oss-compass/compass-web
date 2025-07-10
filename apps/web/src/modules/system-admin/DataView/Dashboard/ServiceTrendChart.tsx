import React, { useRef, useEffect, useState } from 'react';
import { Card, message } from 'antd';
import * as echarts from 'echarts';
import { useServiceVisitTrendData } from './hooks/useAdminApi';

interface ServiceTrendChartProps {
  className?: string;
}

const ServiceTrendChart: React.FC<ServiceTrendChartProps> = ({ className }) => {
  const trendChartRef = useRef<HTMLDivElement>(null);
  const [trendData, setTrendData] = useState({
    categories: [] as string[],
    series: [] as Array<{
      name: string;
      data: number[];
      color: string;
    }>,
  });

  // 获取服务访问趋势数据
  const {
    data: serviceVisitTrendApiData,
    isLoading,
    error,
  } = useServiceVisitTrendData();

  // 服务名称映射和颜色配置
  const serviceConfig = {
    analyze: { name: '开源健康评估', color: '#1890ff' },
    developer: { name: '开发者画像评估', color: '#52c41a' },
    'os-selection': { name: '开源选型评估', color: '#faad14' },
    'os-situation': { name: '开源态势洞察', color: '#f5222d' },
    dataHub: { name: '开源数据中枢', color: '#722ed1' },
    lab: { name: '实验室', color: '#13c2c2' },
  };

  // 模拟数据作为后备
  const fallbackTrendData = null;

  // 处理 API 数据转换
  const processApiData = (
    apiData: Array<{
      date: string;
      modules: Array<{ name: string; value: number }>;
    }>
  ) => {
    if (!apiData || apiData.length === 0) return null;

    // 提取日期作为 categories
    const categories = apiData.map((item) => {
      const date = new Date(item.date);
      return `${String(date.getMonth() + 1).padStart(2, '0')}-${String(
        date.getDate()
      ).padStart(2, '0')}`;
    });

    // 获取所有服务名称
    const allServices = new Set<string>();
    apiData.forEach((item) => {
      item.modules.forEach((module) => {
        allServices.add(module.name);
      });
    });

    // 为每个服务创建数据系列
    const series = Array.from(allServices).map((serviceName) => {
      const config = serviceConfig[serviceName as keyof typeof serviceConfig];
      const data = apiData.map((item) => {
        const serviceModule = item.modules.find((m) => m.name === serviceName);
        return serviceModule ? serviceModule.value : 0;
      });

      return {
        name: config?.name || serviceName,
        data,
        color: config?.color || '#8c8c8c',
      };
    });

    return { categories, series };
  };

  // 处理 API 错误
  useEffect(() => {
    if (error) {
      message.error('获取服务访问趋势数据失败');
    }
  }, [error]);

  // 处理 API 数据
  useEffect(() => {
    if (serviceVisitTrendApiData && serviceVisitTrendApiData.length > 0) {
      const processedData = processApiData(serviceVisitTrendApiData);
      if (processedData) {
        setTrendData(processedData);
      } else {
        setTrendData(fallbackTrendData);
      }
    } else if (!isLoading && !error) {
      // API 返回空数据时使用模拟数据
      setTrendData(fallbackTrendData);
    }
  }, [serviceVisitTrendApiData, isLoading, error]);

  // 初始化模拟数据
  useEffect(() => {
    if (!trendData) {
      setTrendData(fallbackTrendData);
    }
  }, []);

  // 图表渲染
  useEffect(() => {
    if (trendChartRef.current && trendData && trendData.categories.length > 0) {
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
          data: trendData.series.map((s) => s.name),
          bottom: 0,
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: trendData.categories,
        },
        yAxis: {
          type: 'value',
        },
        series: trendData.series.map((s) => ({
          name: s.name,
          type: 'line',
          stack: 'Total',
          data: s.data,
          itemStyle: {
            color: s.color,
          },
          symbolSize: 0,
          lineStyle: {
            color: s.color,
          },
          areaStyle: {
            color: s.color,
            opacity: 0.3,
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
  }, [trendData]);

  return (
    <Card title="服务点击量趋势" className={className} loading={isLoading}>
      {error ? (
        <div className="flex h-72 items-center justify-center text-red-500">
          <div className="text-center">
            <div className="mb-2">数据加载失败</div>
          </div>
        </div>
      ) : (
        <div ref={trendChartRef} className="h-72 w-full"></div>
      )}
    </Card>
  );
};

export default ServiceTrendChart;
