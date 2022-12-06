import React, { PropsWithChildren, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useQueries } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import { useMetricQuery } from '@graphql/generated';
import client from '@graphql/client';
import useCompareItems from '@modules/analyze/hooks/useCompareItems';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import useHashScroll from '@common/hooks/useHashScroll';
import useMetricQueryData from '@modules/analyze/hooks/useMetricQueryData';
import {
  dataState,
  toggleShowOrganizations,
} from '@modules/analyze/store/dataState';
import CodeQualityOverview from '@modules/analyze/DataView/Overview/CodeQuality';

const ChartsWrap: React.FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation();
  const { timeStart, timeEnd } = useQueryDateRange();
  const { compareItems } = useCompareItems();
  useHashScroll();

  useQueries({
    queries: compareItems.map(({ label, level }) => {
      const variables = { label, level, start: timeStart, end: timeEnd };
      return {
        queryKey: useMetricQuery.getKey(variables),
        queryFn: useMetricQuery.fetcher(client, variables),
      };
    }),
  });

  const data = useMetricQueryData();
  const hasOrganizations = data.some((i) => {
    const groupMetricActivity = i.result?.groupMetricActivity;
    if (Array.isArray(groupMetricActivity)) {
      return groupMetricActivity.length > 0;
    }
    return false;
  });

  useEffect(() => {
    toggleShowOrganizations(hasOrganizations);
  }, [hasOrganizations]);

  return <>{children}</>;
};

const Charts = () => {
  const { t } = useTranslation();
  const snapshot = useSnapshot(dataState);

  return (
    <ChartsWrap>
      <div className="mb-4">
        <CodeQualityOverview />
      </div>
    </ChartsWrap>
  );
};

export default Charts;
