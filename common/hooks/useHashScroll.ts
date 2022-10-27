import { useRef } from 'react';

const useHashScroll = () => {
  const runOnce = useRef(false);
  const { hash } = window.location;
  if (!hash) return;
  const elementToScroll = document.getElementById(hash.replace('#', ''));
  if (!elementToScroll) return;

  if (runOnce.current) return;
  const top = elementToScroll.getBoundingClientRect().top;
  if (!top) return;
  runOnce.current = true;
  window.scrollTo?.({ top, behavior: 'smooth' });
  console.log('hash scrollTo');
};

export default useHashScroll;
