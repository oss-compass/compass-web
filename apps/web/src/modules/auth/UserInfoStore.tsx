import React from 'react';
import { proxy, ref } from 'valtio';
import { UserinfoQuery } from '@oss-compass/graphql';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';

export const userEvent = {
  REFRESH: 'refresh' as const,
};

export type UserEventType = typeof userEvent[keyof typeof userEvent];

export const userInfoStore = proxy<{
  loading: boolean;
  currentUser: UserinfoQuery['currentUser'] | null;
  submitProvider: string | null;
  event$: EventEmitter<UserEventType> | null;
}>({
  loading: true,
  currentUser: null,
  submitProvider: null,
  event$: null,
});

export const setUserInfo = (res?: UserinfoQuery) => {
  userInfoStore.currentUser = res?.currentUser || null;
};

export const serUserLoading = (loading: boolean) => {
  userInfoStore.loading = loading;
};

export const resetUserInfo = () => {
  userInfoStore.loading = false;
  userInfoStore.currentUser = null;
};
