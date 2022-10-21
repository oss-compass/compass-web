import { RefObject, useRef } from 'react';

const useHashScroll = (
  id: string,
  opts: {
    anchorRef: RefObject<HTMLElement>;
  }
) => {
  const runOnce = useRef(false);
  const { anchorRef } = opts;

  const { hash } = window.location;
  if (!hash || hash !== `#${id}`) return;

  const elementToScroll = anchorRef?.current;
  if (!elementToScroll) return;
  if (runOnce.current) return;

  const top = elementToScroll.getBoundingClientRect().top;
  if (!top) return;
  window.scrollTo?.({ top, behavior: 'smooth' });

  runOnce.current = true;
};

export default useHashScroll;
