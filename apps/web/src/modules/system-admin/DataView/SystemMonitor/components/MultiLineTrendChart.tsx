import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Card, Spin } from 'antd';
import * as echarts from 'echarts';
import type { DateRangeType } from '@common/components/DateRangePicker';

interface SeriesData {
  name: string;
  data: { time: string; value: number }[];
  color: string;
}

interface MultiLineTrendChartProps {
  series: SeriesData[];
  title: string;
  unit: string;
  dateRange: DateRangeType;
  loading?: boolean;
}

export interface MultiLineTrendChartRef {
  dispose: () => void;
}

const MultiLineTrendChart = forwardRef<
  MultiLineTrendChartRef,
  MultiLineTrendChartProps
>(({ series, title, unit, dateRange, loading = false }, ref) => {
  const chartRef = useRef<echarts.ECharts | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const disposeChart = () => {
    if (chartRef.current && !chartRef.current.isDisposed()) {
      try {
        chartRef.current.dispose();
        chartRef.current = null;
      } catch (error) {
        console.warn('Error disposing chart:', error);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    dispose: disposeChart,
  }));

  // 组件卸载时清理图表
  useEffect(() => {
    return () => {
      disposeChart();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // 如果正在加载，清理现有图表但不创建新的
    if (loading) {
      if (chartRef.current && !chartRef.current.isDisposed()) {
        try {
          chartRef.current.dispose();
        } catch (error) {
          console.warn('Error disposing chart during loading:', error);
        }
        chartRef.current = null;
      }
      return;
    }

    // 清理现有图表实例
    if (chartRef.current && !chartRef.current.isDisposed()) {
      try {
        chartRef.current.dispose();
      } catch (error) {
        console.warn('Error disposing existing chart:', error);
      }
      chartRef.current = null;
    }

    // 创建新的图表实例
    try {
      chartRef.current = echarts.init(containerRef.current);
    } catch (error) {
      console.error('Error initializing chart:', error);
      return;
    }

    // 如果没有数据，显示空状态
    if (series.length === 0 || series.every((s) => s.data.length === 0)) {
      const emptyOption = {
        title: {
          text: title,
          textStyle: {
            fontSize: 14,
            fontWeight: 'normal',
          },
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: 'middle',
          style: {
            text: '暂无数据',
            fontSize: 14,
            fill: '#999',
          },
        },
      };
      chartRef.current.setOption(emptyOption);
      return;
    }

    // 获取所有时间点（取第一个有数据的系列作为时间轴基准）
    const firstSeriesWithData = series.find((s) => s.data.length > 0);
    if (!firstSeriesWithData) return;

    const timeLabels = firstSeriesWithData.data.map((item) => {
      const date = new Date(item.time);
      // 格式化为小时显示
      return `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:00`;
    });

    const option = {
      title: {
        text: title,
        textStyle: {
          fontSize: 14,
          fontWeight: 'normal',
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          if (!params || params.length === 0) return '';

          const dataIndex = params[0].dataIndex;
          const time = new Date(
            firstSeriesWithData.data[dataIndex]?.time || ''
          );
          const timeStr = `${time.getFullYear()}/${
            time.getMonth() + 1
          }/${time.getDate()} ${time.getHours()}:00`;

          let tooltipContent = `${timeStr}<br/>`;
          params.forEach((param: any) => {
            tooltipContent += `${param.seriesName}: ${param.value}${unit}<br/>`;
          });

          return tooltipContent;
        },
      },
      legend: {
        data: series.map((s) => s.name),
        bottom: 0,
      },
      xAxis: {
        type: 'category',
        data: timeLabels,
        axisLabel: {
          fontSize: 11,
          rotate: timeLabels.length > 15 ? 30 : 0,
          interval: Math.max(0, Math.floor(timeLabels.length / 8)), // 优化显示间隔
          margin: 8, // 增加标签与轴线的距离
          color: '#666',
        },
        axisLine: {
          lineStyle: {
            color: '#e8e8e8',
          },
        },
        axisTick: {
          lineStyle: {
            color: '#e8e8e8',
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 10,
          formatter: `{value}${unit}`,
        },
      },
      series: series.map((seriesItem) => ({
        name: seriesItem.name,
        data: seriesItem.data.map((item) => item.value),
        type: 'line',
        smooth: true,
        lineStyle: {
          color: seriesItem.color,
        },
        itemStyle: {
          color: seriesItem.color,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: seriesItem.color + '40' },
              { offset: 1, color: seriesItem.color + '10' },
            ],
          },
        },
      })),
      grid: {
        left: '3%',
        right: '3%',
        bottom: '15%', // 增加底部空间给图例
        top: '14%',
        containLabel: true, // 确保标签完全显示在网格内
      },
    };

    chartRef.current.setOption(option);
  }, [series, title, unit, dateRange, loading]);

  return (
    <Card>
      <div
        ref={containerRef}
        style={{
          width: '100%',
          height: '250px',
          display: loading ? 'none' : 'block',
        }}
      />
      {loading && (
        <div
          style={{
            width: '100%',
            height: '250px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Spin size="large" tip="加载中..." />
        </div>
      )}
    </Card>
  );
});

MultiLineTrendChart.displayName = 'MultiLineTrendChart';

export default MultiLineTrendChart;
