import React, { useEffect } from 'react';
import client from '@common/gqlClient';
import { useEventEmitter } from 'ahooks';
import { useTpcSoftwareGraduationReportRiskQuery } from '@oss-compass/graphql';
import {
  setRiskLoading,
  setRiskData,
  RiskStore,
  RiskEventType,
  riskEvent,
} from './useRiskStore';

const RiskFetcher = ({ shortCode }) => {
  const { data, isLoading, refetch } = useTpcSoftwareGraduationReportRiskQuery(
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
    setRiskData(shortCode, data?.tpcSoftwareGraduationReport);
  }, [data]);
  useEffect(() => {
    setRiskLoading(isLoading);
  }, [isLoading]);
  return null;
};

export default RiskFetcher;
