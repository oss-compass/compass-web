import React, { PropsWithChildren } from 'react';
import NavBar from '@modules/oh/NavBar';
import SideBar from '@modules/oh/SideBar';
import DataView from '@modules/oh/DataView';
import { Main } from '@common/components/Layout';
import { useUserInfo } from '@modules/auth';
import AuthRequire from '@modules/auth/AuthRequire';
import { useRouter } from 'next/router';

const HasRole: React.FC<PropsWithChildren> = ({ children }) => {
  const { roleLevel } = useUserInfo();
  const router = useRouter();

  if (roleLevel >= 2) {
    return <>{children}</>;
  } else {
    router.push('/');
    return <></>;
  }
};

const Oh = () => {
  const router = useRouter();

  return (
    <AuthRequire
      redirectTo={router.asPath}
      loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6"
    >
      <HasRole>
        <NavBar />
        <Main>
          <SideBar />
          <div className="relative flex min-w-0 flex-1 flex-col bg-gray-50 px-4 pt-4 md:p-0">
            <DataView />
          </div>
        </Main>
      </HasRole>
    </AuthRequire>
  );
};

export default Oh;
