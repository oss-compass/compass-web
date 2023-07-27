import React, { PropsWithChildren, useEffect } from 'react';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { StatusContextProvider } from '@modules/analyze/context';
import PageInfoInit from '@modules/analyze/components/PageInfoInit';
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
