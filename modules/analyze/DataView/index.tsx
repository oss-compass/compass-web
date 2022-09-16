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

  const { compareItems } = useCompareItems();
  useQueries({
    queries: compareItems.map(({ label, level }) => {
      return {
        queryKey: useMetricQuery.getKey({
          label,
          level,
          start: startTime,
          end: endTime,
        }),
        queryFn: useMetricQuery.fetcher(client, {
          label,
          level,
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
