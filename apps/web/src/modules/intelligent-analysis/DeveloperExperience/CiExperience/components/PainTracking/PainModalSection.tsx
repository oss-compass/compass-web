import React, { useId } from 'react';

const PainModalSection: React.FC<
  React.PropsWithChildren<{ title: string; count?: number }>
> = ({ title, count, children }) => {
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
        {count !== undefined && (
          <span className="text-xs text-slate-500">共 {count} 条</span>
        )}
      </header>
      <div className="space-y-3 p-4">{children}</div>
    </section>
  );
};

export default PainModalSection;
