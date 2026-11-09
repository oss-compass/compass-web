import React, { useEffect, useRef, useState } from 'react';

type Props = React.PropsWithChildren<{ anchorId: string }>;

// 屏幕下方的明细接近视口后再挂载；已挂载内容保持状态，不随滚动卸载。
const DeferredReportSection: React.FC<Props> = ({ anchorId, children }) => {
  const container = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    if (
      typeof IntersectionObserver === 'undefined' ||
      window.location.hash === `#${anchorId}`
    ) {
      setReady(true);
      return;
    }
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
  }, [anchorId, ready]);

  return (
    <div ref={container} id={ready ? undefined : anchorId}>
      {ready ? children : <div aria-hidden="true" className="min-h-[320px]" />}
    </div>
  );
};

export default DeferredReportSection;
