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
      loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6"
    >
      <HasOhRole>{children}</HasOhRole>
    </AuthRequire>
  );
};
export default OhRole;
