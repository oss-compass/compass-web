import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { useToggle } from 'ahooks';
import { UserinfoQuery } from '@graphql/generated';
import { getAuthProvider, setAuthProvider } from '@common/utils/cookie';
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

const toggleProviders = ['github', 'gitee'];
const getAnother = (p?: string) => toggleProviders.filter((i) => i !== p)[0];

const useProviderInfo = () => {
  const { currentUser: user } = useSnapshot(userInfoStore);

  const login = getAuthProvider() || 'github';
  const [provider, { toggle }] = useToggle(login, getAnother(login));

  useEffect(() => {
    setAuthProvider(provider);
  }, [provider]);

  const showUser = findSpecifyProvider({
    provider: provider,
    loginBinds: user?.loginBinds,
  });

  return { providerUser: showUser, loginBinds: user?.loginBinds, toggle };
};

export default useProviderInfo;
