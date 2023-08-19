import React, { useState, RefObject, useRef, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import LinkX from '@common/components/LinkX';
import LoadInView from '@common/components/LoadInView';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import { useHotkeys } from 'react-hotkeys-hook';
import DocPopper from '@common/components/DocPopper';
import { DebugLogger } from '@common/debug';

const logger = new DebugLogger('BaseCard');

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
  _tracing?: string;
  id?: string;
  loading?: boolean;
  className?: string;
  title?: string;
  description?: string;
  docLink?: string;
  weight?: string;
  threshold?: string;
  detail?: string;
  notes?: string;
  headRight?:
    | ((
        containerRef: RefObject<HTMLElement>,
        fullScreen: boolean,
        setFullScreen: React.Dispatch<React.SetStateAction<boolean>>
      ) => ReactNode)
    | ReactNode;
  bodyClass?: string;
  bodyRender?:
    | ((containerRef: RefObject<HTMLElement>, fullScreen: boolean) => ReactNode)
    | ReactNode;
  /**
   * @deprecate  use bodyRender
   */
  children?:
    | ((containerRef: RefObject<HTMLElement>, fullScreen: boolean) => ReactNode)
    | ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({
  _tracing,
  id,
  className = '',
  loading = false,
  title = '',
  description = '',
  docLink = '',
  weight = '',
  threshold = '',
  detail = '',
  notes = '',
  headRight = null,
  bodyClass = 'h-[350px]',
  bodyRender,
  children,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const { t } = useTranslation();

  if (_tracing) {
    logger.debug(_tracing, { title, description, id });
  }

  const cls = classnames(
    className,
    'base-card',
    'scroll-mt-[200px]',
    'rounded-lg relative bg-white p-5 drop-shadow-sm border-2 border-transparent min-w-0',
    'md:rounded-none',
    {
      'w-full h-full !fixed left-0 right-0 top-0 bottom-0 z-fullscreen':
        fullScreen,
    }
  );

  useHotkeys('esc', (e, he) => {
    e.preventDefault();
    setFullScreen(false);
  });

  if (loading) {
    return <Loading className={cls} />;
  }

  return (
    <div className={classnames(cls)} ref={cardRef} id={id}>
      <h3 className="group mb-2 text-lg font-semibold" ref={titleRef}>
        {title}
        <a href={`#${id}`}>
          <span className="group-hover:text-primary invisible ml-2 cursor-pointer group-hover:visible">
            #
          </span>
        </a>
      </h3>
      <div className="line-clamp-2 relative mb-4 text-xs text-[#585858] ">
        <DocPopper
          description={description}
          weight={weight}
          threshold={threshold}
          detail={detail}
          notes={notes}
        />
      </div>
      <div className="absolute right-4 top-4 flex items-center md:hidden">
        {typeof headRight === 'function'
          ? headRight(cardRef, fullScreen, setFullScreen)
          : headRight}
      </div>
      <LoadInView
        _tracing={_tracing}
        containerRef={cardRef}
        className={`relative ${bodyClass}`}
      >
        {typeof bodyRender === 'function'
          ? bodyRender(cardRef, fullScreen)
          : bodyRender}

        {typeof children === 'function'
          ? children(cardRef, fullScreen)
          : children}
      </LoadInView>
    </div>
  );
};

export default BaseCard;
