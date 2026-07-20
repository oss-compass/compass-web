import React from 'react';
import type { CiImp } from '../types';
import { EmptyState, PriBadge } from './shared';

const QdItem: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-[11px] font-semibold text-slate-400">{label}</span>
    <span className="text-[12.5px] leading-relaxed text-slate-600">
      {children}
    </span>
  </div>
);

/** 改进项候选（由周问题榜生成，纯白卡无彩色左轨） */
const ImprovementCandidates: React.FC<{ imps: CiImp[] }> = ({ imps }) => {
  if (!imps.length) {
    return <EmptyState>本周无 P0/P1 问题，无改进项候选。</EmptyState>;
  }
  return (
    <div className="flex flex-col gap-3">
      {imps.map((m) => (
        <div
          key={m.id}
          className="rounded-2xl border border-slate-200 bg-white p-4"
        >
          <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-slate-800">
            <PriBadge p={m.p} />
            <span>
              {m.id} · {m.title}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-1 gap-3 >md:grid-cols-2">
            <QdItem label="分类/位置">{m.cls}</QdItem>
            <QdItem label="Owner">{m.owner}</QdItem>
            <QdItem label="证据（本周实测）">{m.ev}</QdItem>
            <QdItem label="回验口径">{m.check}</QdItem>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 transition-colors hover:border-slate-300 hover:text-slate-800"
            >
              挂 infrastructure Issue
            </button>
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium ${
                m.stOn
                  ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                  : 'border border-slate-200 bg-slate-50 text-slate-500'
              }`}
            >
              {m.st}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImprovementCandidates;
