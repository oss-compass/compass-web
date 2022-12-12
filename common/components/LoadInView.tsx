import React, { PropsWithChildren, RefObject, useEffect, useRef } from 'react';
import { useInViewport } from 'ahooks';
import classnames from 'classnames';

const LoadInView: React.FC<
  PropsWithChildren<{
    className?: string;
    containerRef: RefObject<HTMLElement>;
  }>
> = ({ className, children, containerRef }) => {
  const showed = useRef<boolean>(false);
  const [inView] = useInViewport(containerRef);

  useEffect(() => {
    if (inView) showed.current = true;
  }, [inView]);

  const isRender = inView || showed.current;

  return (
    <div className={classnames(className, 'h-[350px]')}>
      {isRender ? <>{children}</> : null}
    </div>
  );
};

export default LoadInView;
