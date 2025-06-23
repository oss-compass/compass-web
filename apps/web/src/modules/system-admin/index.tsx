import React from 'react';
import Header from '@common/components/Header';
import { Main, Content } from '@common/components/Layout';
import SideBar from './components/SideBar';
import DataView from './DataView';
import StickyNav from '@common/components/Header/StickyNav';
import NoSsr from '@common/components/NoSsr';

const SystemAdmin = () => {
  return (
    <NoSsr>
      <StickyNav className=">md:-top-[80px] md:-top-[48px]">
        <Header />
      </StickyNav>
      <Main>
        <SideBar />
        <DataView />
      </Main>
    </NoSsr>
  );
};

export default SystemAdmin;
