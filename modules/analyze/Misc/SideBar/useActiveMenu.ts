import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from 'react-use';

const useActiveMenu = () => {
  const [activeId, setActiveId] = useState(window.location.hash);

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
      const el = document.getElementById(activeId)?.parentElement;
      if (!el) return;

      const cards = document.querySelectorAll('.base-card');
      cards.forEach((card) => {
        card.setAttribute('style', 'border-color: transparent');
      });
      if (el.classList.contains?.('base-card')) {
        el.setAttribute('style', 'border-color: #505050');
      }
    },
    150,
    [activeId]
  );

  return useMemo(() => {
    return {
      topic: activeId,
      menu: activeId,
      subMenu: activeId,
    };
  }, [activeId]);
};

export default useActiveMenu;
