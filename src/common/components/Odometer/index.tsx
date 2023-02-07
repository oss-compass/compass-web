import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { useInViewport } from 'ahooks';

import styles from './index.module.scss';

type OdometerProps = {
  value: number;
  animation?: string;
  auto?: boolean;
  duration?: number;
  format?: string;
  theme?: string;
};

const ReactOdometerjs = dynamic(() => import('react-odometerjs'), {
  ssr: false,
});

const Odometer: React.FC<OdometerProps> = ({ value = 0, ...props }) => {
  const hasRunRef = useRef(false);
  const [val, setVal] = useState(0);

  const ref = useRef(null);
  const [inViewport] = useInViewport(ref);

  useEffect(() => {
    if (value && inViewport && !hasRunRef.current) {
      hasRunRef.current = true;
      setVal(value);
    }
  }, [value, inViewport]);

  return (
    <div className={styles['odometer-scope']} ref={ref}>
      <ReactOdometerjs {...props} value={val} />
    </div>
  );
};

export type { OdometerProps };
export default Odometer;
