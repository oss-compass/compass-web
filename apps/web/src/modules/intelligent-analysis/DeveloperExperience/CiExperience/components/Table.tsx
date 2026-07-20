import React, { type ReactNode } from 'react';

/** 横向滚动容器（窄屏下表格可滚动）。 */
export const ScrollX: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => <div className={`overflow-x-auto ${className}`}>{children}</div>;

/**
 * 轻量表格：圆角边框容器 + 浅色表头 + 柔和行分隔，对齐社区报告卡片密度。
 * 末行去底边、行悬浮微高亮。
 */
export const Table: React.FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200">
    <table
      className={`w-full border-collapse text-[13px] [&_tbody_tr:hover]:bg-slate-50/60 [&_tbody_tr:last-child_td]:border-b-0 ${className}`}
    >
      {children}
    </table>
  </div>
);

export const Th: React.FC<{
  children?: ReactNode;
  className?: string;
  numeric?: boolean;
}> = ({ children, className = '', numeric = false }) => (
  <th
    className={`border-b border-slate-200 bg-slate-50/80 px-3 py-2.5 align-middle text-[11.5px] font-semibold uppercase tracking-wide text-slate-500 ${
      numeric ? 'text-right tabular-nums' : 'text-left'
    } ${className}`}
  >
    {children}
  </th>
);

export const Td: React.FC<{
  children?: ReactNode;
  className?: string;
  numeric?: boolean;
}> = ({ children, className = '', numeric = false }) => (
  <td
    className={`border-b border-slate-100 px-3 py-2.5 align-top text-slate-700 ${
      numeric ? 'text-right tabular-nums' : 'text-left'
    } ${className}`}
  >
    {children}
  </td>
);
