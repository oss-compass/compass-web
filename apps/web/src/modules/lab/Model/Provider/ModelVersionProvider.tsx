import React, { PropsWithChildren } from 'react';
import { useLabModelVersion, useLabModelDetail } from '../hooks';

const ModelVersionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, data: modelData, error: modelError } = useLabModelDetail();
  const {
    isLoading: versionLoading,
    data: versionData,
    error: versionError,
  } = useLabModelVersion();

  if (isLoading || versionLoading) {
    return (
      <div className="py-10 text-center text-lg text-gray-600">loading...</div>
    );
  }

  if (modelError || versionError) {
    return (
      <div className="py-10 text-center text-lg text-gray-600">
        404 not found
      </div>
    );
  }

  if (!modelData?.labModelDetail?.id || !versionData?.labModelVersion?.id) {
    return (
      <div className="py-10 text-center text-lg text-gray-600">Forbidden</div>
    );
  }

  return <>{children}</>;
};

export default ModelVersionProvider;
