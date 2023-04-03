import React, { PropsWithChildren, useEffect } from 'react';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { resetVerifiedLabels } from '@modules/analyze/store';
import { ConfigContextProvider } from '@modules/analyze/context';
import ColorThemeInit from '@modules/analyze/components/ColorThemeInit';

const AnalyzeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { status, isLoading, isError } = useLabelStatus();

  // todo make state only live in React lifecycle
  // https://github.com/pmndrs/valtio/wiki/How-to-use-with-context
  useEffect(() => {
    return () => {
      resetVerifiedLabels();
    };
  }, []);

  return (
    <ConfigContextProvider value={{ status, isError, isLoading }}>
      <ColorThemeInit>{children}</ColorThemeInit>
    </ConfigContextProvider>
  );
};

export default AnalyzeContainer;
