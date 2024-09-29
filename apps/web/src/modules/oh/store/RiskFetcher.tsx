import React, { useEffect } from 'react';
import client from '@common/gqlClient';
import { useUnmount } from 'ahooks';
import { useEventEmitter } from 'ahooks';
import { useTpcSoftwareSelectionReportRiskQuery } from '@oss-compass/graphql';
import {
  setRiskLoading,
  setRiskData,
  RiskStore,
  RiskEventType,
  riskEvent,
  resetRiskStore,
} from './useRiskStore';

const RiskFetcher = ({ shortCode }) => {
  const { data, isLoading, refetch } = useTpcSoftwareSelectionReportRiskQuery(
    client,
    {
      shortCode,
    }
  );

  const event$ = useEventEmitter<RiskEventType>();
  event$.useSubscription((e) => {
    if (e === riskEvent.REFRESH) {
      refetch();
    }
  });
  useEffect(() => {
    RiskStore.event$ = { ...RiskStore.event$, [shortCode]: event$ };
  }, [event$]);

  useEffect(() => {
    setRiskData(shortCode, data?.tpcSoftwareSelectionReport);
  }, [data]);
  useEffect(() => {
    setRiskLoading(isLoading);
  }, [isLoading]);
  useUnmount(() => {
    resetRiskStore();
  });
  return null;
};

export default RiskFetcher;
