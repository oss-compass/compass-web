import React from 'react';
import { USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO } from '../../../../UserJourney/rawData/constants';
import type { IssuePainWeeklyPoint } from './issueMetrics';

/**
 * 周度新增问题趋势图（按优先级堆叠柱状图）。
 * 视觉与几何参数对齐社区入门总览的 TrendChart，全量复用 oj-trend-* 全局样式；
 * 痛点状态尚未按周维护，故不绘制闭环率折线，仅保留左轴痛点数。
 */

// viewBox 高度固定、宽度跟随容器实际宽高比动态计算：图表始终铺满面板不留白，
// 文字按 容器高/VIEWBOX_H（约 1.2x）放大渲染，保证可读且不变形
const VIEWBOX_H = 160;
const FALLBACK_VIEWBOX_W = 600;
const PLOT_LEFT = 46;
const PLOT_PAD_RIGHT = 16;
const PLOT_TOP = 26;
const PLOT_BOTTOM = 132;
const LABEL_SAFE_TOP = 16;
const LEFT_AXIS_X = PLOT_LEFT - 8;
const TOOLTIP_HALF_WIDTH = 92;

// 堆叠顺序自底向上：P2 → P1 → P0；图例与 tooltip 按 P0 → P2 展示
// fullLabel 取自社区入门痛点等级说明（如 P0完全阻塞），与各优先级面板口径一致
const PAIN_TREND_SEGMENTS = [
  { key: 'p2' as const, label: 'P2', level: 'P2_MAJOR', color: '#4791ff' },
  { key: 'p1' as const, label: 'P1', level: 'P1_CRITICAL', color: '#f4840c' },
  { key: 'p0' as const, label: 'P0', level: 'P0_BLOCKER', color: '#d14343' },
].map((seg) => ({
  ...seg,
  fullLabel: `${seg.label}${
    USER_JOURNEY_PAIN_GUIDE_ITEMS_INFO.find((g) => g.level === seg.level)
      ?.label ?? ''
  }`,
}));

/** 计数轴“好看的”上界（与社区入门 getNiceMax 口径一致） */
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

const IssuePainTrendChart: React.FC<{ points: IssuePainWeeklyPoint[] }> = ({
  points,
}) => {
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ left: 0, top: 0 });
  // viewBox 宽度跟随容器实际宽高比，避免等比缩放导致的两侧留白与文字缩小
  const [viewW, setViewW] = React.useState(FALLBACK_VIEWBOX_W);
  React.useLayoutEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return undefined;
    const syncViewW = () => {
      const rect = wrapper.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      setViewW(
        Math.max(280, Math.round((rect.width / rect.height) * VIEWBOX_H))
      );
    };
    syncViewW();
    const observer = new ResizeObserver(syncViewW);
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);
  const n = points.length;
  if (n === 0) return null;

  const maxTotal = Math.max(0, ...points.map((p) => p.total));
  const yMax = getNiceMax(maxTotal);
  const plotH = PLOT_BOTTOM - PLOT_TOP;
  const plotRight = viewW - PLOT_PAD_RIGHT;
  const plotW = plotRight - PLOT_LEFT;
  const step = plotW / n;
  const barW = Math.min(48, step * 0.48);

  const xCenter = (index: number) => PLOT_LEFT + step * (index + 0.5);
  const yForCount = (value: number) =>
    PLOT_BOTTOM - (Math.max(0, value) / yMax) * plotH;

  const totalTopYs = points.map((p) => yForCount(p.total));
  const totalLabelYs = totalTopYs.map((y) => Math.max(LABEL_SAFE_TOP, y - 8));

  const ticks = [
    yMax,
    Math.round((yMax * 3) / 4),
    Math.round(yMax / 2),
    Math.round(yMax / 4),
    0,
  ];

  const activePoint = activeIndex == null ? null : points[activeIndex];
  const activeX = activeIndex == null ? null : xCenter(activeIndex);

  const handleActivate = (index: number) => {
    setActiveIndex(index);
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const leftPx = (xCenter(index) / viewW) * rect.width;
    const topPx = (totalTopYs[index] / VIEWBOX_H) * rect.height;
    setTooltipPos({
      left: Math.min(
        Math.max(leftPx, TOOLTIP_HALF_WIDTH),
        rect.width - TOOLTIP_HALF_WIDTH
      ),
      top: Math.max(topPx, 18),
    });
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="oj-trend-chart"
        onMouseLeave={() => setActiveIndex(null)}
      >
        <svg
          className="oj-trend-svg"
          viewBox={`0 0 ${viewW} ${VIEWBOX_H}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x={PLOT_LEFT}
            y={PLOT_TOP}
            width={plotW}
            height={plotH}
            rx={0}
            className="oj-trend-plot-bg"
          />
          {ticks.slice(0, 4).map((t, i) => {
            const y = yForCount(t);
            const nextY =
              i < ticks.length - 1 ? yForCount(ticks[i + 1]) : PLOT_BOTTOM;
            return (
              <rect
                key={`band-${i}`}
                x={PLOT_LEFT}
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
          {ticks.slice(0, 4).map((t, i) => (
            <line
              key={`g-${i}`}
              x1={PLOT_LEFT}
              y1={yForCount(t)}
              x2={plotRight}
              y2={yForCount(t)}
              className="oj-trend-grid"
            />
          ))}
          <line
            x1={PLOT_LEFT}
            y1={PLOT_BOTTOM}
            x2={plotRight}
            y2={PLOT_BOTTOM}
            className="oj-trend-axis-line"
          />
          <line
            x1={PLOT_LEFT}
            y1={PLOT_TOP}
            x2={PLOT_LEFT}
            y2={PLOT_BOTTOM}
            className="oj-trend-axis-line"
          />

          {ticks.map((t, i) => (
            <text
              key={`yl-${i}`}
              className="oj-trend-axis oj-trend-axis-y"
              x={LEFT_AXIS_X}
              y={yForCount(t) + 4}
              textAnchor="end"
            >
              {t}
            </text>
          ))}
          <text
            className="oj-trend-axis-title oj-trend-axis-title-y"
            x={LEFT_AXIS_X}
            y={14}
            textAnchor="end"
          >
            痛点数
          </text>

          {activeX != null ? (
            <line
              x1={activeX}
              y1={PLOT_TOP}
              x2={activeX}
              y2={PLOT_BOTTOM}
              className="oj-trend-active-guide"
            />
          ) : null}

          {points.map((p, index) => {
            const x = xCenter(index);
            const x0 = x - barW / 2;
            let currentY = PLOT_BOTTOM;
            return (
              <g key={`b-${index}`}>
                {PAIN_TREND_SEGMENTS.map(({ key, color }) => {
                  const h = (Math.max(0, p[key]) / yMax) * plotH;
                  if (h <= 0) return null;
                  currentY -= h;
                  return (
                    <rect
                      key={`${key}-${index}`}
                      x={x0}
                      y={currentY}
                      width={barW}
                      height={h}
                      fill={color}
                      rx={0}
                      className={`oj-trend-bar ${
                        activeIndex != null && activeIndex !== index
                          ? 'oj-trend-bar-muted'
                          : ''
                      }`.trim()}
                    />
                  );
                })}
                {p.total > 0 ? (
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

          {points.map((p, index) => (
            <text
              key={`x-${index}`}
              className="oj-trend-axis"
              x={xCenter(index)}
              y={148}
              textAnchor="middle"
            >
              {p.label}
            </text>
          ))}

          {points.map((_, index) => (
            <rect
              key={`hover-${index}`}
              x={PLOT_LEFT + step * index}
              y={PLOT_TOP}
              width={step}
              height={plotH}
              className="oj-trend-hover-zone"
              onMouseEnter={() => handleActivate(index)}
              onMouseMove={() => handleActivate(index)}
            />
          ))}
        </svg>
        {activePoint ? (
          <div
            className="oj-trend-tooltip"
            style={{ left: tooltipPos.left, top: tooltipPos.top }}
          >
            <div className="oj-trend-tooltip-header">
              <span>{activePoint.label}</span>
              <span>{activePoint.period.replace('_to_', ' ~ ')}</span>
            </div>
            <div className="oj-trend-tooltip-list">
              {PAIN_TREND_SEGMENTS.slice()
                .reverse()
                .map(({ key, label, color }) => (
                  <div className="oj-trend-tooltip-item" key={key}>
                    <span className="oj-trend-tooltip-key">
                      <i
                        className="oj-trend-tooltip-marker"
                        style={{ background: color }}
                      />
                      {label}
                    </span>
                    <span className="oj-trend-tooltip-value">
                      {activePoint[key]}
                    </span>
                  </div>
                ))}
              <div className="oj-trend-tooltip-item oj-trend-tooltip-item-total">
                <span className="oj-trend-tooltip-key">新增痛点数</span>
                <span className="oj-trend-tooltip-value">
                  {activePoint.total}
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="oj-trend-legend">
        {PAIN_TREND_SEGMENTS.slice()
          .reverse()
          .map(({ key, fullLabel, color }) => (
            <span className="oj-trend-legend-item" key={key}>
              <i className="oj-trend-dot" style={{ background: color }} />
              {fullLabel}
            </span>
          ))}
      </div>
    </>
  );
};

export default IssuePainTrendChart;
