import { useUserInfo } from '@modules/auth';
const useHasOhRole = () => {
  const { roleLevel, loading } = useUserInfo();
  return { hasOhRole: roleLevel >= 2 ? true : false, loading };
};

export default useHasOhRole;
