import React, { PropsWithChildren } from 'react';
import client from '@graphql/client';
import { useRouter } from 'next/router';
import { StatusVerifyQuery, useStatusVerifyQuery } from '@graphql/generated';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import useExtractUrlLabels from '@modules/analyze/hooks/useExtractUrlLabels';
import {
  getShortAnalyzeLink,
  getShortCompareLink,
  getShortLabAnalyzeLink,
  getShortLabCompareLink,
} from '@common//utils/links';

const LegacyLabelRedirect: React.FC<
  PropsWithChildren & { isLab?: boolean }
> = ({ children, isLab = false }) => {
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
    // compare
    if (verifiedItems.length > 1) {
      const ids = verifiedItems.map((i) => i.shortCode!);
      if (isLab) {
        router.push(getShortLabCompareLink(ids));
      } else {
        router.push(getShortCompareLink(ids));
      }
      return null;
    }

    // single
    const id = verifiedItems[0].shortCode;
    if (isLab) {
      router.push(getShortLabAnalyzeLink(id));
    } else {
      router.push(getShortAnalyzeLink(id));
    }
    return null;
  }

  return <>{children}</>;
};

export default LegacyLabelRedirect;
