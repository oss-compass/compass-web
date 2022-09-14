import React, { useState, RefObject, useRef, ReactNode } from 'react';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';

interface BaseCardProps {
  loading?: boolean;
  className?: string;
  title?: string;
  description?: string;
  children: ((containerRef: RefObject<HTMLElement>) => ReactNode) | ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({
  className = '',
  children,
  loading = false,
  title = '',
  description = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [fullScreen, setFullScreen] = useState(false);

  const cls = classnames(className, 'rounded-lg bg-white p-6 drop-shadow-sm', {
    'w-screen h-screen fixed left-0 right-0 top-0 bottom-0 z-[1000]':
      fullScreen,
  });

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
    <div className={cls} ref={cardRef}>
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span
          className="cursor-pointer p-2"
          onClick={() => {
            setFullScreen((pre) => !pre);
          }}
        >
          {fullScreen ? <BiExitFullscreen /> : <BiFullscreen />}
        </span>
      </div>
      <p className="mb-4 text-sm">{description}</p>
      {typeof children === 'function' ? children(cardRef) : children}
    </div>
  );
};

export default BaseCard;
