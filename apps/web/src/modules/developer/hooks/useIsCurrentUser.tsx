import { useSnapshot } from 'valtio';
import { userInfoStore } from '@modules/auth/UserInfoStore';

export const useIsCurrentUser = () => {
  const { currentUser } = useSnapshot(userInfoStore);
  const loginBinds = currentUser?.loginBinds;

  const isCurrentUser = (name) => {
    return loginBinds?.find((item) => item.nickname === name);
  };

  return {
    isCurrentUser,
  };
};
