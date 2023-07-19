import React, {
  memo,
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import Freeze from '@common/components/Freeze';
import useInViewportDebounce from '@common/hooks/useInViewportDebounce';
import classnames from 'classnames';
import { DebugLogger } from '@common/debug';

const logger = new DebugLogger('LoadInView');

const LoadInView: React.FC<
  PropsWithChildren<{
    className?: string;
    containerRef: RefObject<HTMLElement>;
    _tracing?: string;
  }>
> = ({ className, children, containerRef, _tracing }) => {
  const showed = useRef<boolean>(false);
  const inView = useInViewportDebounce(containerRef);

  if (_tracing) {
    logger.debug(_tracing, { inView, showed: showed.current });
  }

  useEffect(() => {
    if (inView) showed.current = true;
  }, [inView]);

  const isRender = inView || showed.current;

  return (
    <div className={classnames(className)}>
      {isRender ? <Freeze freeze={!inView}>{children}</Freeze> : null}
    </div>
  );
};

export default LoadInView;
