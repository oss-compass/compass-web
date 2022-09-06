import React, { memo } from 'react';
import { Header, Main, Content } from '@components/BaseLayout';
import SideBar from './SideBar';
import Footer from '@components/Footer';
import NavBar from '@modules/analyze/NavBar';
import CompareBar from '@modules/analyze/CompareBar';
import DataView from './DataView';

const Analyze = memo(() => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <NavBar />
      <Main>
        <SideBar />
        <Content>
          <CompareBar />
          <DataView />
          <Footer />
        </Content>
      </Main>
    </div>
  );
});
Analyze.displayName = 'Analyze';

export default Analyze;
