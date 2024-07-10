import React, { PropsWithChildren, useEffect } from 'react';
import client from '@common/gqlClient';
import { useEventEmitter } from 'ahooks';
import { useTpcSoftwareSelectionReportRiskQuery } from '@oss-compass/graphql';
import {
  serUserLoading,
  setUserInfo,
  userRiskStore,
  UserEventType,
  userEvent,
} from './UserRiskStore';

const UserRiskFetcher = ({ shortCode }) => {
  const { data, isLoading, refetch } = useTpcSoftwareSelectionReportRiskQuery(
    client,
    {
      shortCode,
    }
  );

  const event$ = useEventEmitter<UserEventType>();
  event$.useSubscription((e) => {
    if (e === userEvent.REFRESH) {
      refetch();
    }
  });
  useEffect(() => {
    userRiskStore.event$ = { ...userRiskStore.event$, [shortCode]: event$ };
  }, [event$]);

  useEffect(() => {
    setUserInfo(shortCode, data?.tpcSoftwareSelectionReport);
  }, [data]);
  useEffect(() => {
    serUserLoading(isLoading);
  }, [isLoading]);
  return null;
};

export default UserRiskFetcher;
