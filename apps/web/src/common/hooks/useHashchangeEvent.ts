import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';
import { getCurrentHashId, parseHashId } from '../utils/hashId';

const useHashchangeEvent = (
  { cardClassName }: { cardClassName?: string } = {
    cardClassName: 'base-card',
  }
) => {
  // Lazy initializer with an SSR guard: the state must not be computed by
  // reading `window.location.hash` in the hook body, because `window` does
  // not exist while the page is server-rendered.
  const [activeId, setActiveId] = useState<string>(getCurrentHashId);

  useEffect(() => {
    const hashChangeHandle = (e: HashChangeEvent) => {
      const hash = window.location.hash;
      if (!hash) return;
      console.log('hashChangeHandle', hash);

      // Normalize the hash with the same helper as the initial value so the
      // two code paths cannot drift apart.
      setActiveId(parseHashId(hash));
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
