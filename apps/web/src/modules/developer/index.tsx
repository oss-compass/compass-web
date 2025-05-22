import React from 'react';
import LegacyLabelRedirect from './components/Container/LegacyLabelRedirect';
import AnalyzeContainer from './components/Container/AnalyzeContainer';
import HeaderWithFilterBar from './components/HeaderWithFitlerBar';
import { Main, Content } from '@common/components/Layout';
import Footer from '@common/components/Footer';
import SideBar from './components/SideBar';
import DataView from './DataView';

const Analyze = () => {
  return (
    <LegacyLabelRedirect>
      <AnalyzeContainer>
        <HeaderWithFilterBar />
        <Main>
          <SideBar />
          <Content>
            <div className="mx-auto  max-w-[1200px]">
              <DataView />
              <Footer />
            </div>
          </Content>
        </Main>
      </AnalyzeContainer>
    </LegacyLabelRedirect>
  );
};

export default Analyze;
