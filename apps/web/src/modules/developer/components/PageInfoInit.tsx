import React, { PropsWithChildren, useEffect } from 'react';
import useCompareItems from '@modules/developer/hooks/useCompareItems';
import { initThemeColor } from '@modules/developer/store';

const getInitialTheme = (
  compareItems: { label: string }[]
): { label: string; paletteIndex: number }[] => {
  return compareItems.reduce<{ label: string; paletteIndex: number }[]>(
    (acc, cur, index) => {
      const item = { label: cur.label, paletteIndex: index };
      if (acc) {
        acc.push(item);
        return acc;
      }
      acc = [item];
      return acc;
    },
    []
  );
};

// init page title and label color theme
const PageInfoInit: React.FC<PropsWithChildren> = ({ children }) => {
  const { compareItems } = useCompareItems();

  useEffect(() => {
    // chart Theme
    const initialTheme = getInitialTheme(compareItems);
    initThemeColor(initialTheme);

    // page title
    const names = compareItems.map((i) => i.name);
    document.title = 'OSS Compass | ' + names.join(' vs ');
  }, [compareItems]);

  return <>{children}</>;
};

export default PageInfoInit;
