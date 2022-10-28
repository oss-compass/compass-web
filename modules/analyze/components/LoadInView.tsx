import React, {
  memo,
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { useInViewport } from 'ahooks';
import classnames from 'classnames';

const Render: React.FC<
  PropsWithChildren<{
    isRender: boolean;
    containerRef: RefObject<HTMLElement>;
  }>
> = memo(({ children, isRender, containerRef }) => {
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { containerRef });
    }
    return child;
  });
  return isRender ? <>{childrenWithProps}</> : null;
});
Render.displayName = 'Render';

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
      <Render containerRef={containerRef} isRender={isRender}>
        {children}
      </Render>
    </div>
  );
};

export default LoadInView;
