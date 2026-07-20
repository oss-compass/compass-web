import React from 'react';
import type { CiTrend } from '../types';
import { EmptyState } from './shared';

// 社区软色（对齐痛点色系）
const SERIES = '#2563eb'; // 蓝：主曲线 / 数据点
const GRID = '#e2e8f0'; // slate-200
const MUTED = '#94a3b8'; // slate-400
const INK2 = '#475569'; // slate-600
const GOOD = '#10b981'; // emerald-500：改进项落地竖虚线
const GOOD_TEXT = '#059669'; // emerald-600

/** 单张结果指标趋势图（内联 SVG，忠于设计稿 trendChart） */
const CiTrendChart: React.FC<{ t: CiTrend }> = ({ t }) => {
  const W = 940;
  const H = 200;
  const padL = 40;
  const padB = 30;
  const padT = 24;
  const pts = t.pts.length ? t.pts : [0];
  const max = Math.max(...pts) * 1.15 || 1;
  const x = (i: number) =>
    padL + (i * (W - padL - 20)) / (pts.length > 1 ? pts.length - 1 : 1);
  const y = (v: number) => padT + (H - padT - padB) * (1 - v / max);
  const gridVals = [0, Math.round(max / 2), Math.round(max)];
  const path = pts
    .map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(' ');

  return (
    <div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={t.title}
        style={{ width: '100%', height: 'auto' }}
      >
        <text
          x={padL}
          y={14}
          fontSize={12.5}
          fontWeight={600}
          fill={INK2}
        >
          {t.title}
          {t.demo ? ' 〔示〕' : ''}
        </text>

        {gridVals.map((g, gi) => (
          <g key={`${g}-${gi}`}>
            <line x1={padL} y1={y(g)} x2={W - 10} y2={y(g)} stroke={GRID} />
            <text
              x={padL - 6}
              y={y(g) + 4}
              fontSize={10}
              fill={MUTED}
              textAnchor="end"
            >
              {g}
            </text>
          </g>
        ))}

        {t.anno ? (
          <g>
            <line
              x1={x(t.anno.i)}
              y1={padT}
              x2={x(t.anno.i)}
              y2={H - padB}
              stroke={GOOD}
              strokeWidth={2}
              strokeDasharray="5 4"
            />
            <text
              x={Math.min(x(t.anno.i) + 6, W - 330)}
              y={padT + 12}
              fontSize={11}
              fill={GOOD_TEXT}
              fontWeight={600}
            >
              ▼ {t.anno.label}
            </text>
          </g>
        ) : null}

        <path d={path} fill="none" stroke={SERIES} strokeWidth={2.5} />

        {pts.map((v, i) => (
          <g key={`pt-${i}`}>
            <circle cx={x(i)} cy={y(v)} r={3.5} fill={SERIES} />
            <text
              x={x(i)}
              y={y(v) - 8}
              fontSize={10.5}
              fill={INK2}
              textAnchor="middle"
            >
              {v}
            </text>
            <text
              x={x(i)}
              y={H - padB + 16}
              fontSize={10.5}
              fill={MUTED}
              textAnchor="middle"
            >
              {t.days[i]}
            </text>
          </g>
        ))}
      </svg>
      <p className="mb-3.5 mt-0.5 text-[11.5px] leading-relaxed text-slate-400">
        {t.note}
      </p>
    </div>
  );
};

/** 结果指标趋势与改进项标注（趋势图列表） */
const TrendCharts: React.FC<{ trends: CiTrend[] }> = ({ trends }) => {
  if (!trends.length) {
    return <EmptyState>本周无趋势曲线数据。</EmptyState>;
  }
  return (
    <div className="flex flex-col">
      {trends.map((t, i) => (
        <CiTrendChart key={`${t.title}-${i}`} t={t} />
      ))}
    </div>
  );
};

export default TrendCharts;
