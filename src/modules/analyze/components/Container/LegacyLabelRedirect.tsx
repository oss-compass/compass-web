import React, { PropsWithChildren } from 'react';
import client from '@graphql/client';
import { useRouter } from 'next/router';
import { StatusVerifyQuery, useStatusVerifyQuery } from '@graphql/generated';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import useExtractUrlLabels from '@modules/analyze/hooks/useExtractUrlLabels';
import { getShortAnalyzeLink, getShortCompareLink } from '@common//utils/links';

const LegacyLabelRedirect: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { urlLabels } = useExtractUrlLabels();

  const queries = useQueries({
    queries: urlLabels.map(({ label }) => {
      return {
        queryKey: useStatusVerifyQuery.getKey({ label }),
        queryFn: useStatusVerifyQuery.fetcher(client, { label }),
      };
    }),
  });

  const isLoading = queries.some((query) => query.isLoading);

  const queriesResult = urlLabels.map(({ label }) => {
    const key = useStatusVerifyQuery.getKey({ label });
    const data = queryClient.getQueryData<StatusVerifyQuery>(key);
    return { ...data?.analysisStatusVerify };
  });

  // server verified Items
  const verifiedItems = queriesResult.filter(
    (item) => Boolean(item?.label) && Boolean(item?.shortCode)
  );

  if (isLoading) {
    return null;
  }

  if (!isLoading && verifiedItems && verifiedItems.length > 0) {
    if (verifiedItems.length > 1) {
      const ids = verifiedItems.map((i) => i.shortCode!);
      router.push(getShortCompareLink(ids));
      return null;
    } else {
      const id = verifiedItems[0].shortCode;
      router.push(getShortAnalyzeLink(id));
      return null;
    }
  }

  return <>{children}</>;
};

export default LegacyLabelRedirect;
