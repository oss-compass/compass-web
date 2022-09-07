import React, { memo } from 'react';
import { Header, Main, Content } from '@common/components/BaseLayout';
import Footer from '@common/components/Footer';
import SideBar from './Misc/SideBar';
import NavBar from './Misc/NavBar';
import AddContrastBar from './Misc/AddContrastBar';
import DataView from './DataView';

const Analyze = memo(() => {
  return (
    <div className="flex flex-col">
      <Header />
      <NavBar />
      <Main>
        <SideBar />
        <Content>
          <AddContrastBar />
          <DataView />
          <Footer />
        </Content>
      </Main>
    </div>
  );
});
Analyze.displayName = 'Analyze';

export default Analyze;
