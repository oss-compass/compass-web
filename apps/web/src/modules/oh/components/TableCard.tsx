import React, { useState, RefObject, useRef, ReactNode } from 'react';
import LoadInView from '@common/components/LoadInView';
import classnames from 'classnames';

const Loading: React.FC<{ className: string }> = ({ className }) => (
  <div className={classnames(className, 'animate-pulse p-10')}>
    <div className="flex-1 space-y-4">
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
const TableCard = ({
  id,
  className = '',
  loading = false,
  title = '',
  bodyClass = '',
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cls = classnames(
    className,
    'base-card',
    'scroll-mt-[200px]',
    'rounded-lg relative bg-white p-5 mb-4 drop-shadow-sm border-2 border-transparent min-w-0',
    'md:rounded-none'
  );
  if (loading) {
    return <Loading className={cls} />;
  }

  return (
    <div className={cls} ref={cardRef} id={id}>
      <h3
        className="group mb-4 text-lg font-semibold text-[#000000]"
        ref={titleRef}
      >
        {title}
        {/* <a href={`#${id}`}>
          <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
            #
          </span>
        </a> */}
      </h3>
      <LoadInView containerRef={cardRef} className={`relative ${bodyClass}`}>
        {children}
      </LoadInView>
    </div>
  );
};

export default TableCard;
