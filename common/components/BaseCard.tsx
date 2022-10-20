import React, { useState, RefObject, useRef, ReactNode } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import { useHotkeys } from 'react-hotkeys-hook';

interface BaseCardProps {
  id?: string;
  loading?: boolean;
  className?: string;
  title?: string;
  description?: string;
  children: ((containerRef: RefObject<HTMLElement>) => ReactNode) | ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({
  id,
  className = '',
  children,
  loading = false,
  title = '',
  description = '',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [fullScreen, setFullScreen] = useState(false);

  const cls = classnames(
    className,
    'rounded-lg bg-white p-5 drop-shadow-sm border-2 border-white min-w-0',
    'md:rounded-none',
    {
      'w-full h-full fixed left-0 right-0 top-0 bottom-0 z-fullscreen':
        fullScreen,
    }
  );

  useHotkeys('esc', (e, he) => {
    e.preventDefault();
    setFullScreen(false);
  });

  // todo
  // if (loading) {
  //   return (
  //     <div className={classnames(cls, 'animate-pulse p-10')}>
  //       <div className="flex-1 space-y-4">
  //         <div className="h-4 rounded bg-slate-200"></div>
  //         <div className="grid grid-cols-3 gap-4">
  //           <div className="col-span-2 h-4 rounded bg-slate-200"></div>
  //           <div className="col-span-1 h-4 rounded bg-slate-200"></div>
  //         </div>
  //         <div className="h-4 rounded bg-slate-200"></div>
  //         <div className="grid grid-cols-3 gap-4">
  //           <div className="col-span-1 h-4 rounded bg-slate-200"></div>
  //           <div className="col-span-2 h-4 rounded bg-slate-200"></div>
  //         </div>
  //         <div className="h-4 rounded bg-slate-200"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className={classnames(cls)} ref={cardRef}>
      <h2 className="group -mt-24 mb-2 pt-24 text-lg font-semibold" id={id}>
        <Link href={`#${id}`}>
          <a>
            {title}
            <span className="invisible ml-2 cursor-pointer group-hover:visible group-hover:text-primary">
              #
            </span>
          </a>
        </Link>
      </h2>
      <span
        className="absolute right-4 top-4 cursor-pointer p-2 md:hidden"
        onClick={() => {
          setFullScreen((pre) => !pre);
        }}
      >
        {fullScreen ? <BiExitFullscreen /> : <BiFullscreen />}
      </span>
      <p className="mb-4 text-sm">{description}</p>
      {typeof children === 'function' ? children(cardRef) : children}
    </div>
  );
};

export default BaseCard;
