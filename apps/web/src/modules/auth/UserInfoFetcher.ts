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

// 这些路径下不需要获取用户信息（无需鉴权、无需用户数据）
const EXCLUDED_PATHS = ['/intelligent-analysis/community-experience'];

function isExcludedPath(path: string): boolean {
  return EXCLUDED_PATHS.some((prefix) => path.startsWith(prefix));
}

const UserInfoFetcher: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const skipFetch = isExcludedPath(router.asPath);

  const { data, isLoading, refetch } = useUserinfoQuery(
    client,
    {},
    {
      enabled: !skipFetch,
    }
  );

  const event$ = useEventEmitter<UserEventType>();
  event$.useSubscription((e) => {
    if (e === userEvent.REFRESH) {
      if (!skipFetch) {
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
    setUserInfo(data);
    cookieSetAuthRole(data?.currentUser?.roleLevel);
    cookieSetAuthBoardRole(data?.currentUser?.dashboardRole || false);
  }, [data, skipFetch]);

  useEffect(() => {
    if (!skipFetch) {
      serUserLoading(isLoading);
    }
  }, [isLoading, skipFetch]);

  return null;
};

export default UserInfoFetcher;
