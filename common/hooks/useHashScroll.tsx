import { useEffect } from 'react';
import { gsap } from 'gsap';

function useHashScroll(offset = 0) {
  useEffect(() => {
    const scrollToHashElement = () => {
      const { hash } = window.location;
      const id = hash?.replace('#anchor_', '');
      const elementToScroll = document.getElementById(id);
      if (!elementToScroll) return;

      window.scrollTo?.({
        top: elementToScroll.offsetTop,
      });

      const tl = gsap.timeline();
      tl.to(`#${id}`, { borderColor: '#3A5BEF', duration: 0.3 });
      tl.to(`#${id}`, { borderColor: '#ffffff' });
      tl.to(`#${id}`, { borderColor: '#3A5BEF', duration: 0.3 });
      tl.to(`#${id}`, { borderColor: '#ffffff' });
    };

    scrollToHashElement();
    window.addEventListener('hashchange', scrollToHashElement);
    return () => {
      window.removeEventListener('hashchange', scrollToHashElement);
    };
  }, [offset]);
}

export default useHashScroll;
