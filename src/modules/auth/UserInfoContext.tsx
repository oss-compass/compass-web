import React, { createContext, useContext, PropsWithChildren } from 'react';
import client from '@graphql/client';
import { useUserinfoQuery, UserinfoQuery } from '@graphql/generated';
import { getAuthProvider } from '@common/utils/cookie';

const UserContext = createContext<UserinfoQuery | undefined>(undefined);

export const UserInfoProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useUserinfoQuery(client);
  if (isLoading) {
    return null;
  }

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export const useUserInfo = () => {
  const ctx = useContext(UserContext);

  let user;
  const provider = getAuthProvider();
  if (provider) {
    user = ctx?.currentUser?.loginBinds?.find(
      (bindInfo) => bindInfo.provider === provider
    );
  } else {
    user = ctx?.currentUser?.loginBinds?.[0];
  }

  if (user) {
    user = {
      ...user,
      // todo Let the backend modify
      // The naming of the returned fields in the interface data is reversed.
      account: user?.nickname,
      nickname: user?.account,
    };
  }

  return { user, ...ctx };
};
