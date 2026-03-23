import React, { useEffect, useRef } from 'react';
import { init } from 'echarts';
import type { ECharts, EChartsOption } from 'echarts';

type MiniTrendChartProps = {
  values: number[];
  color: string;
  areaColor: string;
  pointColor: string;
  width?: string;
  height?: string;
  xLabels?: string[];
  formatValue?: (value: number) => string;
  integerAxis?: boolean;
  minValue?: number;
  maxValue?: number;
};

const MiniTrendChart: React.FC<MiniTrendChartProps> = ({
  values,
  color,
  areaColor,
  pointColor,
  width = '100%',
  height = '110px',
  xLabels,
  formatValue,
  integerAxis = false,
  minValue,
  maxValue,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }

    const chart: ECharts = init(chartRef.current);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const range = rawMax - rawMin;
    const padding =
      range === 0 ? Math.max(1, Math.abs(rawMax) * 0.1) : range * 0.15;
    const roughAxisMin = rawMin - padding;
    const roughAxisMax = rawMax + padding;
    const boundedMin =
      typeof minValue === 'number'
        ? Math.max(minValue, roughAxisMin)
        : roughAxisMin;
    const boundedMax =
      typeof maxValue === 'number'
        ? Math.min(maxValue, roughAxisMax)
        : roughAxisMax;
    const axisMin = integerAxis ? Math.floor(boundedMin) : boundedMin;
    const axisMax = integerAxis ? Math.ceil(boundedMax) : boundedMax;
    const axisInterval = integerAxis
      ? Math.max(1, Math.round((axisMax - axisMin) / 2))
      : (axisMax - axisMin) / 2 || 1;

    const option: EChartsOption = {
      animation: false,
      grid: {
        top: 10,
        left: 38,
        right: 8,
        bottom: 22,
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderWidth: 0,
        padding: [6, 10],
        textStyle: {
          color: '#fff',
          fontSize: 11,
        },
        formatter: (params: any) => {
          const target = Array.isArray(params) ? params[0] : params;
          const axisLabel = target?.axisValueLabel ?? '';
          const value = Number(target?.data ?? 0);
          return `${axisLabel}: ${
            formatValue ? formatValue(value) : value.toString()
          }`;
        },
      },
      xAxis: {
        type: 'category',
        data: xLabels ?? values.map((_, index) => `${index + 1}`),
        boundaryGap: false,
        axisTick: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: '#cbd5e1',
          },
        },
        axisLabel: {
          color: '#94a3b8',
          fontSize: 10,
          margin: 8,
        },
      },
      yAxis: {
        type: 'value',
        min: axisMin,
        max: axisMax,
        interval: axisInterval,
        splitNumber: 2,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: '#94a3b8',
          fontSize: 10,
          formatter: (value: number) =>
            formatValue ? formatValue(Number(value)) : `${value}`,
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(226, 232, 240, 0.95)',
            type: [4, 4],
            width: 1,
            cap: 'butt',
          },
        },
      },
      series: [
        {
          type: 'line',
          data: values,
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          showSymbol: true,
          lineStyle: {
            color,
            width: 2.5,
          },
          itemStyle: {
            color: pointColor,
            borderColor: '#ffffff',
            borderWidth: 1.5,
          },
          areaStyle: {
            color: areaColor,
          },
        },
      ],
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
  }, [
    areaColor,
    color,
    formatValue,
    integerAxis,
    maxValue,
    minValue,
    pointColor,
    values,
    xLabels,
  ]);

  return <div ref={chartRef} style={{ width, height }} />;
};

export default React.memo(MiniTrendChart);
