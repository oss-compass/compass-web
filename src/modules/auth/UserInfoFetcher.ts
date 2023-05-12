import React, { PropsWithChildren, useEffect } from 'react';
import client from '@graphql/client';
import { useEventEmitter } from 'ahooks';
import { useUserinfoQuery } from '@graphql/generated';
import {
  serUserLoading,
  setUserInfo,
  userInfoStore,
  UserEventType,
  userEvent,
} from './UserInfoStore';

const UserInfoFetcher: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading, refetch } = useUserinfoQuery(client, {});

  const event$ = useEventEmitter<UserEventType>();
  event$.useSubscription((e) => {
    if (e === userEvent.REFRESH) {
      refetch();
    }
  });
  useEffect(() => {
    userInfoStore.event$ = event$;
  }, [event$]);

  useEffect(() => {
    setUserInfo(data);
  }, [data]);

  useEffect(() => {
    serUserLoading(isLoading);
  }, [isLoading]);

  return null;
};

export default UserInfoFetcher;
