import React, { useEffect, useRef, useState } from 'react';

type Props = React.PropsWithChildren<{
  anchorId: string;
  // Fragment children need the caller's flex/gap or space-y layout on this wrapper.
  // Leave it opt-in so existing report sections keep their original layout.
  className?: string;
  eager?: boolean;
  enabled?: boolean;
  onReady?: () => void;
  placeholder?: React.ReactNode;
}>;

// 屏幕下方的明细接近视口后再挂载；已挂载内容保持状态，不随滚动卸载。
const DeferredReportSection: React.FC<Props> = ({
  anchorId,
  className,
  children,
  eager = false,
  enabled = true,
  onReady,
  placeholder,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(eager);

  useEffect(() => {
    if (ready || eager) onReady?.();
  }, [eager, onReady, ready]);

  useEffect(() => {
    if (ready) return;
    if (
      eager ||
      typeof IntersectionObserver === 'undefined' ||
      window.location.hash === `#${anchorId}`
    ) {
      setReady(true);
      return;
    }
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: '240px 0px' }
    );
    if (container.current) observer.observe(container.current);
    return () => observer.disconnect();
  }, [anchorId, eager, enabled, ready]);

  return (
    <div
      ref={container}
      id={ready || eager ? undefined : anchorId}
      className={className}
    >
      {ready || eager
        ? children
        : placeholder ?? <div aria-hidden="true" className="min-h-[320px]" />}
    </div>
  );
};

export default DeferredReportSection;
