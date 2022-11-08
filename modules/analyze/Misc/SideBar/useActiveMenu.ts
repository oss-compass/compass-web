import { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

const useActiveMenu = () => {
  const [activeId, setActiveId] = useState(window.location.hash);

  useEffect(() => {
    const hashChangeHandle = (e: HashChangeEvent) => {
      const hash = window.location.hash;
      console.log('hashChangeHandle', hash);
      setActiveId(hash);
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
      const id = activeId.replace('#', '');
      const el = document.getElementById(id)?.parentElement;
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

  return activeId;
};

export default useActiveMenu;
