import React from 'react';
import gqlClient from '@common/gqlClient';
import { useRouter } from 'next/router';
import {
  useLabModelVersionQuery,
  LabModelVersionQuery,
} from '@oss-compass/graphql';
import { pageState as AnalyzePageState, actions } from '../Analyze/state';

export const useLabModelVersion = ({
  onSuccess,
}: {
  onSuccess?: (res: LabModelVersionQuery) => void;
} = {}) => {
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
      onSuccess(res) {
        //  callback
        if (onSuccess) onSuccess(res);

        // init
        if (res?.labModelVersion) {
          if (!AnalyzePageState.commentVersion) {
            const id = res.labModelVersion.id;
            const version = res.labModelVersion.version;
            actions.onCurrentVersionChange({ id, version });
          }
        }
      },
    }
  );
};
