import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { UserinfoQuery } from '@graphql/generated';
import { cookieGetAuthProvider } from '@common/utils/cookie';
import { userInfoStore } from '@modules/auth/UserInfoStore';
import { ReadonlyDeep } from 'type-fest';

type LoginBinds = ReadonlyDeep<
  NonNullable<UserinfoQuery['currentUser']>['loginBinds']
>;

function findSpecifyProvider({
  loginBinds,
  provider,
}: {
  loginBinds?: LoginBinds;
  provider?: string;
}) {
  let providerUser;

  if (provider && loginBinds && loginBinds.length > 1) {
    providerUser = loginBinds?.find(
      (bindInfo) => bindInfo.provider === provider
    );
  } else {
    providerUser = loginBinds?.[0];
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

  return providerUser || null;
}

export const useUserInfo = () => {
  const { currentUser: user } = useSnapshot(userInfoStore);
  const provider = cookieGetAuthProvider();
  const providerUser = findSpecifyProvider({
    provider: provider,
    loginBinds: user?.loginBinds,
  });
  return { providerUser, loginBinds: user?.loginBinds };
};

export const useSubmitUser = () => {
  const { currentUser, submitProvider } = useSnapshot(userInfoStore);
  const provider = cookieGetAuthProvider();
  const submitUser = findSpecifyProvider({
    provider: submitProvider || provider,
    loginBinds: currentUser?.loginBinds,
  });
  return { submitUser, loginBinds: currentUser?.loginBinds };
};
