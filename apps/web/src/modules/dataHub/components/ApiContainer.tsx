import React, { PropsWithChildren, useEffect } from 'react';
import useApiData from '../hooks/useApiData';
import { ApiDataProvider } from '../context';
import NoSsr from '@common/components/NoSsr';

const AnalyzeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useApiData();
  return (
    <NoSsr>
      <ApiDataProvider value={{ data, isLoading }}>{children}</ApiDataProvider>
    </NoSsr>
  );
};

export default AnalyzeContainer;
