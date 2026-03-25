import React from 'react';
import MiniTrendChart from 'src/common/components/EChartX/MiniTrendChart';
import { MetricTrend, Tone } from '../types';

const getMetricTrendPalette = (tone: Tone) => {
  switch (tone) {
    case 'critical':
      return {
        stroke: '#ef4444',
        fill: 'rgba(239, 68, 68, 0.12)',
        point: '#dc2626',
      };
    case 'warning':
      return {
        stroke: '#f59e0b',
        fill: 'rgba(245, 158, 11, 0.14)',
        point: '#d97706',
      };
    case 'positive':
      return {
        stroke: '#10b981',
        fill: 'rgba(16, 185, 129, 0.14)',
        point: '#059669',
      };
    default:
      return {
        stroke: '#64748b',
        fill: 'rgba(100, 116, 139, 0.12)',
        point: '#475569',
      };
  }
};

const formatTrendValue = (value: number, trend: MetricTrend) => {
  const normalizedValue = trend.integerAxis
    ? Math.round(value).toString()
    : Number.isInteger(value) || Math.abs(value) >= 10
    ? value.toFixed(0)
    : value.toFixed(1);

  return `${normalizedValue}${trend.joiner ?? (trend.unit === '%' ? '' : ' ')}${
    trend.unit
  }`;
};

type MetricTrendChartProps = {
  trend: MetricTrend;
  tone: Tone;
};

const MetricTrendChart: React.FC<MetricTrendChartProps> = ({ trend, tone }) => {
  const palette = getMetricTrendPalette(tone);

  return (
    <div className="mt-4 rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3 py-3">
      <div className="flex items-center justify-between text-[11px] text-slate-400">
        <span>最近五次趋势</span>
        <span>单位：{trend.unit}</span>
      </div>
      <div className="mt-3">
        <MiniTrendChart
          values={trend.values}
          xLabels={trend.values.map((_, index) => `${index + 1}`)}
          color={palette.stroke}
          areaColor={palette.fill}
          pointColor={palette.point}
          integerAxis={trend.integerAxis}
          minValue={trend.clampMin}
          maxValue={trend.clampMax}
          formatValue={(value) => formatTrendValue(value, trend)}
        />
      </div>
    </div>
  );
};

export default MetricTrendChart;
