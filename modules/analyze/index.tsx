import React, { memo, PropsWithChildren } from 'react';
import HeaderWithFilterBar from './components/HeaderWithFitlerBar';
import { Main, Content } from '@common/components/Layout';
import SideBar from './components/SideBar';
import DataView from './DataView';
import Footer from '@common/components/Footer';
import useLabelStatus from '@modules/analyze/hooks/useLabelStatus';
import { ConfigContextProvider } from '@modules/analyze/context';
import ColorThemeInit from '@modules/analyze/components/ColorThemeInit';

const AnalyzeWrap: React.FC<PropsWithChildren> = ({ children }) => {
  const { status, isLoading, isError } = useLabelStatus();
  return (
    <ConfigContextProvider value={{ status, isError, isLoading }}>
      <ColorThemeInit>{children}</ColorThemeInit>
    </ConfigContextProvider>
  );
};

const Analyze = () => {
  return (
    <AnalyzeWrap>
      <HeaderWithFilterBar />
      <Main>
        <SideBar />
        <Content>
          <DataView />
          <Footer />
        </Content>
      </Main>
    </AnalyzeWrap>
  );
};

export default Analyze;
