import React, { memo } from 'react';
import { Header, Main, Content } from '@common/components/BaseLayout';
import Footer from '@common/components/Footer';
import SideBar from './Misc/SideBar';
import NavBar from './Misc/NavBar';
import CompareBar from './Misc/CompareBar';
import dynamic from 'next/dynamic';

const DynamicDataView = dynamic(() => import('./DataView'), { ssr: false });

const Analyze = memo(() => {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <NavBar />
      <Main>
        <SideBar />
        <Content>
          <div className="flex-1">
            <CompareBar />
            <DynamicDataView />
          </div>
          <Footer />
        </Content>
      </Main>
    </div>
  );
});
Analyze.displayName = 'Analyze';

export default Analyze;
