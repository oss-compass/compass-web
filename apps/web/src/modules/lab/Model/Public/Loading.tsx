import React from 'react';
import cls from 'classnames';

const Loading = ({ className }: { className?: string }) => (
  <div className={cls('flex flex-1 flex-col bg-white', className)}>
    <div className="animate-pulse">
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

export default Loading;
