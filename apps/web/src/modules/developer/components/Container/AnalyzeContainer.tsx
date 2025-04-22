import React, { PropsWithChildren, useEffect } from 'react';
import useLabelStatus from '@modules/developer/hooks/useLabelStatus';
import { StatusContextProvider } from '@modules/developer/context';
import PageInfoInit from '@modules/developer/components/PageInfoInit';
import NoSsr from '@common/components/NoSsr';

const AnalyzeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { status, isLoading, notFound, verifiedItems } = useLabelStatus();

  return (
    <NoSsr>
      <StatusContextProvider
        value={{ status, notFound, verifiedItems, isLoading }}
      >
        <PageInfoInit>{children}</PageInfoInit>
      </StatusContextProvider>
    </NoSsr>
  );
};

export default AnalyzeContainer;
