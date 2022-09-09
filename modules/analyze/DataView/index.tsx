import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '../hooks/useCompareItems';
import Trend from '../Trend';
import CodeQuality from '../CodeQuality';
import CommunitySupport from '../CommunitySupport';
import CommunityActivity from '../CommunityActivity';

const DataPanel = () => {
  const { urls } = useCompareItems();
  useQueries({
    queries: urls.map((url) => {
      return {
        queryKey: useMetricQuery.getKey({ url }),
        queryFn: useMetricQuery.fetcher(client, { url }),
      };
    }),
  });

  return (
    <>
      <Trend />
      <CodeQuality />
      <CommunitySupport />
      <CommunityActivity />
    </>
  );
};

export default DataPanel;
