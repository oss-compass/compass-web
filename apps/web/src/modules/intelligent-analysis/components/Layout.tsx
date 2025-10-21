import React, { ReactNode } from 'react';
import Header from '@common/components/Header';
import { Main } from '@common/components/Layout';
import SideBar from './SideBar';
import StickyNav from '@common/components/Header/StickyNav';
import NoSsr from '@common/components/NoSsr';
import AuthRequire from '@modules/auth/AuthRequire';
import { Spin } from 'antd';

interface IntelligentAnalysisLayoutProps {
  children: ReactNode;
}

const IntelligentAnalysisLayout: React.FC<IntelligentAnalysisLayoutProps> = ({
  children,
}) => {
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
        requiredRoleLevel={2}
        loadingUi={loadingUi}
        redirectToAuth={true}
        redirectOnPermissionDenied={true}
      >
        <StickyNav className=">md:-top-[80px] md:-top-[48px]">
          <Header />
        </StickyNav>
        <Main>
          <SideBar />
          <div className="flex h-[calc(100vh-80px)] flex-1 overflow-auto bg-gray-50">
            <div className="w-full overflow-y-auto">{children}</div>
          </div>
        </Main>
      </AuthRequire>
    </NoSsr>
  );
};

export default IntelligentAnalysisLayout;
