import React from 'react';
import { Modal, Typography } from 'antd';

const { Title } = Typography;

export type IssueTrendModalData = {
  title: string;
  subtitle?: string;
  unit?: string;
  values: Array<number | null>;
  /** 与 values 对齐的 X 轴标签（已格式化短标签） */
  labels: string[];
};

type IssueTrendModalProps = {
  open: boolean;
  trend: IssueTrendModalData | null;
  onClose: () => void;
};

const W = 760;
const H = 340;
const PAD_L = 52;
const PAD_R = 20;
const PAD_T = 28;
const PAD_B = 44;

// 统一采用社区入门体验趋势线配色（青绿色，不用红色）
const LINE_COLOR = '#19A796';

/**
 * Issue 趋势 · 弹窗大图（纯 SVG 折线图，通用）。
 * 供顶部 KPI 缩略图与各仓库「得分趋势」缩略图点击后查看完整趋势。
 */
const IssueTrendModal: React.FC<IssueTrendModalProps> = ({
  open,
  trend,
  onClose,
}) => {
  const gradientId = React.useId();

  const content = React.useMemo(() => {
    if (!trend) return null;
    const values = trend.values;
    const labels = trend.labels;
    const valid = values.filter(
      (v): v is number => v != null && Number.isFinite(v)
    );
    const rawMin = valid.length ? Math.min(...valid) : 0;
    const rawMax = valid.length ? Math.max(...valid) : 1;
    const span = rawMax - rawMin;
    const pad = span > 0 ? span * 0.15 : Math.max(1, rawMax * 0.15);
    const lower = Math.max(0, rawMin - pad);
    const upper = rawMax + pad;
    const range = Math.max(upper - lower, 1);

    const innerW = W - PAD_L - PAD_R;
    const innerH = H - PAD_T - PAD_B;
    const n = values.length;
    const step = n > 1 ? innerW / (n - 1) : 0;

    const xOf = (i: number) => PAD_L + step * i;
    const yOf = (v: number) => PAD_T + innerH - ((v - lower) / range) * innerH;

    // 折线分段（跳过 null）
    const segments: Array<Array<{ x: number; y: number }>> = [];
    let cur: Array<{ x: number; y: number }> = [];
    values.forEach((v, i) => {
      if (v == null || !Number.isFinite(v)) {
        if (cur.length) segments.push(cur);
        cur = [];
        return;
      }
      cur.push({ x: xOf(i), y: yOf(v) });
    });
    if (cur.length) segments.push(cur);

    const linePath = (pts: Array<{ x: number; y: number }>) =>
      pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

    // Y 轴刻度（5 档）
    const yTicks = Array.from({ length: 5 }, (_, i) => {
      const v = lower + (range * i) / 4;
      return { v, y: yOf(v) };
    });

    // X 轴标签（最多 8 个，均匀取样）
    const xStep = Math.max(1, Math.ceil(n / 8));
    const xTicks: Array<{ i: number; label: string }> = [];
    for (let i = 0; i < n; i += xStep) {
      xTicks.push({ i, label: labels[i] ?? '' });
    }
    if (n > 1 && (n - 1) % xStep !== 0) {
      xTicks.push({ i: n - 1, label: labels[n - 1] ?? '' });
    }

    const baselineY = PAD_T + innerH;
    const fmtV = (v: number) =>
      Number.isInteger(v) ? String(v) : v.toFixed(1);

    return (
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={LINE_COLOR} stopOpacity="0.2" />
            <stop offset="100%" stopColor={LINE_COLOR} stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* 网格 + Y 轴刻度 */}
        {yTicks.map((t, i) => (
          <g key={`y-${i}`}>
            <line
              x1={PAD_L}
              y1={t.y}
              x2={W - PAD_R}
              y2={t.y}
              stroke="#eef2f7"
              strokeWidth={1}
            />
            <text
              x={PAD_L - 8}
              y={t.y + 4}
              textAnchor="end"
              fontSize={11}
              fill="#94a3b8"
            >
              {fmtV(t.v)}
            </text>
          </g>
        ))}

        {/* X 轴标签 */}
        {xTicks.map((t, i) => (
          <text
            key={`x-${i}`}
            x={xOf(t.i)}
            y={H - PAD_B + 20}
            textAnchor="middle"
            fontSize={11}
            fill="#94a3b8"
          >
            {t.label}
          </text>
        ))}

        {/* 面积 + 折线 */}
        {segments.map((seg, i) => {
          const path = linePath(seg);
          const area = `${path} L ${seg[seg.length - 1].x} ${baselineY} L ${
            seg[0].x
          } ${baselineY} Z`;
          return (
            <g key={`seg-${i}`}>
              <path d={area} fill={`url(#${gradientId})`} />
              <path
                d={path}
                fill="none"
                stroke={LINE_COLOR}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}

        {/* 数据点 */}
        {values.map((v, i) =>
          v == null || !Number.isFinite(v) ? null : (
            <circle
              key={`pt-${i}`}
              cx={xOf(i)}
              cy={yOf(v)}
              r={2.5}
              fill="#fff"
              stroke={LINE_COLOR}
              strokeWidth={1.5}
            />
          )
        )}
      </svg>
    );
  }, [trend, gradientId]);

  const last = React.useMemo(() => {
    if (!trend) return null;
    for (let i = trend.values.length - 1; i >= 0; i -= 1) {
      const v = trend.values[i];
      if (v != null && Number.isFinite(v)) return v;
    }
    return null;
  }, [trend]);

  return (
    <Modal
      open={open}
      title={null}
      footer={null}
      onCancel={onClose}
      width={820}
      destroyOnClose
    >
      {trend ? (
        <>
          <div className="mb-1 flex items-baseline gap-3">
            <Title level={5} style={{ margin: 0 }}>
              {trend.title}
            </Title>
            <span
              className="text-sm font-semibold"
              style={{ color: LINE_COLOR }}
            >
              最新{' '}
              {last != null
                ? Number.isInteger(last)
                  ? last
                  : last.toFixed(1)
                : '—'}
              {trend.unit ?? ''}
            </span>
          </div>
          {trend.subtitle ? (
            <div className="mb-3 text-xs leading-relaxed text-slate-400">
              {trend.subtitle}
            </div>
          ) : (
            <div className="mb-3" />
          )}
          {content}
        </>
      ) : null}
    </Modal>
  );
};

export default IssueTrendModal;
