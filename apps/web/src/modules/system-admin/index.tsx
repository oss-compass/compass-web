import React from 'react';
import Header from '@common/components/Header';
import { Main } from '@common/components/Layout';
import SideBar from './components/SideBar';
import DataView from './DataView';
import StickyNav from '@common/components/Header/StickyNav';
import NoSsr from '@common/components/NoSsr';
import AuthRequire from '@modules/auth/AuthRequire';
import { Spin } from 'antd';

const SystemAdmin = () => {
  const loadingUi = (
    <NoSsr>
      <StickyNav className=">md:-top-[80px] md:-top-[48px]">
        <Header />
      </StickyNav>
      <Main>
        <div className="flex h-screen w-full items-center justify-center">
          <Spin size="large" />
        </div>
      </Main>
    </NoSsr>
  );

  return (
    <NoSsr>
      <AuthRequire
        requiredRoleLevel={7}
        loadingUi={loadingUi}
        redirectToAuth={true}
        redirectOnPermissionDenied={true}
      >
        <StickyNav className=">md:-top-[80px] md:-top-[48px]">
          <Header />
        </StickyNav>
        <Main>
          <SideBar />
          <DataView />
        </Main>
      </AuthRequire>
    </NoSsr>
  );
};

export default SystemAdmin;
