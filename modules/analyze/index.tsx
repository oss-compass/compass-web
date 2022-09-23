import React, { memo } from 'react';
import { Header, Main, Content } from '@common/components/BaseLayout';
import Footer from '@common/components/Footer';
import SideBar from './Misc/SideBar';
import NavBar from './Misc/NavBar';
import DataView from './DataView';

const Analyze = () => {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
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
