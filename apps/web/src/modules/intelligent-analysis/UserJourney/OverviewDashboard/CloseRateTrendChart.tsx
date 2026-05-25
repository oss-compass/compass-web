import React from 'react';
import type { CloseRateTrendPoint } from './closeRateTrend';
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
  stroke = '#19A796',
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

const RATE_VIEWBOX_W = 720;
const RATE_VIEWBOX_H = 260;
const RATE_PLOT_LEFT = 54;
const RATE_PLOT_RIGHT = 690;
const RATE_PLOT_TOP = 18;
const RATE_PLOT_BOTTOM = 218;

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
  const plotH = RATE_PLOT_BOTTOM - RATE_PLOT_TOP;
  const plotW = RATE_PLOT_RIGHT - RATE_PLOT_LEFT;
  const step = n > 0 ? plotW / n : plotW;
  const xCenter = (index: number) => RATE_PLOT_LEFT + step * (index + 0.5);
  const yForRate = (value: number) =>
    RATE_PLOT_BOTTOM - (Math.max(0, Math.min(100, value)) / 100) * plotH;

  const pointYs = points.map((p) =>
    p.closeRate == null ? null : yForRate(p.closeRate)
  );
  const segments = points.reduce<
    Array<{ points: Array<{ x: number; y: number }>; lastIndex: number }>
  >((acc, point, idx) => {
    if (point.closeRate == null || !Number.isFinite(point.closeRate)) {
      return acc;
    }
    const x = xCenter(idx);
    const y = yForRate(point.closeRate);
    const last = acc[acc.length - 1];
    if (!last || last.lastIndex !== idx - 1) {
      acc.push({ points: [{ x, y }], lastIndex: idx });
      return acc;
    }
    last.points.push({ x, y });
    last.lastIndex = idx;
    return acc;
  }, []);

  const updateTooltip = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const leftPx = (xCenter(index) / RATE_VIEWBOX_W) * rect.width;
    const y = pointYs[index] ?? RATE_PLOT_BOTTOM;
    const topPx = (y / RATE_VIEWBOX_H) * rect.height;
    setTooltipPos({
      left: Math.min(Math.max(leftPx, 140), rect.width - 140),
      top: Math.max(topPx, 24),
    });
  };

  const handleActivate = (index: number) => {
    setActiveIndex(index);
    updateTooltip(index);
  };

  const activePoint = activeIndex == null ? null : points[activeIndex];
  const activeX = activeIndex == null ? null : xCenter(activeIndex);

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
        preserveAspectRatio="none"
        role="img"
        aria-label="每周闭环率趋势"
      >
        <defs>
          <linearGradient id={`${chartId}-area`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#19A796" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#19A796" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id={`${chartId}-line`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#19A796" />
          </linearGradient>
        </defs>

        {[100, 75, 50, 25, 0].map((tick) => {
          const y = yForRate(tick);
          return (
            <g key={tick}>
              <line
                x1={RATE_PLOT_LEFT}
                x2={RATE_PLOT_RIGHT}
                y1={y}
                y2={y}
                stroke="rgba(226, 232, 240, 0.88)"
                strokeWidth="1"
              />
              <text
                x={RATE_PLOT_LEFT - 10}
                y={y + 4}
                textAnchor="end"
                fontSize="12"
                fill="#94A3B8"
              >
                {`${tick}%`}
              </text>
            </g>
          );
        })}

        {segments.map((segment, idx) => {
          const path = buildLinePath(segment.points);
          if (!path) return null;
          const startX = segment.points[0]?.x ?? RATE_PLOT_LEFT;
          const endX = segment.points[segment.points.length - 1]?.x ?? startX;
          const areaPath = `${path} L ${endX} ${RATE_PLOT_BOTTOM} L ${startX} ${RATE_PLOT_BOTTOM} Z`;
          return (
            <g key={`segment-${idx}`}>
              <path d={areaPath} fill={`url(#${chartId}-area)`} />
              <path
                d={path}
                fill="none"
                stroke={`url(#${chartId}-line)`}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="oj-trend-line-path"
              />
            </g>
          );
        })}

        {points.map((p, idx) => {
          const y = pointYs[idx];
          if (y == null) return null;
          const x = xCenter(idx);
          const active = idx === activeIndex;
          return (
            <g key={`${p.weekStart}-${idx}`}>
              {active ? (
                <circle
                  cx={x}
                  cy={y}
                  r="10"
                  className="oj-trend-point-active-halo"
                />
              ) : null}
              <circle
                cx={x}
                cy={y}
                r={active ? 4 : 3}
                className="oj-trend-point-core"
              />
            </g>
          );
        })}

        {activeIndex != null && activeX != null ? (
          <line
            x1={activeX}
            x2={activeX}
            y1={RATE_PLOT_TOP}
            y2={RATE_PLOT_BOTTOM}
            className="oj-trend-active-guide"
          />
        ) : null}

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
            y={RATE_PLOT_BOTTOM + 24}
            textAnchor="middle"
            fontSize="12"
            fill="#64748B"
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
            <span>{`${activePoint.weekStart} - ${activePoint.weekEnd}`}</span>
            <span className="oj-trend-tooltip-value">
              {formatPercent(activePoint.closeRate)}
            </span>
          </div>
          <div className="oj-trend-tooltip-list">
            <div className="oj-trend-tooltip-item">
              <span className="oj-trend-tooltip-key">
                <span className="oj-trend-tooltip-line-marker" />
                闭环率
              </span>
              <span className="oj-trend-tooltip-value">
                {formatPercent(activePoint.closeRate)}
              </span>
            </div>
            <div className="oj-trend-tooltip-item oj-trend-tooltip-item-total">
              <span className="oj-trend-tooltip-key">问题数</span>
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
