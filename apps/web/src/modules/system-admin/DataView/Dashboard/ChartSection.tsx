import React, { useRef, useEffect, useState } from 'react';
import { Card, message, Skeleton } from 'antd';
import * as echarts from 'echarts';
import { useVisitData, useUserData, useDurationData } from '../../hooks';
import { symbol } from 'joi';

// 类型定义
interface ChartData {
  xAxisData: string[];
  seriesData: number[] | number[][];
  title: string;
  seriesNames?: string[];
}

// API 响应类型
interface VisitDataItem {
  date: string;
  value: number;
}

interface UserDataResponse {
  sign_users: VisitDataItem[];
  new_users: VisitDataItem[];
  stay_users: VisitDataItem[];
  active_users: VisitDataItem[];
  stay_rate: VisitDataItem[];
  transfer_rate: VisitDataItem[];
}

type TabKey = 'visits' | 'users' | 'retention' | 'duration';

// Tab 配置
const tabList = [
  {
    key: 'visits',
    tab: '访问量',
  },
  {
    key: 'users',
    tab: '用户数据',
  },
  {
    key: 'retention',
    tab: '用户留存率',
  },
  {
    key: 'duration',
    tab: '用户平均活动时长',
  },
];

// 空图表数据结构
const emptyChartData: ChartData = {
  xAxisData: [],
  seriesData: [],
  title: '',
  seriesNames: [],
};

const ChartSection: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<TabKey>('visits');
  const [chartData, setChartData] = useState<ChartData | null>(null);

  // 使用 hooks 获取 API 数据，根据当前活跃标签页按需获取
  const {
    data: visitData,
    isLoading: visitLoading,
    error: visitError,
  } = useVisitData(activeTab === 'visits');
  const {
    data: userData,
    isLoading: userLoading,
    error: userError,
  } = useUserData(activeTab === 'users' || activeTab === 'retention');
  const {
    data: durationData,
    isLoading: durationLoading,
    error: durationError,
  } = useDurationData(activeTab === 'duration');

  // 数据处理函数
  const processVisitData = (data: VisitDataItem[]): ChartData => {
    return {
      xAxisData: data.map((item) => item.date),
      seriesData: data.map((item) => item.value),
      seriesNames: ['访问量'],
      title: '',
    };
  };

  const processUserData = (data: UserDataResponse): ChartData => {
    const dates = data.active_users.map((item) => item.date);
    return {
      xAxisData: dates,
      seriesData: [
        data.active_users.map((item) => item.value),
        data.new_users.map((item) => item.value),
        data.stay_users.map((item) => item.value),
        data.sign_users.map((item) => item.value),
      ],
      seriesNames: ['活跃用户', '新增用户', '留存用户', '注册用户'],
      title: '',
    };
  };

  const processRetentionData = (data: UserDataResponse): ChartData => {
    const dates = data.stay_rate.map((item) => item.date);
    return {
      xAxisData: dates,
      seriesData: [
        data.stay_rate.map((item) => item.value * 100), // 将小数转换为百分数
        // data.transfer_rate.map((item) => item.value),
      ],
      seriesNames: ['用户留存率'],
      title: '',
    };
  };

  const processDurationData = (data: VisitDataItem[]): ChartData => {
    return {
      xAxisData: data.map((item) => item.date),
      seriesData: data.map((item) => item.value),
      seriesNames: ['用户平均活动时长 (秒)'],
      title: '',
    };
  };

  // 获取当前标签页的加载状态
  const getCurrentLoading = () => {
    switch (activeTab) {
      case 'visits':
        return visitLoading;
      case 'users':
      case 'retention':
        return userLoading;
      case 'duration':
        return durationLoading;
      default:
        return false;
    }
  };

  // 获取当前标签页的错误状态
  const getCurrentError = () => {
    switch (activeTab) {
      case 'visits':
        return visitError;
      case 'users':
      case 'retention':
        return userError;
      case 'duration':
        return durationError;
      default:
        return null;
    }
  };

  // 处理数据并设置图表数据
  const processCurrentData = () => {
    let processedData: ChartData = emptyChartData;

    try {
      switch (activeTab) {
        case 'visits':
          if (visitData && visitData.length > 0) {
            processedData = processVisitData(visitData);
          }
          break;
        case 'users':
          if (userData) {
            processedData = processUserData(userData);
          }
          break;
        case 'retention':
          if (userData) {
            processedData = processRetentionData(userData);
          }
          break;
        case 'duration':
          if (durationData && durationData.length > 0) {
            processedData = processDurationData(durationData);
          }
          break;
      }

      setChartData(processedData);
    } catch (error) {
      console.error('数据处理失败：', error);
      message.error('数据处理失败');
      setChartData(emptyChartData);
    }
  };

  // 获取当前选项卡的数据
  const getCurrentData = () => {
    return chartData || emptyChartData;
  };

  // 数据处理 useEffect
  useEffect(() => {
    processCurrentData();
  }, [activeTab, visitData, userData, durationData]);

  // 错误处理 useEffect
  useEffect(() => {
    const currentError = getCurrentError();
    if (currentError) {
      console.error('API 请求失败：', currentError);
      message.error('数据获取失败');
    }
  }, [visitError, userError, durationError, activeTab]);

  // 初始化和更新图表
  useEffect(() => {
    const currentLoading = getCurrentLoading();
    const currentData = getCurrentData();
    const hasChartData =
      currentData.xAxisData && currentData.xAxisData.length > 0;

    if (chartRef.current && !currentLoading && hasChartData) {
      const chart = echarts.init(chartRef.current);

      // 颜色配置
      const colors = [
        '#3b82f6',
        '#10b981',
        '#f59e0b',
        '#ef4444',
        '#8b5cf6',
        '#06b6d4',
      ];

      // 构建系列数据
      const buildSeries = () => {
        // 检查是否有数据
        if (!currentData.seriesData || currentData.seriesData.length === 0) {
          return [];
        }

        if (Array.isArray(currentData.seriesData[0])) {
          // 多系列数据
          return (currentData.seriesData as number[][]).map((data, index) => ({
            name: currentData.seriesNames?.[index] || `系列${index + 1}`,
            data: data,
            type: 'line',
            smooth: true,
            symbolSize: 0,
            lineStyle: {
              color: colors[index % colors.length],
              width: 2,
            },
            itemStyle: {
              color: colors[index % colors.length],
            },
          }));
        } else {
          // 单系列数据
          return [
            {
              data: currentData.seriesData as number[],
              name: currentData.seriesNames?.[0],
              type: 'line',
              smooth: true,
              symbolSize: 0,
              lineStyle: {
                color: '#3b82f6',
                width: 3,
              },
              itemStyle: {
                color: '#3b82f6',
              },
              areaStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(59, 130, 246, 0.3)',
                    },
                    {
                      offset: 1,
                      color: 'rgba(59, 130, 246, 0.05)',
                    },
                  ],
                },
              },
            },
          ];
        }
      };

      const option = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '9%',
          containLabel: true,
        },
        legend: currentData.seriesNames
          ? {
              top: '0',
              left: 'center',
              data: currentData.seriesNames,
            }
          : undefined,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
          // 为留存率图表添加百分数格式化
          formatter:
            activeTab === 'retention'
              ? (params: any) => {
                  const param = Array.isArray(params) ? params[0] : params;
                  return `${param.axisValue}<br/>${param.seriesName}: ${param.value}%`;
                }
              : undefined,
        },
        xAxis: {
          type: 'category',
          data: currentData.xAxisData,
          axisLine: {
            lineStyle: {
              color: '#e5e7eb',
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#6b7280',
          },
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: '#6b7280',
            // 为留存率图表添加百分数格式化
            formatter: activeTab === 'retention' ? '{value}%' : '{value}',
          },
          splitLine: {
            lineStyle: {
              color: '#f3f4f6',
            },
          },
        },
        series: buildSeries(),
      };

      chart.setOption(option);

      const handleResize = () => {
        chart.resize();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.dispose();
      };
    }
  }, [chartData, getCurrentLoading()]);

  // Tab 切换处理
  const handleTabChange = (key: string) => {
    setActiveTab(key as TabKey);
  };

  // 判断是否有数据
  const hasData = () => {
    const currentData = getCurrentData();
    return currentData.xAxisData && currentData.xAxisData.length > 0;
  };

  return (
    <Card
      tabList={tabList}
      activeTabKey={activeTab}
      onTabChange={handleTabChange}
      style={{ width: '100%', minHeight: '450px' }}
      tabProps={{
        size: 'middle',
      }}
      loading={getCurrentLoading()}
    >
      {hasData() ? (
        <div ref={chartRef} className="h-96 w-full"></div>
      ) : (
        <div className="flex h-96 w-full items-center justify-center">
          <div className="text-center text-gray-400">
            <div className="text-lg">暂无数据</div>
            <div className="text-sm">当前时间范围内没有相关数据</div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ChartSection;
