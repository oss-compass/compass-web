import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Card, Alert } from 'antd';
import * as echarts from 'echarts';
import {
  useTpcQueueChartData,
  TpcQueueChartParams,
} from '@modules/system-admin/hooks/useTpcQueueChartApi';
import CommonDateRangePicker, {
  DateRangeType,
} from '@common/components/DateRangePicker';

// 图表数据类型
interface ChartData {
  xAxisData: string[];
  seriesData: number[][];
  seriesNames: string[];
}

// Tab类型
type ChartTabKey = 'all' | 'tpc' | 'tpc_high_priority';

// Tab配置
const chartTabList = [
  { key: 'all', tab: '所有队列' },
  { key: 'tpc', tab: 'TPC队列' },
  { key: 'tpc_high_priority', tab: 'TPC优先队列' },
];

const QueueOverview: React.FC = () => {
  const [activeChartTab, setActiveChartTab] = useState<ChartTabKey>('all');
  const [dateRange, setDateRange] = useState<DateRangeType>('1M');
  const [customDateRange, setCustomDateRange] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const chartRef = useRef<HTMLDivElement>(null);

  // 计算实际的日期范围
  const getActualDateRange = (): { begin_date: string; end_date: string } => {
    const now = new Date();
    const endDate = now.toISOString().split('T')[0];
    
    if (dateRange === 'custom' && customDateRange) {
      return {
        begin_date: customDateRange.start,
        end_date: customDateRange.end,
      };
    }

    let beginDate: Date;
    switch (dateRange) {
      case '1M':
        beginDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case '3M':
        beginDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case '6M':
        beginDate = new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
        break;
      case '1Y':
        beginDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      case '3Y':
        beginDate = new Date(now.getFullYear() - 3, now.getMonth(), now.getDate());
        break;
      case '5Y':
        beginDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
        break;
      case 'Since 2000':
        beginDate = new Date(2000, 0, 1);
        break;
      default:
        beginDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    }

    return {
      begin_date: beginDate.toISOString().split('T')[0],
      end_date: endDate,
    };
  };

  // 生成API请求参数
  const chartParams: TpcQueueChartParams = useMemo(() => {
    const { begin_date, end_date } = getActualDateRange();
    return {
      begin_date,
      end_date,
      queue_type: activeChartTab === 'all' ? '0' : activeChartTab,
      is_all: activeChartTab === 'all' ? 1 : 0,
    };
  }, [activeChartTab, dateRange, customDateRange]);

  // 获取图表数据
  const {
    data: chartData,
    isLoading,
    error,
  } = useTpcQueueChartData(chartParams);

  // 处理日期范围变更
  const handleDateRangeChange = (
    range: DateRangeType,
    customRange?: { start: string; end: string }
  ) => {
    setDateRange(range);
    if (range === 'custom' && customRange) {
      setCustomDateRange(customRange);
    }
  };

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

  // 初始化图表
  useEffect(() => {
    const initChart = () => {
      if (chartRef.current && !isLoading) {
        const container = chartRef.current;

        // 检查容器尺寸
        if (container.clientWidth === 0 || container.clientHeight === 0) {
          setTimeout(initChart, 100);
          return;
        }

        const chart = echarts.init(container);

        const option = {
          title: {
            text: 'TPC队列趋势图',
            left: 'center',
            textStyle: {
              fontSize: 16,
              fontWeight: 'bold',
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: processedChartData.seriesNames,
            bottom: 10,
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            data: processedChartData.xAxisData,
            axisLine: {
              lineStyle: {
                color: '#e8e8e8',
              },
            },
            axisLabel: {
              color: '#666',
            },
          },
          yAxis: {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#e8e8e8',
              },
            },
            axisLabel: {
              color: '#666',
            },
            splitLine: {
              lineStyle: {
                color: '#f0f0f0',
              },
            },
          },
          series: processedChartData.seriesNames.map((name, index) => ({
            name,
            type: 'line',
            data: processedChartData.seriesData[index],
            smooth: true,
            lineStyle: {
              width: 2,
            },
            symbol: 'circle',
            symbolSize: 6,
          })),
        };

        chart.setOption(option);

        // 清理函数
        return () => {
          chart.dispose();
        };
      }
    };

    const cleanup = initChart();
    return cleanup;
  }, [processedChartData, isLoading]);

  // 错误处理
  if (error) {
    return (
      <Card
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>TPC队列趋势分析</span>
            <CommonDateRangePicker
              value={dateRange}
              onChange={handleDateRangeChange}
            />
          </div>
        }
        tabList={chartTabList}
        activeTabKey={activeChartTab}
        onTabChange={(key) => setActiveChartTab(key as ChartTabKey)}
        className="mt-4 min-h-[547px]"
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
      title={
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>TPC队列趋势分析</span>
          <CommonDateRangePicker
            value={dateRange}
            onChange={handleDateRangeChange}
          />
        </div>
      }
      tabList={chartTabList}
      activeTabKey={activeChartTab}
      onTabChange={(key) => setActiveChartTab(key as ChartTabKey)}
      loading={isLoading}
      className="mt-4 min-h-[547px]"
    >
      <div
        style={{
          width: '100%',
          height: '400px',
          minHeight: '400px',
          position: 'relative',
        }}
      >
        <div
          ref={chartRef}
          style={{
            width: '100%',
            height: '100%',
            display: isLoading ? 'none' : 'block',
          }}
        />
        {isLoading && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fafafa',
              color: '#666',
            }}
          >
            加载中...
          </div>
        )}
      </div>
    </Card>
  );
};
export default QueueOverview;
