import React, { useId } from 'react';

const PainModalSection: React.FC<
  React.PropsWithChildren<{ title: string; completed?: boolean }>
> = ({ title, completed, children }) => {
  const headingId = useId();
  return (
    <section
      aria-labelledby={headingId}
      className="min-w-0 rounded-xl border border-slate-200 bg-white"
    >
      <header className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-t-xl border-b border-slate-200 bg-slate-50/70 px-4 py-2.5">
        <h2 id={headingId} className="text-sm font-semibold text-slate-800">
          {title}
        </h2>
        {completed && (
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
            已完成
          </span>
        )}
      </header>
      <div className="space-y-3 p-4">{children}</div>
    </section>
  );
};

export default PainModalSection;
