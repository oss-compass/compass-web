import React from 'react';
import ApiContainer from './components/ApiContainer';
import Header from '@common/components/Header';
import { Main, Content } from '@common/components/Layout';
import SideBar from './components/SideBar';
import DataView from './DataView';
import StickyNav from '@common/components/Header/StickyNav';

const Analyze = () => {
  return (
    <ApiContainer>
      <StickyNav className=">md:-top-[80px] md:-top-[48px]">
        <Header />
      </StickyNav>
      <Main>
        <SideBar />
        <DataView />
      </Main>
    </ApiContainer>
  );
};

export default Analyze;
