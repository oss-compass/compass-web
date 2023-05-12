import React from 'react';
import { proxy, ref } from 'valtio';
import { UserinfoQuery } from '@graphql/generated';
import { getAuthProvider } from '@common/utils/cookie';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';

type LoginBind = NonNullable<
  NonNullable<UserinfoQuery['currentUser']>['loginBinds']
>[0];

export const userEvent = {
  REFRESH: 'refresh' as const,
};

export type UserEventType = typeof userEvent[keyof typeof userEvent];

export const userInfoStore = proxy<{
  loading: boolean;
  providerUser: LoginBind | null;
  currentUser: UserinfoQuery['currentUser'] | null;
  event$: EventEmitter<UserEventType> | null;
}>({
  loading: true,
  providerUser: null,
  currentUser: null,
  event$: null,
});

export const setUserInfo = (res?: UserinfoQuery) => {
  let providerUser;

  const provider = getAuthProvider();
  if (provider) {
    providerUser = res?.currentUser?.loginBinds?.find(
      (bindInfo) => bindInfo.provider === provider
    );
  } else {
    providerUser = res?.currentUser?.loginBinds?.[0];
  }

  if (providerUser) {
    providerUser = {
      ...providerUser,
      // todo Let the backend modify
      // The naming of the returned fields in the interface data is reversed.
      account: providerUser?.nickname,
      nickname: providerUser?.account,
    };
  }

  userInfoStore.providerUser = providerUser || null;
  userInfoStore.currentUser = res?.currentUser || null;
};

export const serUserLoading = (loading: boolean) => {
  userInfoStore.loading = loading;
};

export const resetUserInfo = () => {
  userInfoStore.loading = false;
  userInfoStore.providerUser = null;
  userInfoStore.currentUser = null;
};
