import React, { PropsWithChildren, useContext, useEffect } from 'react';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import {
  ActionThemeColorInit,
  ChartThemeContext,
} from '@modules/analyze/context';

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
  const { dispatch } = useContext(ChartThemeContext);
  useEffect(() => {
    dispatch({
      type: ActionThemeColorInit,
      payload: getInitialTheme(compareItems),
    });
  }, [dispatch, compareItems]);

  return <>{children}</>;
};

export default ColorThemeInit;
