import React, {
  useState,
  RefObject,
  useRef,
  ReactNode,
  useEffect,
} from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import { BiFullscreen, BiExitFullscreen } from 'react-icons/bi';
import { useHotkeys } from 'react-hotkeys-hook';
import { gsap } from 'gsap';
import useHashScroll from '@common/hooks/useHashScroll';

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
  const titleRef = useRef<HTMLDivElement>(null);
  const [fullScreen, setFullScreen] = useState(false);

  const cls = classnames(
    className,
    'base-card',
    'rounded-lg bg-white p-5 drop-shadow-sm border-2 border-white min-w-0',
    'md:rounded-none',
    {
      'w-full h-full fixed left-0 right-0 top-0 bottom-0 z-fullscreen':
        fullScreen,
    }
  );
  useHashScroll(id!, { anchorRef: titleRef });

  useHotkeys('esc', (e, he) => {
    e.preventDefault();
    setFullScreen(false);
  });

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
