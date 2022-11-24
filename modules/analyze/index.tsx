import React, { memo } from 'react';
import AnalyzeHeader from './components/AnalyzeHeader';
import { Main, Content } from '@common/components/Layout';
import SideBar from './Misc/SideBar';
import DataView from './DataView';
import Footer from '@common/components/Footer';

const Analyze = () => {
  return (
    <>
      <AnalyzeHeader />
      <Main>
        <SideBar />
        <Content>
          <DataView />
          <Footer />
        </Content>
      </Main>
    </>
  );
};

export default memo(Analyze);
