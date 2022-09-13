import React, { PropsWithChildren } from 'react';
import classnames from 'classnames';

const BaseCard: React.FC<
  PropsWithChildren<{
    loading?: boolean;
    className?: string;
    title?: string;
    description?: string;
  }>
> = ({
  className = '',
  children,
  loading = false,
  title = '',
  description = '',
}) => {
  const cls = classnames(className, 'rounded-lg bg-white p-6 drop-shadow-sm');

  if (loading) {
    return (
      <div className={classnames(cls, 'animate-pulse p-10')}>
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
    );
  }

  return (
    <div className={cls}>
      <h2 className="mb-2 text-lg font-semibold">{title}</h2>
      <p className="mb-4 text-sm">{description}</p>
      {children}
    </div>
  );
};

export default BaseCard;
