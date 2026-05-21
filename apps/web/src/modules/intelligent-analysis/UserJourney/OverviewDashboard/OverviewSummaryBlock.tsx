import React from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { MetricSummary, WeeklyCloseRateTrendPoint } from './types';
import { formatPercent } from './utils';

type OverviewSummaryBlockProps = {
  title: string;
  summary: MetricSummary;
  trend?: WeeklyCloseRateTrendPoint[];
  tooltip?: string;
  onBucketClick?: (
    bucket: 'total' | 'pending' | 'inProgress' | 'resolved'
  ) => void;
};

const TREND_VIEWBOX_W = 600;
const TREND_VIEWBOX_H = 196;
const TREND_PLOT_LEFT = 52;
const TREND_PLOT_RIGHT = 548;
const TREND_PLOT_TOP = 32;
const TREND_PLOT_BOTTOM = 156;
const TREND_LABEL_SAFE_TOP = 18;
const TREND_LEFT_AXIS_X = TREND_PLOT_LEFT - 8;
const TREND_RIGHT_AXIS_X = TREND_PLOT_RIGHT + 8;

const TREND_COLORS = {
  pending: '#f4840c',
  inProgress: '#4791ff',
  resolved: '#2eb78a',
  line: '#19A796',
};

const getNiceMax = (value: number): number => {
  if (!Number.isFinite(value) || value <= 0) return 10;
  if (value <= 5) return 6;

  const paddedValue = value * 1.15;
  const magnitude = 10 ** Math.floor(Math.log10(paddedValue));
  const normalized = paddedValue / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 3) return 3 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
};

const TrendChart: React.FC<{ points: WeeklyCloseRateTrendPoint[] }> = ({
  points,
}) => {
  const chartId = React.useId();
  const n = points.length;
  if (n === 0) return null;
  const maxTotal = Math.max(0, ...points.map((p) => p.total));
  const yMax = getNiceMax(maxTotal);
  const plotH = TREND_PLOT_BOTTOM - TREND_PLOT_TOP;
  const plotW = TREND_PLOT_RIGHT - TREND_PLOT_LEFT;
  const step = n > 0 ? plotW / n : plotW;
  const barW = Math.min(36, step * 0.48);

  const xCenter = (index: number) => TREND_PLOT_LEFT + step * (index + 0.5);
  const yForCount = (value: number) =>
    TREND_PLOT_BOTTOM - (Math.max(0, value) / yMax) * plotH;
  const yForRate = (value: number) =>
    TREND_PLOT_BOTTOM - (Math.max(0, Math.min(100, value)) / 100) * plotH;

  const yTextMin = TREND_LABEL_SAFE_TOP;
  const ratePointYs = points.map((p) => yForRate(p.closeRate));
  const rateLabelYs = ratePointYs.map((y) => Math.max(yTextMin, y - 16));
  const totalTopYs = points.map((p) => yForCount(p.total));
  const totalLabelYs = totalTopYs.map((y) => Math.max(yTextMin, y - 8));
  const showRateLabel = points.map((p) => p.closeRate > 0);
  const showTotalLabel = points.map((p, index) => {
    if (p.total <= 0) return false;
    if (!showRateLabel[index]) return true;
    return Math.abs(totalLabelYs[index] - rateLabelYs[index]) >= 18;
  });

  const ticks = [
    yMax,
    Math.round((yMax * 3) / 4),
    Math.round(yMax / 2),
    Math.round(yMax / 4),
    0,
  ];
  const gridYs = ticks.map((t) => yForCount(t));

  const polylinePoints = points
    .map((p, index) => `${xCenter(index)},${yForRate(p.closeRate)}`)
    .join(' ');
  const areaPoints = `${TREND_PLOT_LEFT},${TREND_PLOT_BOTTOM} ${polylinePoints} ${xCenter(
    n - 1
  )},${TREND_PLOT_BOTTOM}`;

  return (
    <svg
      className="oj-trend-svg"
      viewBox={`0 0 ${TREND_VIEWBOX_W} ${TREND_VIEWBOX_H}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id={`${chartId}-line-gradient`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor={TREND_COLORS.line} />
        </linearGradient>
        <linearGradient
          id={`${chartId}-area-gradient`}
          x1="0%"
          y1="0%"
          x2="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="rgba(25, 167, 150, 0.22)" />
          <stop offset="100%" stopColor="rgba(25, 167, 150, 0.02)" />
        </linearGradient>
      </defs>
      <rect
        x={TREND_PLOT_LEFT}
        y={TREND_PLOT_TOP}
        width={plotW}
        height={plotH}
        rx={0}
        className="oj-trend-plot-bg"
      />
      {ticks.slice(0, 4).map((t, i) => {
        const y = yForCount(t);
        const nextY =
          i < ticks.length - 1 ? yForCount(ticks[i + 1]) : TREND_PLOT_BOTTOM;
        return (
          <rect
            key={`band-${i}`}
            x={TREND_PLOT_LEFT}
            y={y}
            width={plotW}
            height={nextY - y}
            className={
              i % 2 === 0
                ? 'oj-trend-band oj-trend-band-strong'
                : 'oj-trend-band'
            }
          />
        );
      })}
      {gridYs.slice(0, 4).map((y, i) => (
        <line
          key={`g-${i}`}
          x1={TREND_PLOT_LEFT}
          y1={y}
          x2={TREND_PLOT_RIGHT}
          y2={y}
          className="oj-trend-grid"
        />
      ))}
      <line
        x1={TREND_PLOT_LEFT}
        y1={TREND_PLOT_BOTTOM}
        x2={TREND_PLOT_RIGHT}
        y2={TREND_PLOT_BOTTOM}
        className="oj-trend-axis-line"
      />
      <line
        x1={TREND_PLOT_LEFT}
        y1={TREND_PLOT_TOP}
        x2={TREND_PLOT_LEFT}
        y2={TREND_PLOT_BOTTOM}
        className="oj-trend-axis-line"
      />
      <line
        x1={TREND_PLOT_RIGHT}
        y1={TREND_PLOT_TOP}
        x2={TREND_PLOT_RIGHT}
        y2={TREND_PLOT_BOTTOM}
        className="oj-trend-axis-line"
      />

      {ticks.map((t, i) => (
        <text
          key={`yl-${i}`}
          className="oj-trend-axis oj-trend-axis-y"
          x={TREND_LEFT_AXIS_X}
          y={yForCount(t) + 4}
          textAnchor="end"
        >
          {t}
        </text>
      ))}
      <text
        className="oj-trend-axis-title oj-trend-axis-title-y"
        x={TREND_LEFT_AXIS_X}
        y={16}
        textAnchor="end"
      >
        问题数
      </text>

      {[100, 75, 50, 25, 0].map((t, i) => (
        <text
          key={`yr-${i}`}
          className="oj-trend-axis oj-trend-axis-y"
          x={TREND_RIGHT_AXIS_X}
          y={yForRate(t) + 4}
        >
          {t}%
        </text>
      ))}
      <text
        className="oj-trend-axis-title oj-trend-axis-title-y"
        x={TREND_RIGHT_AXIS_X}
        y={16}
        textAnchor="start"
      >
        闭环率
      </text>

      <polygon
        points={areaPoints}
        fill={`url(#${chartId}-area-gradient)`}
        className="oj-trend-rate-area"
      />

      {points.map((p, index) => {
        const x = xCenter(index);
        const x0 = x - barW / 2;
        let currentY = TREND_PLOT_BOTTOM;
        const segments: Array<[keyof typeof TREND_COLORS, number]> = [
          ['resolved', p.resolved],
          ['inProgress', p.inProgress],
          ['pending', p.pending],
        ];
        const rects = segments.map(([key, value]) => {
          const h = (Math.max(0, value) / yMax) * plotH;
          if (h <= 0) return null;
          currentY -= h;
          return (
            <rect
              key={`${key}-${index}`}
              x={x0}
              y={currentY}
              width={barW}
              height={h}
              fill={TREND_COLORS[key]}
              rx={0}
              className="oj-trend-bar"
            />
          );
        });

        return (
          <g key={`b-${index}`}>
            {rects}
            {showTotalLabel[index] ? (
              <text
                className="oj-trend-val"
                x={x}
                y={totalLabelYs[index]}
                textAnchor="middle"
              >
                {p.total}
              </text>
            ) : null}
          </g>
        );
      })}

      <polyline
        points={polylinePoints}
        fill="none"
        stroke={`url(#${chartId}-line-gradient)`}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="oj-trend-line-path"
      />

      {points.map((p, index) => {
        const x = xCenter(index);
        const y = ratePointYs[index];
        const shouldLabel = showRateLabel[index];
        return (
          <g key={`p-${index}`}>
            <circle
              cx={x}
              cy={y}
              r={2.5}
              fill="#fff"
              stroke={TREND_COLORS.line}
              strokeWidth={2}
            />
            {shouldLabel ? (
              <text
                className="oj-trend-val oj-trend-val-green"
                x={x}
                y={rateLabelYs[index]}
                textAnchor="middle"
              >
                {formatPercent(p.closeRate)}
              </text>
            ) : null}
          </g>
        );
      })}

      {points.map((p, index) => (
        <text
          key={`x-${index}`}
          className="oj-trend-axis"
          x={xCenter(index)}
          y={182}
          textAnchor="middle"
        >
          {p.label}
        </text>
      ))}
    </svg>
  );
};

const OverviewSummaryBlock: React.FC<OverviewSummaryBlockProps> = ({
  title,
  summary,
  trend,
  tooltip,
  onBucketClick,
}) => {
  const renderValue = (
    bucket: 'total' | 'pending' | 'inProgress' | 'resolved',
    value: number,
    className = ''
  ) => {
    const clickableProps: React.HTMLAttributes<HTMLDivElement> | undefined =
      onBucketClick
        ? {
            role: 'button',
            tabIndex: 0,
            onClick: () => onBucketClick(bucket),
            onKeyDown: (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                onBucketClick(bucket);
              }
            },
          }
        : undefined;

    return (
      <div
        className={`ov-value ${
          onBucketClick ? 'ov-value-link' : ''
        } ${className}`.trim()}
        {...clickableProps}
      >
        {value}
      </div>
    );
  };

  return (
    <div className="overview-block">
      <div className="ov-title flex items-center gap-1.5">
        <span>{title}</span>
        {tooltip ? (
          <Tooltip title={tooltip}>
            <InfoCircleOutlined className="cursor-help text-[13px] text-slate-400 transition-colors hover:text-slate-600" />
          </Tooltip>
        ) : null}
      </div>
      <div className="ov-row">
        <div className="ov-item">
          <div className="ov-label">总问题数</div>
          {renderValue('total', summary.total)}
        </div>
        <div className="ov-item">
          <div className="ov-label">待处理</div>
          {renderValue('pending', summary.pending, 'ov-value-pending')}
        </div>
        <div className="ov-item">
          <div className="ov-label">进行中</div>
          {renderValue('inProgress', summary.inProgress, 'ov-value-blue')}
        </div>
        <div className="ov-item">
          <div className="ov-label">已闭环</div>
          {renderValue('resolved', summary.resolved, 'ov-value-green')}
        </div>
        <div className="ov-item">
          <div className="ov-label">闭环率</div>
          <div className="ov-value">{formatPercent(summary.closeRate)}</div>
        </div>
      </div>
      {trend && trend.length ? (
        <div className="oj-trend-block">
          <TrendChart points={trend} />
          <div className="oj-trend-legend">
            <span className="oj-trend-legend-item">
              <i
                className="oj-trend-dot"
                style={{ background: TREND_COLORS.pending }}
              />
              待处理
            </span>
            <span className="oj-trend-legend-item">
              <i
                className="oj-trend-dot"
                style={{ background: TREND_COLORS.inProgress }}
              />
              进行中
            </span>
            <span className="oj-trend-legend-item">
              <i
                className="oj-trend-dot"
                style={{ background: TREND_COLORS.resolved }}
              />
              已闭环
            </span>
            <span className="oj-trend-legend-item">
              <span className="oj-trend-line" />
              周度闭环率
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OverviewSummaryBlock;
