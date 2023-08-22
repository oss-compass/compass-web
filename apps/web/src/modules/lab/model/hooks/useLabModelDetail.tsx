import React from 'react';
import gqlClient from '@common/gqlClient';
import { useRouter } from 'next/router';
import {
  useLabModelDetailQuery,
  LabModelDetailQuery,
} from '@oss-compass/graphql';

export const useLabModelDetail = () => {
  const router = useRouter();
  const modelId = Number(router.query.model);

  return useLabModelDetailQuery(
    gqlClient,
    { modelId },
    {
      staleTime: 60 * 1000,
      enabled: Boolean(modelId),
    }
  );
};
