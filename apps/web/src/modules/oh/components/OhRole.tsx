import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { useUserInfo } from '@modules/auth';
import AuthRequire from '@modules/auth/AuthRequire';

const HasOhRole: React.FC<PropsWithChildren> = ({ children }) => {
  const { roleLevel } = useUserInfo();
  const router = useRouter();

  if (roleLevel >= 2) {
    return <>{children}</>;
  } else {
    router.push('/');
    return <></>;
  }
};

const OhRole: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <AuthRequire
      redirectTo={router.asPath}
      loadingClassName="mx-auto p-6 flex h-[calc(100vh-170px)] lg:h-[calc(100vh-138px)] w-full flex-1 flex-col border bg-white drop-shadow-sm md:w-full md:px-6"
    >
      <HasOhRole>{children}</HasOhRole>
    </AuthRequire>
  );
};
export default OhRole;
