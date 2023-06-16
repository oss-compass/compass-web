import React, { PropsWithChildren, useEffect } from 'react';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { resetVerifiedLabels } from '@modules/analyze/store';
import { StatusContextProvider } from '@modules/analyze/context';
import ColorThemeInit from '@modules/analyze/components/ColorThemeInit';

const AnalyzeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { status, isLoading, notFound } = useLabelStatus();

  // todo make state only live in React lifecycle
  // https://github.com/pmndrs/valtio/wiki/How-to-use-with-context
  useEffect(() => {
    return () => {
      resetVerifiedLabels();
    };
  }, []);

  console.log('-------------AnalyzeContainer-------------------');

  return (
    <StatusContextProvider value={{ status, notFound, isLoading }}>
      <ColorThemeInit>{children}</ColorThemeInit>
    </StatusContextProvider>
  );
};

export default AnalyzeContainer;
