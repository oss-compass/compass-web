import React, { PropsWithChildren, useEffect } from 'react';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import { initThemeColor } from '@modules/analyze/store';

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

const ColorThemeInit: React.FC<PropsWithChildren> = ({ children }) => {
  const { compareItems } = useCompareItems();

  // chart Theme
  useEffect(() => {
    const initialTheme = getInitialTheme(compareItems);
    initThemeColor(initialTheme);
  }, [compareItems]);

  return <>{children}</>;
};

export default ColorThemeInit;
