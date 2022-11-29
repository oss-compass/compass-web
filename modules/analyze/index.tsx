import React, { memo } from 'react';
import HeaderWithFilterBar from './components/HeaderWithFitlerBar';
import { Main, Content } from '@common/components/Layout';
import SideBar from './components/SideBar';
import DataView from './DataView';
import Footer from '@common/components/Footer';

const Analyze = () => {
  return (
    <>
      <HeaderWithFilterBar />
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
