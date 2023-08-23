import React from 'react';
import gqlClient from '@common/gqlClient';
import { useRouter } from 'next/router';
import { useLabModelVersionQuery } from '@oss-compass/graphql';

export const useLabModelVersion = () => {
  const router = useRouter();
  const modelId = Number(router.query.model);
  const versionId = Number(router.query.version);

  return useLabModelVersionQuery(
    gqlClient,
    {
      modelId,
      versionId,
    },
    {
      staleTime: 60 * 1000,
      enabled: Boolean(modelId) && Boolean(versionId),
    }
  );
};
