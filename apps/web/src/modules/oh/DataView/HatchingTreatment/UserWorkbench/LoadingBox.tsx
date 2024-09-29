import React from 'react';

const LoadingBox = () => (
  <div className="text-smflex-col relative flex w-[435px] animate-pulse p-5">
    <div className="flex-1 space-y-6 p-4">
      <div className="mb-14 grid grid-cols-3 gap-16">
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="grid grid-cols-3 gap-16">
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
      </div>
      <div className="grid grid-cols-3 gap-16">
        <div className="col-span-2 h-4 rounded bg-slate-200"></div>
        <div className="col-span-1 h-4 rounded bg-slate-200"></div>
      </div>
    </div>
  </div>
);

export default LoadingBox;
