import { RefObject, useEffect } from 'react';

const useHashScroll = (
  id: string,
  opts: {
    anchorRef: RefObject<HTMLElement>;
  }
) => {
  const { anchorRef } = opts;
  const { hash } = window.location;
  if (!hash || hash !== `#${id}`) return;

  const elementToScroll = anchorRef?.current;
  if (!elementToScroll) return;

  const top = elementToScroll.getBoundingClientRect().top;
  if (!top) return;
  window.scrollTo?.({ top });
};

export default useHashScroll;
