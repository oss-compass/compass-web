import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

const useHashchangeEvent = (
  { cardClassName }: { cardClassName?: string } = {
    cardClassName: 'base-card',
  }
) => {
  const initialHash = window.location.hash ? window.location.hash.slice(1) : '';
  const [activeId, setActiveId] = useState(initialHash);

  useEffect(() => {
    const hashChangeHandle = (e: HashChangeEvent) => {
      const hash = window.location.hash;
      if (!hash) return;
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
      if (!activeId) return;
      const el = document.getElementById(activeId);
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
