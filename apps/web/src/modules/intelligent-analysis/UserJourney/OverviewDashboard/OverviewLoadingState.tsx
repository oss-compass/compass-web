import React from 'react';

export const OverviewSectionPlaceholder: React.FC<{
  minHeight?: number;
  label?: string;
  embedded?: boolean;
}> = ({
  embedded = false,
  minHeight = embedded ? 0 : 320,
  label = '看板加载中...',
}) => (
  <div
    role="status"
    aria-label={label}
    style={{ minHeight }}
    className={
      embedded ? 'min-w-0' : 'rounded-2xl border border-slate-100 bg-white p-5'
    }
  >
    <span className="sr-only">{label}</span>
    <div aria-hidden="true" className="space-y-4 motion-safe:animate-pulse">
      <div className="h-5 w-36 rounded bg-slate-100" />
      <div className="h-16 rounded-xl bg-slate-50" />
      <div className="h-24 rounded-xl bg-slate-50" />
    </div>
  </div>
);

const OverviewLoadingState = () => (
  <div className="min-h-screen w-full space-y-4 bg-[#eef2fa] p-4">
    <div aria-hidden="true" className="h-12 rounded-2xl bg-white" />
    <OverviewSectionPlaceholder minHeight={560} />
  </div>
);

export default OverviewLoadingState;
