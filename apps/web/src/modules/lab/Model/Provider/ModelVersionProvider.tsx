import React, { useEffect, PropsWithChildren } from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import gqlClient from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import {
  useLabModelDetailQuery,
  useLabModelVersionQuery,
} from '@oss-compass/graphql';

const ModelVersionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);

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

  const {
    isLoading: versionLoading,
    data: versionData,
    error: versionError,
  } = useLabModelVersionQuery(
    gqlClient,
    {
      modelId,
      versionId,
    },
    {
      staleTime: 60 * 1000,
      enabled: Boolean(modelId) && Boolean(versionId),
      onSuccess(res) {
        if (res.labModelVersion) {
        }
      },
    }
  );

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
