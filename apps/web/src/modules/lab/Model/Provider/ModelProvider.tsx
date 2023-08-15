import React, { useEffect, PropsWithChildren } from 'react';
import { useLabModelDetail } from '../hooks';

const ModelProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, data: modelData, error: modelError } = useLabModelDetail();

  if (isLoading) {
    return (
      <div className="py-10 text-center text-lg text-gray-600">Loading...</div>
    );
  }

  if (modelError) {
    return (
      <div className="py-10 text-center text-lg text-gray-600">
        404 not found
      </div>
    );
  }

  if (!modelData?.labModelDetail?.id) {
    return (
      <div className="py-10 text-center text-lg text-gray-600">Forbidden</div>
    );
  }

  return <>{children}</>;
};

export default ModelProvider;
