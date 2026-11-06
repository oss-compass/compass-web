import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

const useHashchangeEvent = (
  { cardClassName }: { cardClassName?: string } = {
    cardClassName: 'base-card',
  }
) => {
  const [activeId, setActiveId] = useState(() => {
    // Guard against SSR: `window` is undefined during server-side rendering.
    // All current callers render this hook inside <NoSsr>, so this only hardens
    // the hook itself against future usage without such a boundary.
    if (typeof window === 'undefined') return '';

    let hash = window.location.hash ? window.location.hash.slice(1) : '';
    const questionIndex = hash.indexOf('?');
    return questionIndex >= 0 ? hash.slice(0, questionIndex) : hash;
  });

  useEffect(() => {
    const hashChangeHandle = (e: HashChangeEvent) => {
      let hash = window.location.hash;
      if (!hash) return;
      if (hash.includes('?')) {
        let parts = hash.split('?');
        hash = parts[0];
      }
      console.log('hashChangeHandle', hash);

      const id = hash.replace('#', '');
      setActiveId(id);
    };
    // hashChangeHandle();
    window.addEventListener('hashchange', hashChangeHandle, false);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandle, false);
    };
  }, []);

  useDebounce(
    () => {
      console.log(activeId);
      if (!activeId) return;
      const decodedId = decodeURIComponent(activeId);
      const el = document.getElementById(decodedId);
      if (!el) return;
      const cards = document.querySelectorAll(`.${cardClassName}`);
      cards.forEach((card) => {
        card.classList.remove('card-hash-active-border');
      });

      if (el.classList.contains?.(cardClassName)) {
        el.classList.add('card-hash-active-border');
      }
    },
    150,
    [activeId]
  );

  return activeId;
};

export default useHashchangeEvent;
