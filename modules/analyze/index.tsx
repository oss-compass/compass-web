import React, { memo } from 'react';
import { Header, Main, Content } from '@common/components/Layout';
import Footer from '@common/components/Footer';
import SideBar from './Misc/SideBar';
import NavBar from './Misc/NavBar';
import DataView from './DataView';
import SideBarMenu from './Misc/SideBar/SideBarMenu';

const Analyze = () => {
  return (
    <div className="flex min-h-full flex-col">
      <Header
        mobileMenu={
          <div className="pl-4 pb-8 pt-8">
            <SideBarMenu />
          </div>
        }
      />
      <NavBar />
      <Main>
        <SideBar />
        <Content>
          <DataView />
          <Footer />
        </Content>
      </Main>
    </div>
  );
};

export default memo(Analyze);
