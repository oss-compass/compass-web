import React, { useState } from 'react';
import { Modal } from 'antd';
import { delta, fixed } from '../../helpers';
import type { CiMetricTrend } from './metrics';

const DELTA_CLS: Record<'good' | 'bad' | 'flat', string> = {
  good: 'text-emerald-600',
  bad: 'text-rose-600',
  flat: 'text-slate-400',
};

/**
 * 指标缩略图（内联 SVG sparkline）：面积 + 折线 + 末点，自动取值域；
 * 全平序列（如恒为 0）居中平铺。对齐总览 CloseRateSparkline 的缩略图语义。
 */
export const MetricSparkline: React.FC<{
  series: (number | null)[];
  color: string;
  width?: number;
  height?: number;
}> = ({ series, color, width = 24, height = 22 }) => {
  const gid = React.useId().replace(/:/g, '');
  const pad = 2;
  const w = Math.max(10, width);
  const h = Math.max(10, height);
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const nums = series.filter(
    (v): v is number => v != null && Number.isFinite(v)
  );
  const mn = nums.length ? Math.min(...nums) : 0;
  const mx = nums.length ? Math.max(...nums) : 1;
  const range = mx - mn;
  const n = series.length;
  const step = n > 1 ? innerW / (n - 1) : 0;
  const yOf = (v: number) =>
    range === 0 ? pad + innerH / 2 : pad + innerH - ((v - mn) / range) * innerH;

  const segs: Array<Array<{ x: number; y: number }>> = [];
  let cur: Array<{ x: number; y: number }> = [];
  series.forEach((v, i) => {
    if (v == null || !Number.isFinite(v)) {
      if (cur.length) segs.push(cur);
      cur = [];
      return;
    }
    cur.push({ x: pad + step * i, y: yOf(v) });
  });
  if (cur.length) segs.push(cur);

  const baseline = pad + innerH;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ display: 'block' }}
      aria-hidden
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.20" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {segs.map((seg, i) => {
        const line = seg
          .map((p, j) => `${j ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
          .join(' ');
        const area = `${line} L${seg[seg.length - 1].x.toFixed(
          1
        )},${baseline} L${seg[0].x.toFixed(1)},${baseline} Z`;
        return (
          <g key={i}>
            <path d={area} fill={`url(#${gid})`} />
            <path
              d={line}
              fill="none"
              stroke={color}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}
    </svg>
  );
};

const FULL_W = 620;
const FULL_H = 280;
const P_L = 48;
const P_R = 24;
const P_T = 34;
const P_B = 42;

/** 完整趋势图（弹窗内）：面积 + 折线 + 逐点值标注 + 左轴刻度 + 日期轴 */
export const MetricTrendChart: React.FC<{ trend: CiMetricTrend }> = ({
  trend,
}) => {
  const gid = React.useId().replace(/:/g, '');
  const { series, days, unit, color } = trend;
  const nums = series.filter(
    (v): v is number => v != null && Number.isFinite(v)
  );
  const rawMin = nums.length ? Math.min(...nums) : 0;
  const rawMax = nums.length ? Math.max(...nums) : 1;
  const spanV = rawMax - rawMin;
  const base = (Math.abs(rawMax) || 1) * 0.4;
  let lo = spanV === 0 ? rawMin - base : rawMin - spanV * 0.12;
  const hi = spanV === 0 ? rawMax + base : rawMax + spanV * 0.12;
  if (rawMin >= 0) lo = Math.max(0, lo);
  const range = hi - lo || 1;

  const plotW = FULL_W - P_L - P_R;
  const plotH = FULL_H - P_T - P_B;
  const n = series.length;
  const xOf = (i: number) => P_L + (n > 1 ? (i * plotW) / (n - 1) : plotW / 2);
  const yOf = (v: number) => P_T + plotH - ((v - lo) / range) * plotH;

  const ticks = [0, 1, 2, 3, 4].map((k) => lo + (range * k) / 4);

  const segs: Array<Array<{ x: number; y: number; v: number }>> = [];
  let cur: Array<{ x: number; y: number; v: number }> = [];
  series.forEach((v, i) => {
    if (v == null || !Number.isFinite(v)) {
      if (cur.length) segs.push(cur);
      cur = [];
      return;
    }
    cur.push({ x: xOf(i), y: yOf(v), v });
  });
  if (cur.length) segs.push(cur);

  const baseline = P_T + plotH;

  return (
    <svg
      viewBox={`0 0 ${FULL_W} ${FULL_H}`}
      style={{ width: '100%', height: 'auto' }}
      role="img"
      aria-label={`${trend.label}趋势`}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.20" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>

      {ticks.map((t, i) => {
        const y = yOf(t);
        return (
          <g key={`grid-${i}`}>
            <line
              x1={P_L}
              y1={y}
              x2={P_L + plotW}
              y2={y}
              stroke="#eef2f7"
              strokeWidth={1}
            />
            <text
              x={P_L - 8}
              y={y + 3.5}
              fontSize={10}
              fill="#94a3b8"
              textAnchor="end"
            >
              {fixed(t)}
              {unit}
            </text>
          </g>
        );
      })}

      {segs.map((seg, i) => {
        const line = seg
          .map((p, j) => `${j ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
          .join(' ');
        const area = `${line} L${seg[seg.length - 1].x.toFixed(
          1
        )},${baseline} L${seg[0].x.toFixed(1)},${baseline} Z`;
        return (
          <g key={`seg-${i}`}>
            <path d={area} fill={`url(#${gid})`} />
            <path
              d={line}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        );
      })}

      {segs.flat().map((p, i) => (
        <g key={`pt-${i}`}>
          <circle
            cx={p.x}
            cy={p.y}
            r={3}
            fill="#fff"
            stroke={color}
            strokeWidth={1.75}
          />
          <text
            x={p.x}
            y={Math.max(P_T - 4, p.y - 10)}
            fontSize={10.5}
            fill="#475569"
            fontWeight={600}
            textAnchor="middle"
          >
            {fixed(p.v)}
          </text>
        </g>
      ))}

      {days.map((d, i) => (
        <text
          key={`x-${d}-${i}`}
          x={xOf(i)}
          y={FULL_H - 14}
          fontSize={11}
          fill="#94a3b8"
          textAnchor={
            i === 0 ? 'start' : i === days.length - 1 ? 'end' : 'middle'
          }
        >
          {d.slice(5)}
        </text>
      ))}
    </svg>
  );
};

/** 完整趋势弹窗（antd Modal 包裹完整图，对齐 CloseRateTrendModal） */
export const MetricTrendModal: React.FC<{
  open: boolean;
  onClose: () => void;
  trend: CiMetricTrend;
}> = ({ open, onClose, trend }) => {
  const first = trend.series.find((v) => v != null) ?? null;
  const last = [...trend.series].reverse().find((v) => v != null) ?? null;
  const di = delta(first, last, trend.lowerBetter);
  const now = last != null ? fixed(last) : '—';
  const win = trend.days.length
    ? `${trend.days[0].slice(5)} → ${trend.days[trend.days.length - 1].slice(
        5
      )}`
    : '';

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={null}
      footer={null}
      width={680}
      centered
      destroyOnClose
    >
      <div className="pt-1">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <h3 className="text-[16px] font-semibold text-slate-900">
            {trend.label}
          </h3>
          <span className="text-[22px] font-extrabold tabular-nums text-slate-900">
            {now}
            <span className="ml-1 text-[12px] font-normal text-slate-400">
              {trend.unit}
            </span>
          </span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-[12px] text-slate-400">
          <span>逐日窗口序列 · {win}</span>
          <span>·</span>
          <span>
            较窗口初{' '}
            <b className={`font-semibold ${DELTA_CLS[di.cls]}`}>
              {di.arrow} {di.txt ? `${di.txt} ` : ''}
              {di.word}
            </b>
          </span>
        </div>
        <div className="mt-4">
          <MetricTrendChart trend={trend} />
        </div>
      </div>
    </Modal>
  );
};

/**
 * 卡片内的缩略图单元：点击缩略图弹窗查看完整趋势。
 * 因外层维度卡是 <button>，此处用 role="button" 的 <span> 并 stopPropagation，
 * 避免嵌套 button 与误触发卡片选中。
 */
export const MetricTrendCell: React.FC<{ trend: CiMetricTrend }> = ({
  trend,
}) => {
  const [open, setOpen] = useState(false);
  const openModal = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setOpen(true);
  };
  return (
    <>
      <span
        role="button"
        tabIndex={0}
        title="点击查看完整趋势"
        onClick={openModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal(e);
          }
        }}
        className="inline-flex cursor-pointer items-center rounded-md border border-transparent px-0.5 py-0.5 transition-colors hover:border-slate-200 hover:bg-slate-50"
      >
        <MetricSparkline series={trend.series} color={trend.color} />
      </span>
      <MetricTrendModal
        open={open}
        onClose={() => setOpen(false)}
        trend={trend}
      />
    </>
  );
};
