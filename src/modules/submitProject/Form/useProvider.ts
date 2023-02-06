import { useSession } from 'next-auth/react';

const useProvider = (): string => {
  const { data: session } = useSession();
  return session?.provider || 'github';
};

export default useProvider;
