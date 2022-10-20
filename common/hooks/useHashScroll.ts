import { RefObject } from 'react';
import { gsap } from 'gsap';

const useHashScroll = (
  id: string,
  opts: {
    anchorElement: RefObject<HTMLElement>;
    borderFlashElement?: RefObject<HTMLElement>;
  }
) => {
  const { anchorElement, borderFlashElement } = opts;
  const { hash } = window.location;
  if (!hash || hash !== `#${id}`) return;

  const elementToScroll = anchorElement.current;
  if (!elementToScroll) return;

  const top = elementToScroll.getBoundingClientRect().top;
  if (!top) return;

  window.scrollTo?.({ top });

  if (!borderFlashElement) return;
  const tl = gsap.timeline();
  const activeVars = { borderColor: '#3A5BEF', duration: 0.3 };
  const defaultVars = { borderColor: '#ffffff' };
  tl.to(borderFlashElement.current, activeVars);
  tl.to(borderFlashElement.current, defaultVars);
  tl.to(borderFlashElement.current, activeVars);
  tl.to(borderFlashElement.current, defaultVars);
  tl.to(borderFlashElement.current, activeVars);
  tl.to(borderFlashElement.current, defaultVars);
};

export default useHashScroll;
