import React, {
  memo,
  PropsWithChildren,
  RefObject,
  useEffect,
  useRef,
} from 'react';
import { useInViewport } from 'ahooks';
import ChartCard from '@modules/analyze/components/ChartCard';

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

const LazyLoadCard: React.FC<
  PropsWithChildren<{
    title: string;
    id: string;
    description: string;
  }>
> = ({ children, title, id, description }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const showedRef = useRef<boolean>(false);
  const [inView] = useInViewport(cardRef);

  useEffect(() => {
    if (inView) showedRef.current = true;
  }, [inView]);

  const isRender = inView || showedRef.current;

  return (
    <ChartCard ref={cardRef} title={title} id={id} description={description}>
      <Render containerRef={cardRef} isRender={isRender}>
        {children}
      </Render>
    </ChartCard>
  );
};

export default LazyLoadCard;
