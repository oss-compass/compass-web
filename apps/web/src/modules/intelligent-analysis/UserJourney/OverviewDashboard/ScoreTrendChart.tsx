import React from 'react';
import type { ScoreTrendPoint } from './scoreTrend';
import { formatPercent, formatScore } from './utils';

const SCORE_VIEWBOX_W = 600;
const SCORE_VIEWBOX_H = 196;
const SCORE_PLOT_LEFT = 52;
const SCORE_PLOT_RIGHT = 548;
const SCORE_PLOT_TOP = 32;
const SCORE_PLOT_BOTTOM = 156;
const SCORE_LABEL_SAFE_TOP = 18;
const SCORE_AXIS_X = SCORE_PLOT_LEFT - 8;
const SCORE_TOOLTIP_HALF_WIDTH = 92;
const SCORE_BLUE_START = '#60A5FA';
const SCORE_BLUE_END = '#2563EB';
const SCORE_BLUE_SOFT = 'rgba(37, 99, 235, 0.14)';
const SCORE_BLUE_GUIDE = 'rgba(37, 99, 235, 0.28)';
const SCORE_BLUE_SHADOW = 'rgba(37, 99, 235, 0.18)';

type ScoreTrendChartProps = {
  points: ScoreTrendPoint[];
  height?: number;
  axisTitle?: string;
  tooltipLabel?: string;
  valueType?: 'score' | 'percent';
};

const getFiveScaleRange = (minScore: number, maxScore: number) => {
  let lower = Math.max(0, Math.floor((minScore - 0.2) * 2) / 2);
  let upper = Math.min(5, Math.ceil((maxScore + 0.2) * 2) / 2);

  if (upper - lower < 1) {
    const center = (upper + lower) / 2;
    lower = Math.max(0, center - 0.5);
    upper = Math.min(5, center + 0.5);
  }

  if (upper <= lower) {
    upper = Math.min(5, lower + 1);
  }

  return { lower, upper };
};

const getHundredScaleRange = (minScore: number, maxScore: number) => {
  let lower = Math.max(0, Math.floor((minScore - 5) / 5) * 5);
  let upper = Math.ceil((maxScore + 5) / 5) * 5;

  if (upper - lower < 20) {
    upper = lower + 20;
  }

  return { lower, upper };
};

const getScoreRange = (scores: number[]) => {
  const minScore = Math.min(...scores);
  const maxScore = Math.max(...scores);
  const usingFiveScale = maxScore <= 5;
  const range = usingFiveScale
    ? getFiveScaleRange(minScore, maxScore)
    : getHundredScaleRange(minScore, maxScore);

  return {
    ...range,
    usingFiveScale,
  };
};

export const ScoreTrendChart: React.FC<ScoreTrendChartProps> = ({
  points,
  height = 260,
  axisTitle = '综合体验评分',
  tooltipLabel = '周度评分',
  valueType = 'score',
}) => {
  const chartId = React.useId();
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ left: 0, top: 0 });
  const validScores = points
    .map((point) => point.score)
    .filter(
      (score): score is number => score != null && Number.isFinite(score)
    );

  if (!validScores.length) return null;

  const n = points.length;
  const plotH = SCORE_PLOT_BOTTOM - SCORE_PLOT_TOP;
  const plotW = SCORE_PLOT_RIGHT - SCORE_PLOT_LEFT;
  const step = n > 1 ? plotW / (n - 1) : 0;
  const { lower, upper, usingFiveScale } = getScoreRange(validScores);
  const formatValue = valueType === 'percent' ? formatPercent : formatScore;
  const range = Math.max(upper - lower, 1);
  const yForScore = (value: number) =>
    SCORE_PLOT_BOTTOM - ((value - lower) / range) * plotH;
  const xCenter = (index: number) => SCORE_PLOT_LEFT + step * index;
  const yTextMin = SCORE_LABEL_SAFE_TOP;

  const scorePointYs = points.map((point) =>
    point.score == null ? SCORE_PLOT_BOTTOM : yForScore(point.score)
  );
  const scoreLabelYs = scorePointYs.map((y) => Math.max(yTextMin, y - 16));
  const ticks = Array.from({ length: 5 }, (_item, index) =>
    Number(
      (upper - ((upper - lower) / 4) * index).toFixed(usingFiveScale ? 1 : 0)
    )
  );
  const gridYs = ticks.map((tick) => yForScore(tick));

  const polylinePoints = points
    .map((point, index) =>
      point.score == null ? null : `${xCenter(index)},${yForScore(point.score)}`
    )
    .filter(Boolean)
    .join(' ');
  const firstValidIndex = points.findIndex((point) => point.score != null);
  const lastValidIndex = (() => {
    for (let index = points.length - 1; index >= 0; index -= 1) {
      if (points[index].score != null) return index;
    }
    return -1;
  })();
  const areaPoints =
    firstValidIndex >= 0 && lastValidIndex >= 0 && polylinePoints
      ? `${xCenter(
          firstValidIndex
        )},${SCORE_PLOT_BOTTOM} ${polylinePoints} ${xCenter(
          lastValidIndex
        )},${SCORE_PLOT_BOTTOM}`
      : '';

  const updateTooltip = (index: number) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();
    const leftPx = (xCenter(index) / SCORE_VIEWBOX_W) * rect.width;
    const topPx = (scorePointYs[index] / SCORE_VIEWBOX_H) * rect.height;
    setTooltipPos({
      left: Math.min(
        Math.max(leftPx, SCORE_TOOLTIP_HALF_WIDTH),
        rect.width - SCORE_TOOLTIP_HALF_WIDTH
      ),
      top: Math.max(topPx, 18),
    });
  };

  const handleActivate = (index: number) => {
    if (points[index]?.score == null) return;
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
        viewBox={`0 0 ${SCORE_VIEWBOX_W} ${SCORE_VIEWBOX_H}`}
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
            <stop offset="0%" stopColor={SCORE_BLUE_START} />
            <stop offset="100%" stopColor={SCORE_BLUE_END} />
          </linearGradient>
          <linearGradient
            id={`${chartId}-area-gradient`}
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="rgba(37, 99, 235, 0.2)" />
            <stop offset="100%" stopColor="rgba(37, 99, 235, 0.02)" />
          </linearGradient>
        </defs>

        <rect
          x={SCORE_PLOT_LEFT}
          y={SCORE_PLOT_TOP}
          width={plotW}
          height={plotH}
          rx={0}
          className="oj-trend-plot-bg"
        />

        {ticks.slice(0, 4).map((tick, index) => {
          const y = yForScore(tick);
          const nextY =
            index < ticks.length - 1
              ? yForScore(ticks[index + 1])
              : SCORE_PLOT_BOTTOM;
          return (
            <rect
              key={`band-${tick}`}
              x={SCORE_PLOT_LEFT}
              y={y}
              width={plotW}
              height={nextY - y}
              className={
                index % 2 === 0
                  ? 'oj-trend-band oj-trend-band-strong'
                  : 'oj-trend-band'
              }
            />
          );
        })}

        {gridYs.map((y, index) => (
          <line
            key={`g-${index}`}
            x1={SCORE_PLOT_LEFT}
            y1={y}
            x2={SCORE_PLOT_RIGHT}
            y2={y}
            className="oj-trend-grid"
          />
        ))}
        <line
          x1={SCORE_PLOT_LEFT}
          y1={SCORE_PLOT_BOTTOM}
          x2={SCORE_PLOT_RIGHT}
          y2={SCORE_PLOT_BOTTOM}
          className="oj-trend-axis-line"
        />
        <line
          x1={SCORE_PLOT_LEFT}
          y1={SCORE_PLOT_TOP}
          x2={SCORE_PLOT_LEFT}
          y2={SCORE_PLOT_BOTTOM}
          className="oj-trend-axis-line"
        />

        {ticks.map((tick, index) => (
          <text
            key={`yl-${index}`}
            className="oj-trend-axis oj-trend-axis-y"
            x={SCORE_AXIS_X}
            y={yForScore(tick) + 4}
            textAnchor="end"
          >
            {formatValue(tick)}
          </text>
        ))}

        <text
          className="oj-trend-axis-title oj-trend-axis-title-y"
          x={SCORE_AXIS_X}
          y={16}
          textAnchor="end"
        >
          {axisTitle}
        </text>

        {areaPoints ? (
          <polygon
            points={areaPoints}
            fill={`url(#${chartId}-area-gradient)`}
            className="oj-trend-rate-area"
          />
        ) : null}

        {activeX != null ? (
          <line
            x1={activeX}
            y1={SCORE_PLOT_TOP}
            x2={activeX}
            y2={SCORE_PLOT_BOTTOM}
            stroke={SCORE_BLUE_GUIDE}
            strokeWidth={1}
            strokeDasharray="4 4"
            pointerEvents="none"
          />
        ) : null}

        {polylinePoints ? (
          <polyline
            points={polylinePoints}
            fill="none"
            stroke={`url(#${chartId}-line-gradient)`}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`drop-shadow(0 4px 8px ${SCORE_BLUE_SHADOW})`}
          />
        ) : null}

        {points.map((point, index) => {
          if (point.score == null) return null;
          const x = xCenter(index);
          const y = yForScore(point.score);
          const isActive = activeIndex === index;
          return (
            <g key={point.key}>
              {isActive ? (
                <circle cx={x} cy={y} r={8} fill={SCORE_BLUE_SOFT} />
              ) : null}
              <circle
                cx={x}
                cy={y}
                r={isActive ? 4.5 : 2.5}
                fill="#fff"
                stroke={SCORE_BLUE_END}
                strokeWidth={2}
              />
              <text
                className="oj-trend-val"
                x={x}
                y={scoreLabelYs[index]}
                textAnchor="middle"
                fill={SCORE_BLUE_END}
                style={{
                  paintOrder: 'stroke',
                  stroke: 'rgba(255,255,255,0.94)',
                  strokeWidth: 1.2,
                  strokeLinejoin: 'round',
                }}
              >
                {formatValue(point.score)}
              </text>
            </g>
          );
        })}

        {points.map((point, index) => (
          <rect
            key={`zone-${point.key}`}
            x={xCenter(index) - (n > 1 ? step / 2 : plotW / 2)}
            y={SCORE_PLOT_TOP}
            width={n > 1 ? step : plotW}
            height={SCORE_PLOT_BOTTOM - SCORE_PLOT_TOP}
            className="oj-trend-hover-zone"
            onMouseEnter={() => handleActivate(index)}
            onMouseMove={() => handleActivate(index)}
          />
        ))}

        {points.map((point, index) => (
          <text
            key={`x-${point.key}`}
            x={xCenter(index)}
            y={182}
            textAnchor="middle"
            className="oj-trend-axis"
          >
            {point.label}
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
            <span>{activePoint.date}</span>
          </div>
          <div className="oj-trend-tooltip-list">
            <div className="oj-trend-tooltip-item">
              <span className="oj-trend-tooltip-key">
                <i
                  className="oj-trend-tooltip-line-marker"
                  style={{
                    background: `linear-gradient(90deg, ${SCORE_BLUE_START} 0%, ${SCORE_BLUE_END} 100%)`,
                  }}
                />
                {tooltipLabel}
              </span>
              <span className="oj-trend-tooltip-value">
                {formatValue(activePoint.score)}
              </span>
            </div>
            {activePoint.sampleCount ? (
              <div className="oj-trend-tooltip-item oj-trend-tooltip-item-total">
                <span className="oj-trend-tooltip-key">参与仓库数</span>
                <span className="oj-trend-tooltip-value">
                  {activePoint.sampleCount}
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};
