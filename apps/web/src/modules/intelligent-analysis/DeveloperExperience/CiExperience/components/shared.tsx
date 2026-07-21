import React, { type ReactNode, useState } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import type { CiPri, CiVal } from '../types';
import { fmt, priBadgeClass } from '../helpers';

/**
 * 标题旁的说明图标：默认隐藏副标题描述，改用感叹号/信息图标，鼠标移入后以 Tooltip 展示。
 * 交互与外观对齐总览指标卡片（如流水线失败率卡片旁的图标）。
 */
export const HintIcon: React.FC<{ title: ReactNode; className?: string }> = ({
  title,
  className = '',
}) => (
  <Tooltip title={title}>
    <InfoCircleOutlined
      className={`shrink-0 cursor-help text-slate-400 ${className}`}
    />
  </Tooltip>
);

/** 示例数据徽标〔示〕 */
export const DemoTag: React.FC = () => (
  <span className="ml-1 inline-block rounded border border-dashed border-amber-300 px-1 align-[1px] text-[10px] font-medium text-amber-600">
    示
  </span>
);

/** 渲染数值单元（CiVal/字符串/数字），自动挂〔示〕徽标 */
export const ValText: React.FC<{
  value: CiVal | string | number | null | undefined;
  className?: string;
}> = ({ value, className = '' }) => {
  const { text, demo } = fmt(value);
  return (
    <span className={className}>
      {text}
      {demo ? <DemoTag /> : null}
    </span>
  );
};

/** 通用软色药丸徽章 */
export const Badge: React.FC<{ className?: string; children: ReactNode }> = ({
  className = '',
  children,
}) => (
  <span
    className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold ${className}`}
  >
    {children}
  </span>
);

/** 优先级徽章 */
export const PriBadge: React.FC<{ p: CiPri }> = ({ p }) => (
  <Badge className={priBadgeClass[p]}>{p}</Badge>
);

/** 维度标签（中性描边） */
export const DimTag: React.FC<{ children: ReactNode }> = ({ children }) => (
  <span className="inline-block rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[11px] font-semibold text-slate-600">
    {children}
  </span>
);

/** 空态卡（社区 dashed 风格） */
export const EmptyState: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 px-4 py-5 text-center text-sm text-slate-500 ${className}`}
  >
    {children}
  </div>
);

/** 折叠块（对齐社区 EvidenceBlock 交互与外观） */
export const Collapsible: React.FC<{
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
}> = ({ summary, children, defaultOpen = false, className = '' }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div
      className={`overflow-hidden rounded-lg border border-slate-200 bg-white ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-[13px] font-semibold text-slate-700 transition-colors hover:bg-slate-50"
      >
        <span className="min-w-0 flex-1">{summary}</span>
        <span className="shrink-0 text-slate-400">{open ? '▾' : '▸'}</span>
      </button>
      {open ? (
        <div className="border-t border-slate-100 px-3 py-3">{children}</div>
      ) : null}
    </div>
  );
};

/** 迷你趋势线（内联 SVG，忠于设计稿 spark） */
export const SparkLine: React.FC<{
  pts: number[];
  label: string;
  demo?: boolean;
  className?: string;
}> = ({ pts, label, demo, className = '' }) => {
  const w = 200;
  const h = 36;
  const p = 3;
  const safe = pts.length ? pts : [0];
  const max = Math.max(...safe);
  const min = Math.min(...safe);
  const span = safe.length > 1 ? safe.length - 1 : 1;
  const xy = safe.map((v, i) => [
    p + (i * (w - 2 * p)) / span,
    h - p - (h - 2 * p) * ((v - min) / (max - min || 1)),
  ]);
  const path = xy
    .map((c, i) => `${i ? 'L' : 'M'}${c[0].toFixed(1)},${c[1].toFixed(1)}`)
    .join(' ');
  const last = xy[xy.length - 1];
  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        style={{ width: '100%', maxWidth: 220, height: 'auto' }}
        role="img"
        aria-label={label}
      >
        <path d={path} fill="none" stroke="#2563eb" strokeWidth={2} />
        <circle cx={last[0]} cy={last[1]} r={3} fill="#2563eb" />
      </svg>
      <div className="mt-0.5 text-[11px] text-slate-400">
        {label}
        {demo ? <DemoTag /> : null}
      </div>
    </div>
  );
};
