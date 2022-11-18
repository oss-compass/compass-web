import React, { PropsWithChildren, useContext, useEffect } from 'react';
import Analyze from '@modules/analyze';
import {
  ConfigContextProvider,
  ChartThemeProvider,
  ChartThemeContext,
  ActionThemeColorInit,
} from '@modules/analyze/context';
import { useStatusQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';

const useLabelStatus = () => {
  const { compareItems } = useCompareItems();
  const label = React.useMemo(() => {
    // todo check all compare items status
    if (compareItems.length >= 1) {
      return compareItems[0].label;
    }
    return '';
  }, [compareItems]);

  const { data, isLoading } = useStatusQuery(
    client,
    { label },
    { enabled: Boolean(label) }
  );
  const status = data?.analysisStatus || 'pending';
  return {
    isLoading,
    status,
  };
};

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

const AnalyzePage = () => {
  const { status, isLoading } = useLabelStatus();
  return (
    <ConfigContextProvider value={{ status, loading: isLoading }}>
      <ChartThemeProvider>
        <ColorThemeInit>
          <Analyze />
        </ColorThemeInit>
      </ChartThemeProvider>
    </ConfigContextProvider>
  );
};

export default AnalyzePage;
