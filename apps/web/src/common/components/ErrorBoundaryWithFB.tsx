import React, { PropsWithChildren } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ErrorFallback';

const ErrorBoundaryWithFB: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
  );
};

export default ErrorBoundaryWithFB;
