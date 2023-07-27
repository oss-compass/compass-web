import { useRef } from 'react';
import { useDebounce } from 'react-use';

const usePageLoadHashScroll = (isLoading: boolean) => {
  const runOnce = useRef(false);

  const scrollToElement = () => {
    const { hash } = window.location;
    if (!hash) return;
    const elementToScroll = document.getElementById(hash.replace('#', ''));
    if (!elementToScroll) return;
    if (runOnce.current) return;
    runOnce.current = true;

    elementToScroll.scrollIntoView?.({ behavior: 'smooth' });
    // set border style
    elementToScroll.parentElement?.setAttribute(
      'style',
      'border-color: #505050'
    );
  };

  useDebounce(
    () => {
      if (!isLoading) {
        scrollToElement();
      }
    },
    500,
    [isLoading]
  );
};

export default usePageLoadHashScroll;
