import React, { PropsWithChildren, useEffect } from 'react';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { StatusContextProvider } from '@modules/analyze/context';
import ColorThemeInit from '@modules/analyze/components/ColorThemeInit';
import NoSsr from '@common/components/NoSsr';

const AnalyzeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { status, isLoading, notFound, verifiedItems } = useLabelStatus();

  return (
    <NoSsr>
      <StatusContextProvider
        value={{ status, notFound, verifiedItems, isLoading }}
      >
        <ColorThemeInit>{children}</ColorThemeInit>
      </StatusContextProvider>
    </NoSsr>
  );
};

export default AnalyzeContainer;
