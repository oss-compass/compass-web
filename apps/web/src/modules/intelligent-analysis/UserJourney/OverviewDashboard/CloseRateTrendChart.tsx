import React from 'react';
import type { CloseRateTrendPoint } from './closeRateTrend';
import { OJ_TREND_COLORS, OJ_TREND_SEVERITY_SEGMENTS } from './constants';
import { formatPercent } from './utils';

type CloseRateSparklineProps = {
  values: Array<number | null>;
  width?: number;
  height?: number;
  stroke?: string;
};

const buildLinePath = (
  points: Array<{ x: number; y: number }>
): string | null => {
  if (points.length === 0) return null;
  const d: string[] = [`M ${points[0].x} ${points[0].y}`];
  for (let i = 1; i < points.length; i += 1) {
    d.push(`L ${points[i].x} ${points[i].y}`);
  }
  return d.join(' ');
};

export const CloseRateSparkline: React.FC<CloseRateSparklineProps> = ({
  values,
  width = 50,
  height = 30,
  stroke = OJ_TREND_COLORS.line,
}) => {
  const gradientId = React.useId();
  const w = Math.max(10, width);
  const h = Math.max(10, height);
  const padding = 2;
  const innerW = w - padding * 2;
  const innerH = h - padding * 2;
  const n = values.length;
  const step = n > 1 ? innerW / (n - 1) : 0;

  const segments: Array<Array<{ x: number; y: number }>> = [];
  let current: Array<{ x: number; y: number }> = [];

  values.forEach((value, idx) => {
    const x = padding + step * idx;
    if (value == null || !Number.isFinite(value)) {
      if (current.length) segments.push(current);
      current = [];
      return;
    }
    const clamped = Math.max(0, Math.min(100, value));
    const y = padding + innerH - (clamped / 100) * innerH;
    current.push({ x, y });
  });
  if (current.length) segments.push(current);

  const segmentPaths = segments
    .map((segment) => {
      const path = buildLinePath(segment);
      if (!path) return null;
      return {
        path,
        firstX: segment[0].x,
        lastX: segment[segment.length - 1].x,
      };
    })
    .filter(Boolean) as Array<{ path: string; firstX: number; lastX: number }>;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ display: 'block' }}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.22" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {segmentPaths.map((segment, index) => {
        const baselineY = padding + innerH;
        const area = `${segment.path} L ${segment.lastX} ${baselineY} L ${segment.firstX} ${baselineY} Z`;
        return (
          <g key={`${segment.path}-${index}`}>
            <path d={area} fill={`url(#${gradientId})`} />
            <path
              d={segment.path}
              fill="none"
              stroke={stroke}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
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

const RATE_VIEWBOX_W = 600;
const RATE_VIEWBOX_H = 196;
const RATE_PLOT_LEFT = 52;
const RATE_PLOT_RIGHT = 548;
const RATE_PLOT_TOP = 32;
const RATE_PLOT_BOTTOM = 156;
const RATE_LABEL_SAFE_TOP = 18;
const RATE_LEFT_AXIS_X = RATE_PLOT_LEFT - 8;
const RATE_RIGHT_AXIS_X = RATE_PLOT_RIGHT + 8;
const RATE_TOOLTIP_HALF_WIDTH = 92;

type CloseRateTrendChartProps = {
  points: CloseRateTrendPoint[];
  height?: number;
};

export const CloseRateTrendChart: React.FC<CloseRateTrendChartProps> = ({
  points,
  height = 260,
}) => {
  const chartId = React.useId();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ left: 0, top: 0 });
  const n = points.length;
  if (n === 0) return null;
  const maxTotal = Math.max(0, ...points.map((p) => p.total));
  const yMax = getNiceMax(maxTotal);
  const plotH = RATE_PLOT_BOTTOM - RATE_PLOT_TOP;
  const plotW = RATE_PLOT_RIGHT - RATE_PLOT_LEFT;
  const step = n > 0 ? plotW / n : plotW;
  const barW = Math.min(36, step * 0.48);
  const xCenter = (index: number) => RATE_PLOT_LEFT + step * (index + 0.5);
  const yForCount = (value: number) =>
    RATE_PLOT_BOTTOM - (Math.max(0, value) / yMax) * plotH;
  const yForRate = (value: number) =>
    RATE_PLOT_BOTTOM - (Math.max(0, Math.min(100, value)) / 100) * plotH;

  const yTextMin = RATE_LABEL_SAFE_TOP;
  const ratePointYs = points.map((p) => yForRate(p.closeRate ?? 0));
  const rateLabelYs = ratePointYs.map((y) => Math.max(yTextMin, y - 16));
  const totalTopYs = points.map((p) => yForCount(p.total));
  const totalLabelYs = totalTopYs.map((y) => Math.max(yTextMin, y - 8));
  const showRateLabel = points.map((p) => (p.closeRate ?? 0) > 0);
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
    .map((p, index) => `${xCenter(index)},${yForRate(p.closeRate ?? 0)}`)
    .join(' ');
  const areaPoints = `${RATE_PLOT_LEFT},${RATE_PLOT_BOTTOM} ${polylinePoints} ${xCenter(
    n - 1
  )},${RATE_PLOT_BOTTOM}`;

  const formatTrendRange = (point: CloseRateTrendPoint): string => {
    if (point.weekStart && point.weekEnd) {
      return `${point.weekStart} - ${point.weekEnd}`;
    }
    return point.label;
  };

  const updateTooltip = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const leftPx = (xCenter(index) / RATE_VIEWBOX_W) * rect.width;
    const topPx =
      (Math.min(ratePointYs[index], totalTopYs[index]) / RATE_VIEWBOX_H) *
      rect.height;
    setTooltipPos({
      left: Math.min(
        Math.max(leftPx, RATE_TOOLTIP_HALF_WIDTH),
        rect.width - RATE_TOOLTIP_HALF_WIDTH
      ),
      top: Math.max(topPx, 18),
    });
  };

  const handleActivate = (index: number) => {
    setActiveIndex(index);
    updateTooltip(index);
  };

  const activePoint = activeIndex == null ? null : points[activeIndex];
  const activeX = activeIndex == null ? null : xCenter(activeIndex);
  const getSeverityValue = (
    point: CloseRateTrendPoint,
    key: (typeof OJ_TREND_SEVERITY_SEGMENTS)[number]['key']
  ): number => Number(point[key] ?? 0);

  return (
    <div
      ref={wrapperRef}
      className="oj-trend-chart"
      onMouseLeave={() => setActiveIndex(null)}
      style={{ height }}
    >
      <svg
        className="oj-trend-svg"
        viewBox={`0 0 ${RATE_VIEWBOX_W} ${RATE_VIEWBOX_H}`}
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
            <stop offset="0%" stopColor={OJ_TREND_COLORS.lineGradientStart} />
            <stop offset="100%" stopColor={OJ_TREND_COLORS.line} />
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
          x={RATE_PLOT_LEFT}
          y={RATE_PLOT_TOP}
          width={plotW}
          height={plotH}
          rx={0}
          className="oj-trend-plot-bg"
        />

        {ticks.slice(0, 4).map((t, i) => {
          const y = yForCount(t);
          const nextY =
            i < ticks.length - 1 ? yForCount(ticks[i + 1]) : RATE_PLOT_BOTTOM;
          return (
            <rect
              key={`band-${i}`}
              x={RATE_PLOT_LEFT}
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
            x1={RATE_PLOT_LEFT}
            y1={y}
            x2={RATE_PLOT_RIGHT}
            y2={y}
            className="oj-trend-grid"
          />
        ))}
        <line
          x1={RATE_PLOT_LEFT}
          y1={RATE_PLOT_BOTTOM}
          x2={RATE_PLOT_RIGHT}
          y2={RATE_PLOT_BOTTOM}
          className="oj-trend-axis-line"
        />
        <line
          x1={RATE_PLOT_LEFT}
          y1={RATE_PLOT_TOP}
          x2={RATE_PLOT_LEFT}
          y2={RATE_PLOT_BOTTOM}
          className="oj-trend-axis-line"
        />
        <line
          x1={RATE_PLOT_RIGHT}
          y1={RATE_PLOT_TOP}
          x2={RATE_PLOT_RIGHT}
          y2={RATE_PLOT_BOTTOM}
          className="oj-trend-axis-line"
        />

        {ticks.map((t, i) => (
          <text
            key={`yl-${i}`}
            className="oj-trend-axis oj-trend-axis-y"
            x={RATE_LEFT_AXIS_X}
            y={yForCount(t) + 4}
            textAnchor="end"
          >
            {t}
          </text>
        ))}

        {[100, 75, 50, 25, 0].map((tick, index) => (
          <text
            key={`yr-${index}`}
            className="oj-trend-axis oj-trend-axis-y"
            x={RATE_RIGHT_AXIS_X}
            y={yForRate(tick) + 4}
          >
            {tick}%
          </text>
        ))}

        <text
          className="oj-trend-axis-title oj-trend-axis-title-y"
          x={RATE_LEFT_AXIS_X}
          y={16}
          textAnchor="end"
        >
          问题数
        </text>
        <text
          className="oj-trend-axis-title oj-trend-axis-title-y"
          x={RATE_RIGHT_AXIS_X}
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

        {activeX != null ? (
          <line
            x1={activeX}
            y1={RATE_PLOT_TOP}
            x2={activeX}
            y2={RATE_PLOT_BOTTOM}
            className="oj-trend-active-guide"
          />
        ) : null}

        {points.map((p, index) => {
          const x = xCenter(index);
          const x0 = x - barW / 2;
          let currentY = RATE_PLOT_BOTTOM;
          return (
            <g key={`b-${p.weekStart}-${index}`}>
              {OJ_TREND_SEVERITY_SEGMENTS.map(({ key, markerColor }) => {
                const value = getSeverityValue(p, key);
                const h = (Math.max(0, value) / yMax) * plotH;
                if (h <= 0) return null;
                currentY -= h;
                return (
                  <rect
                    key={`${key}-${p.weekStart}-${index}`}
                    x={x0}
                    y={currentY}
                    width={barW}
                    height={h}
                    fill={markerColor}
                    rx={0}
                    className={`oj-trend-bar ${
                      activeIndex != null && activeIndex !== index
                        ? 'oj-trend-bar-muted'
                        : ''
                    }`.trim()}
                  />
                );
              })}
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
          const isActive = activeIndex === index;
          return (
            <g key={`p-${index}`}>
              {isActive ? (
                <circle
                  cx={x}
                  cy={y}
                  r={8}
                  className="oj-trend-point-active-halo"
                />
              ) : null}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 4.5 : 2.5}
                className="oj-trend-point-core"
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

        {points.map((p, idx) => (
          <rect
            key={`zone-${p.weekStart}-${idx}`}
            x={RATE_PLOT_LEFT + step * idx}
            y={RATE_PLOT_TOP}
            width={step}
            height={RATE_PLOT_BOTTOM - RATE_PLOT_TOP}
            className="oj-trend-hover-zone"
            onMouseEnter={() => handleActivate(idx)}
            onMouseMove={() => handleActivate(idx)}
          />
        ))}

        {points.map((p, idx) => (
          <text
            key={`x-${p.weekStart}-${idx}`}
            x={xCenter(idx)}
            y={182}
            textAnchor="middle"
            className="oj-trend-axis"
          >
            {p.label}
          </text>
        ))}
      </svg>

      {activePoint && activeIndex != null ? (
        <div
          className="oj-trend-tooltip"
          style={{ left: tooltipPos.left, top: tooltipPos.top }}
        >
          <div className="oj-trend-tooltip-header">
            <span>{activePoint.label}</span>
            <span>{formatTrendRange(activePoint)}</span>
          </div>
          <div className="oj-trend-tooltip-list">
            {OJ_TREND_SEVERITY_SEGMENTS.slice()
              .reverse()
              .map(({ key, label, markerColor }) => (
                <div className="oj-trend-tooltip-item" key={key}>
                  <span className="oj-trend-tooltip-key">
                    <i
                      className="oj-trend-tooltip-marker"
                      style={{ background: markerColor }}
                    />
                    {label}
                  </span>
                  <span className="oj-trend-tooltip-value">
                    {getSeverityValue(activePoint, key)}
                  </span>
                </div>
              ))}
            <div className="oj-trend-tooltip-item">
              <span className="oj-trend-tooltip-key">
                <i className="oj-trend-tooltip-line-marker" />
                周度闭环率
              </span>
              <span className="oj-trend-tooltip-value">
                {formatPercent(activePoint.closeRate)}
              </span>
            </div>
            <div className="oj-trend-tooltip-item oj-trend-tooltip-item-total">
              <span className="oj-trend-tooltip-key">总问题数</span>
              <span className="oj-trend-tooltip-value">
                {activePoint.total}
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
