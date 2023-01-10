import { useEffect, useRef } from 'react';

const usePageLoadHashScroll = () => {
  const runOnce = useRef(false);

  useEffect(() => {
    const t = setTimeout(() => {
      const { hash } = window.location;
      if (!hash) return;
      const elementToScroll = document.getElementById(hash.replace('#', ''));
      if (!elementToScroll) return;

      if (runOnce.current) return;
      const top = elementToScroll.getBoundingClientRect().top;
      if (!top) return;
      runOnce.current = true;
      window.scrollTo?.({ top, behavior: 'smooth' });
      elementToScroll.parentElement?.setAttribute(
        'style',
        'border-color: #505050'
      );
    }, 1000);
    return () => {
      clearTimeout(t);
    };
  }, []);
};

export default usePageLoadHashScroll;
