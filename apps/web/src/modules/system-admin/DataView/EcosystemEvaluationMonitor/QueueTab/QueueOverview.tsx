import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, Alert } from 'antd';
import * as echarts from 'echarts';
import {
  useQueueChartData,
  QueueChartParams,
} from '@modules/system-admin/hooks/useQueueChartApi';

// 图表数据类型
interface ChartData {
  xAxisData: string[];
  seriesData: number[][];
  seriesNames: string[];
}

// Tab类型
type ChartTabKey =
  | 'all'
  | 'repo'
  | 'group'
  | 'repo_high_priority'
  | 'group_high_priority';

// Tab配置
const chartTabList = [
  { key: 'all', tab: '所有队列' },
  { key: 'repo', tab: '仓库队列' },
  { key: 'group', tab: '社区队列' },
  { key: 'repo_high_priority', tab: '仓库优先队列' },
  { key: 'group_high_priority', tab: '社区优先队列' },
];

const QueueOverview: React.FC = () => {
  const [activeChartTab, setActiveChartTab] = useState<ChartTabKey>('all');
  const chartRef = useRef<HTMLDivElement>(null);

  // 生成API请求参数
  const chartParams: QueueChartParams = useMemo(() => {
    return {
      begin_date: '2010-02-22',
      end_date: '2026-03-22',
      queue_type: activeChartTab === 'all' ? '0' : activeChartTab,
      is_all: activeChartTab === 'all' ? 1 : 0,
    };
  }, [activeChartTab]);

  // 获取图表数据
  const { data: chartData, isLoading, error } = useQueueChartData(chartParams);

  // 处理图表数据
  const processedChartData: ChartData = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      // 默认数据结构
      return {
        xAxisData: [],
        seriesData: [[], [], []],
        seriesNames: ['项目加入数量', '项目消费数量', '项目总数量'],
      };
    }

    // 按日期排序
    const sortedData = [...chartData].sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );

    const xAxisData = sortedData.map((item) => {
      const date = new Date(item.created_at);
      return date.toLocaleDateString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
      });
    });

    const joinData = sortedData.map((item) => item.join_count);
    const consumeData = sortedData.map((item) => item.consume_count);
    const totalData = sortedData.map((item) => item.total_count);

    return {
      xAxisData,
      seriesData: [joinData, consumeData, totalData],
      seriesNames: ['项目加入数量', '项目消费数量', '项目总数量'],
    };
  }, [chartData]);

  // 图表初始化和更新
  useEffect(() => {
    if (chartRef.current && !isLoading) {
      const chart = echarts.init(chartRef.current);

      // 颜色配置
      const colors = ['#3b82f6', '#10b981', '#f59e0b'];

      const option = {
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '12%',
          containLabel: true,
        },
        legend: {
          top: '0',
          left: 'center',
          data: processedChartData.seriesNames,
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985',
            },
          },
        },
        xAxis: {
          type: 'category',
          data: processedChartData.xAxisData,
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
          },
          splitLine: {
            lineStyle: {
              color: '#f3f4f6',
            },
          },
        },
        series: processedChartData.seriesData.map((data, index) => ({
          name: processedChartData.seriesNames[index],
          data: data,
          type: 'line',
          smooth: true,
          symbolSize: 6,
          lineStyle: {
            color: colors[index],
            width: 2,
          },
          itemStyle: {
            color: colors[index],
          },
        })),
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
  }, [processedChartData, isLoading]);

  // Tab切换处理
  const handleChartTabChange = (key: string) => {
    setActiveChartTab(key as ChartTabKey);
  };

  // 错误处理
  if (error) {
    return (
      <Card
        title="队列趋势分析"
        className="mt-4"
        tabList={chartTabList}
        activeTabKey={activeChartTab}
        onTabChange={handleChartTabChange}
      >
        <Alert
          message="获取图表数据失败"
          description={error instanceof Error ? error.message : '未知错误'}
          type="error"
          showIcon
        />
      </Card>
    );
  }

  return (
    <Card
      title="队列趋势分析"
      className="mt-4 min-h-[547px]"
      tabList={chartTabList}
      activeTabKey={activeChartTab}
      onTabChange={handleChartTabChange}
      loading={isLoading}
    >
      <div
        ref={chartRef}
        style={{
          width: '100%',
          height: '400px',
          minHeight: '400px',
        }}
      />
    </Card>
  );
};

export default QueueOverview;
