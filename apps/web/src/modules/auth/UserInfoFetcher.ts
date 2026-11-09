import React, { PropsWithChildren, useEffect } from 'react';
import { useRouter } from 'next/router';
import client from '@common/gqlClient';
import { useEventEmitter } from 'ahooks';
import { useUserinfoQuery } from '@oss-compass/graphql';
import {
  serUserLoading,
  setUserInfo,
  userInfoStore,
  UserEventType,
  userEvent,
} from './UserInfoStore';
import {
  cookieSetAuthRole,
  cookieSetAuthBoardRole,
} from '@common/utils/cookie';
import { isStandaloneExperiencePath } from './userInfoRoutes';

const UserInfoFetcher: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const skipFetch =
    isStandaloneExperiencePath(router.pathname) ||
    isStandaloneExperiencePath(router.asPath);

  const { data, isLoading, refetch } = useUserinfoQuery(
    client,
    {},
    {
      enabled: router.isReady && !skipFetch,
    }
  );

  const event$ = useEventEmitter<UserEventType>();
  event$.useSubscription((e) => {
    if (e === userEvent.REFRESH) {
      if (router.isReady && !skipFetch) {
        refetch();
      }
    }
  });
  useEffect(() => {
    userInfoStore.event$ = event$;
  }, [event$]);

  useEffect(() => {
    if (skipFetch) {
      // 排除路径下直接标记加载完成，不发起请求
      serUserLoading(false);
      return;
    }
    if (!router.isReady) return;
    setUserInfo(data);
    cookieSetAuthRole(data?.currentUser?.roleLevel);
    cookieSetAuthBoardRole(data?.currentUser?.dashboardRole || false);
  }, [data, skipFetch, router.isReady]);

  useEffect(() => {
    if (!skipFetch) {
      serUserLoading(isLoading);
    }
  }, [isLoading, skipFetch]);

  return null;
};

export default UserInfoFetcher;
