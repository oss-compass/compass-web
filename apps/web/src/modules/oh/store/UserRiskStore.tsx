import React from 'react';
import { proxy, ref } from 'valtio';
import { UserinfoQuery } from '@oss-compass/graphql';
import { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { useSnapshot } from 'valtio';

export const userEvent = {
  REFRESH: 'refresh' as const,
};

export type UserEventType = typeof userEvent[keyof typeof userEvent];

export const userRiskStore = proxy<{
  loading: boolean;
  data: any;
  event$: any;
}>({
  loading: true,
  data: {},
  event$: {},
});

export const setUserInfo = (shortCode, res) => {
  userRiskStore.data = { ...userRiskStore.data, [shortCode]: res };
};

export const serUserLoading = (loading: boolean) => {
  userRiskStore.loading = loading;
};
export const useGetRisk = (shortCode, key) => {
  const { data, loading } = useSnapshot(userRiskStore);
  if (loading) {
    return { count: 0, state: false };
  }
  const report = data[shortCode];
  const count = report?.metricClarificationCount[key];
  const state = report?.metricClarificationState[key];
  return { count, state };
};
export const resetUserInfo = () => {
  userRiskStore.loading = false;
};

// export const useUserInfo = () => {
// const { currentUser: user } = useSnapshot(userInfoStore);
// const provider = cookieGetAuthProvider();
// const providerUser = findSpecifyProvider({
//   provider: provider,
//   loginBinds: user?.loginBinds,
// });
// return {
//   currentUser: user,
//   providerUser,
//   loginBinds: user?.loginBinds,
//   roleLevel: user?.roleLevel,
// };
// };
