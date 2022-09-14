import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import useHashScroll from '@common/hooks/useHashScroll';
import useCompareItems from '../hooks/useCompareItems';
import Trend from '../Trend';
import CodeQuality from '../CodeQuality';
import CommunitySupport from '../CommunitySupport';
import CommunityActivity from '../CommunityActivity';
import { useDatePickerContext } from '@modules/analyze/context';

const DataView = () => {
  const { value } = useDatePickerContext();
  const { startTime, endTime } = value;

  const { urls } = useCompareItems();
  useQueries({
    queries: urls.map((url) => {
      return {
        queryKey: useMetricQuery.getKey({
          url,
          start: startTime,
          end: endTime,
        }),
        queryFn: useMetricQuery.fetcher(client, {
          url,
          start: startTime,
          end: endTime,
        }),
      };
    }),
  });

  useHashScroll(50);

  return (
    <>
      <Trend />
      <CodeQuality />
      <CommunitySupport />
      <CommunityActivity />
    </>
  );
};

export default DataView;
