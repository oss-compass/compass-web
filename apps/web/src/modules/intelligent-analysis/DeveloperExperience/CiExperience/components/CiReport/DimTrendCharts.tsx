import React from 'react';
import type { CiDimKey } from '../../types';
import { delta, fixed, type CiDaySeries } from '../../helpers';
import { DIM_NAME } from '../../helpers';
import { EmptyState } from '../shared';
import { dimTrends, type CiMiniChart } from './metrics';

const DELTA_CLS: Record<'good' | 'bad' | 'flat', string> = {
  good: 'text-emerald-600',
  bad: 'text-rose-600',
  flat: 'text-slate-400',
};

/** 单张迷你趋势图（内联 SVG，移植 dashboard miniChart：面积+折线+末点+较窗口初判读；保持原 html 比例） */
const MiniChart: React.FC<{ chart: CiMiniChart; days: string[] }> = ({
  chart,
  days,
}) => {
  const gid = React.useId().replace(/:/g, '');
  const { series, color, unit, title, meaning, lowerBetter } = chart;
  const pts = series.map((v) => (v == null ? 0 : v));
  const W = 260;
  const H = 74;
  const pL = 6;
  const pR = 6;
  const pT = 10;
  const pB = 16;
  const mx = Math.max(...pts, 0.0001);
  const mn = Math.min(...pts, 0);
  const x = (i: number) => pL + (i * (W - pL - pR)) / (pts.length - 1 || 1);
  const y = (v: number) => pT + (H - pT - pB) * (1 - (v - mn) / (mx - mn || 1));
  const line = pts
    .map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)},${y(v).toFixed(1)}`)
    .join(' ');
  const area =
    `M${x(0)},${y(mn)} ` +
    pts.map((v, i) => `L${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ') +
    ` L${x(pts.length - 1)},${y(mn)} Z`;
  const first = series.find((v) => v != null) ?? null;
  const last = [...series].reverse().find((v) => v != null) ?? null;
  const di = delta(first, last, lowerBetter !== false);
  const now = last != null ? fixed(last) : '—';

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 pb-1.5 pt-2.5">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[11.5px] font-semibold text-slate-700">
          {title}
        </span>
        <span className="text-[14px] font-extrabold tabular-nums text-slate-900">
          {now}
          <span className="ml-0.5 text-[10px] font-normal text-slate-400">
            {unit}
          </span>
        </span>
      </div>
      <div className="mb-0.5 mt-0.5 text-[9.5px] leading-snug text-slate-400">
        {meaning}
      </div>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: '100%', height: 'auto' }}
        role="img"
        aria-label={`${title}趋势`}
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color} stopOpacity="0.22" />
            <stop offset="1" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill={`url(#${gid})`} />
        <path d={line} fill="none" stroke={color} strokeWidth={1.25} />
        <circle
          cx={x(pts.length - 1)}
          cy={y(last == null ? mn : last)}
          r={3}
          fill={color}
        />
        {days.map((d, i) => (
          <text
            key={`${d}-${i}`}
            x={x(i)}
            y={H - 4}
            fontSize={7.5}
            fill="#94a3b8"
            textAnchor={
              i === 0 ? 'start' : i === days.length - 1 ? 'end' : 'middle'
            }
          >
            {d.slice(5)}
          </text>
        ))}
      </svg>
      <div className="text-right text-[10px] text-slate-400">
        较窗口初{' '}
        <span className={`font-semibold ${DELTA_CLS[di.cls]}`}>
          {di.arrow} {di.txt ? `${di.txt} ` : ''}
          {di.word}
        </span>
      </div>
    </div>
  );
};

/** 关键指标趋势卡内容：按选中维度渲染迷你趋势图（三列网格）。 */
const DimTrendCharts: React.FC<{ dim: CiDimKey; series: CiDaySeries }> = ({
  dim,
  series,
}) => {
  const charts = dimTrends(dim, series);
  if (!charts.length) {
    return <EmptyState>{DIM_NAME[dim]} 暂无逐日趋势序列。</EmptyState>;
  }
  return (
    <div className="grid grid-cols-3 gap-3.5">
      {charts.map((c, i) => (
        <MiniChart key={`${c.title}-${i}`} chart={c} days={series.days} />
      ))}
    </div>
  );
};

export default DimTrendCharts;
