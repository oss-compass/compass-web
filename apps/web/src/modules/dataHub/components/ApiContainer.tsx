import React, { PropsWithChildren } from 'react';
import useApiData from '../hooks/useApiData';
import { ApiDataProvider } from '../context';
import NoSsr from '@common/components/NoSsr';
import ErrorFallback from '@common/components/ErrorFallback';

const AnalyzeContainer: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading, isError, error, refetch } = useApiData();
  return (
    <NoSsr>
      {isError && !data ? (
        <ErrorFallback
          error={error instanceof Error ? error : new Error(String(error))}
          resetErrorBoundary={() => {
            void refetch();
          }}
        />
      ) : (
        <ApiDataProvider value={{ data, isLoading }}>
          {children}
        </ApiDataProvider>
      )}
    </NoSsr>
  );
};

export default AnalyzeContainer;
