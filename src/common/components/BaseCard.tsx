import React, { useState, RefObject, useRef, ReactNode } from 'react';
import { useTranslation } from 'next-i18next';
import LinkX from '@common/components/LinkX';
import LoadInView from '@common/components/LoadInView';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import { useHotkeys } from 'react-hotkeys-hook';

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
  docLink?: string;
  headRight?:
    | ((
        containerRef: RefObject<HTMLElement>,
        fullScreen: boolean,
        setFullScreen: React.Dispatch<React.SetStateAction<boolean>>
      ) => ReactNode)
    | ReactNode;
  children:
    | ((containerRef: RefObject<HTMLElement>, fullScreen: boolean) => ReactNode)
    | ReactNode;
  bodyClass?: string;
}

const BaseCard: React.FC<BaseCardProps> = ({
  id,
  className = '',
  children,
  loading = false,
  title = '',
  description = '',
  docLink = '',
  headRight = null,
  bodyClass = 'h-[350px]',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [fullScreen, setFullScreen] = useState(false);
  const { t } = useTranslation();

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

  useHotkeys('esc', (e, he) => {
    e.preventDefault();
    setFullScreen(false);
  });

  if (loading) {
    return <Loading className={cls} />;
  }

  return (
    <div className={classnames(cls)} ref={cardRef}>
      <h3
        className="group mb-2 scroll-mt-[200px] text-lg font-semibold"
        ref={titleRef}
        id={id}
      >
        {title}
        <a href={`#${id}`}>
          <span className="invisible ml-2 cursor-pointer group-hover:visible group-hover:text-primary">
            #
          </span>
        </a>
      </h3>
      <p className="mb-4 text-xs text-[#585858]">
        {description}
        {docLink && (
          <>
            <LinkX href={docLink}>
              <a
                className="ml-1 text-primary hover:underline"
                data-html2canvas-ignore="true"
              >
                {t('common:know_more')}
              </a>
            </LinkX>
          </>
        )}
      </p>
      <div className="absolute right-4 top-4 flex items-center md:hidden">
        {typeof headRight === 'function'
          ? headRight(cardRef, fullScreen, setFullScreen)
          : headRight}
      </div>
      <LoadInView containerRef={cardRef} className={`relative ${bodyClass}`}>
        {typeof children === 'function'
          ? children(cardRef, fullScreen)
          : children}
      </LoadInView>
    </div>
  );
};

export default BaseCard;
