import React from 'react';

const LoadingAnalysis = () => (
  <div className="px-10 pt-8">
    <div className="animate-pulse bg-white p-10">
      <div className="flex-1 space-y-4 ">
        <div className="h-4 rounded bg-slate-200"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 h-4 rounded bg-slate-200"></div>
          <div className="col-span-1 h-4 rounded bg-slate-200"></div>
        </div>
        <div className="h-4 rounded bg-slate-200"></div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1 h-4 rounded bg-slate-200"></div>
          <div className="col-span-2 h-4 rounded bg-slate-200"></div>
        </div>
        <div className="h-4 rounded bg-slate-200"></div>
      </div>
    </div>
  </div>
);

export default LoadingAnalysis;
