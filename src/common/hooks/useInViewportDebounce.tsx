import React from 'react';
import type { RefObject } from 'react';
import { useInViewport, useDebounce } from 'ahooks';

const useInViewportDebounce = (ref: RefObject<HTMLElement> | undefined) => {
  const [inView] = useInViewport(ref);
  return useDebounce(inView, { wait: 200 });
};

export default useInViewportDebounce;
