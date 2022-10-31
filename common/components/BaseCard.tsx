import React, { useState, RefObject, useRef, ReactNode } from 'react';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import Image from 'next/image';
import { useHotkeys } from 'react-hotkeys-hook';
import Svg100 from 'public/images/analyze/number-100.svg';
import Svg1 from 'public/images/analyze/number-1.svg';

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

interface BaseCardProps {
  id?: string;
  loading?: boolean;
  className?: string;
  title?: string;
  description?: string;
  headRight?: ReactNode;
  showMarkingSysBtn?: boolean;
  children: ((containerRef: RefObject<HTMLElement>) => ReactNode) | ReactNode;
  getMarkingSys?: (pre: boolean) => void;
}

const BaseCard: React.FC<BaseCardProps> = ({
  id,
  className = '',
  children,
  loading = false,
  title = '',
  description = '',
  headRight = null,
  showMarkingSysBtn = false,
  getMarkingSys,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [markingSys, setMarkingSys] = useState(true);

  const cls = classnames(
    className,
    'base-card',
    'rounded-lg relative bg-white p-5 drop-shadow-sm border-2 border-transparent min-w-0',
    'md:rounded-none',
    {
      'w-full h-full !fixed left-0 right-0 top-0 bottom-0 z-fullscreen':
        fullScreen,
    }
  );

  const changeMarkingSys = (pre: boolean) => {
    setMarkingSys(pre);
    getMarkingSys && getMarkingSys(pre);
  };

  useHotkeys('esc', (e, he) => {
    e.preventDefault();
    setFullScreen(false);
  });

  if (loading) {
    return <Loading className={cls} />;
  }

  return (
    <div className={classnames(cls)} ref={cardRef}>
      <h2
        className="group -mt-[88px] mb-2 pt-[88px] text-lg font-semibold"
        ref={titleRef}
        id={id}
      >
        {title}
        <a href={`#${id}`}>
          <span className="invisible ml-2 cursor-pointer group-hover:visible group-hover:text-primary">
            #
          </span>
        </a>
      </h2>
      <p className="mb-4 text-sm">{description}</p>
      {}
      <div className="absolute right-4 top-4 flex items-center ">
        {showMarkingSysBtn ? (
          <div
            className="group cursor-pointer p-2 transition md:hidden"
            onClick={() => {
              changeMarkingSys(!markingSys);
            }}
          >
            {markingSys ? <Svg1 /> : <Svg100 />}
            {/* <div className='p-2 absolute top-[100%] right-4 z-dropdown hidden w-[260px] border-t-2 border-white bg-black/90 text-white group-hover:block'>Based on the position of the absolute score of the model in all samples,the results of the percentile conversion are given in combination with the general knowledge of the percentile system.[0,100] Absolute score of the model [0,1]</div> */}
          </div>
        ) : (
          ''
        )}

        {headRight}
        <div
          className="cursor-pointer p-2 md:hidden"
          onClick={() => {
            setFullScreen((pre) => !pre);
          }}
        >
          {fullScreen ? <BiExitFullscreen /> : <BiFullscreen />}
        </div>
      </div>
      {typeof children === 'function' ? children(cardRef) : children}
    </div>
  );
};

export default BaseCard;
