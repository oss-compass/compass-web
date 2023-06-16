import React from 'react';
import AnalyzeContainer from './components/Container/AnalyzeContainer';
import HeaderWithFilterBar from './components/HeaderWithFitlerBar';
import { Main, Content } from '@common/components/Layout';
import Footer from '@common/components/Footer';
import SideBar from './components/SideBar';
import DataView from './DataView';

const Analyze = () => {
  return (
    <AnalyzeContainer>
      <HeaderWithFilterBar />
      <Main>
        <SideBar />
        <Content>
          <DataView />
          <Footer />
        </Content>
      </Main>
    </AnalyzeContainer>
  );
};

export default Analyze;
