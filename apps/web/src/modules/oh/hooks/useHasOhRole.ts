import { useUserInfo } from '@modules/auth';
const useHasOhRole = () => {
  const { roleLevel } = useUserInfo();
  return { hasOhRole: roleLevel >= 2 ? true : false };
};

export default useHasOhRole;
