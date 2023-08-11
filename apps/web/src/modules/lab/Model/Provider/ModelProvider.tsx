import React, { useEffect, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import gqlClient from '@common/gqlClient';
import { useLabModelDetailQuery } from '@oss-compass/graphql';

const ModelProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const modelId = Number(router.query.model);

  const {
    isLoading,
    data: modelData,
    error: modelError,
  } = useLabModelDetailQuery(
    gqlClient,
    { id: modelId },
    {
      staleTime: 60 * 1000,
      enabled: Boolean(modelId),
    }
  );

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
