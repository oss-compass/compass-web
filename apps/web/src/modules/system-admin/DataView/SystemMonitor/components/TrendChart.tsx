import React, { useEffect } from 'react';
import { Card } from 'antd';
import * as echarts from 'echarts';
import { DateRangeType } from '../types';
import { getDaysByRange, generateDateLabels } from '../utils/dataUtils';

interface TrendChartProps {
  id: string;
  data: number[];
  title: string;
  color: string;
  unit: string;
  dateRange: DateRangeType;
}

const TrendChart: React.FC<TrendChartProps> = ({
  id,
  data,
  title,
  color,
  unit,
  dateRange,
}) => {
  useEffect(() => {
    const container = document.getElementById(id);
    if (container) {
      const chart = echarts.init(container);
      const days = getDaysByRange(dateRange);
      const labels = generateDateLabels(days);

      // 根据日期范围调整数据
      const chartData = data.slice(-days);

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
          formatter: `{b}: {c}${unit}`,
        },
        xAxis: {
          type: 'category',
          data: labels,
          axisLabel: {
            fontSize: 10,
            rotate: dateRange === '1y' ? 45 : 0,
          },
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 10,
            formatter: `{value}${unit}`,
          },
        },
        series: [
          {
            data: chartData,
            type: 'line',
            smooth: true,
            lineStyle: {
              color: color,
            },
            itemStyle: {
              color: color,
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  { offset: 0, color: color + '40' },
                  { offset: 1, color: color + '10' },
                ],
              },
            },
          },
        ],
        grid: {
          left: '10%',
          right: '5%',
          bottom: '15%',
          top: '20%',
        },
      };

      chart.setOption(option);

      return () => chart.dispose();
    }
  }, [id, data, title, color, unit, dateRange]);

  return (
    <Card>
      <div id={id} style={{ width: '100%', height: '200px' }} />
    </Card>
  );
};

export default TrendChart;
