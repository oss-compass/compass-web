import React, { memo } from 'react';
import { Header, Main, SideBar, Content, Footer } from '@components/BaseLayout';
import { ClosedPrsCount } from '@modules/analyze/charts';
import NavBar from '@modules/analyze/NavBar';

export const DataPanel = () => {
  return (
    <>
      <ClosedPrsCount />
    </>
  );
};

const Analyze = memo(() => {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <NavBar />
      <Main>
        <SideBar />
        <Content>
          <DataPanel />
          <Footer />
        </Content>
      </Main>
    </div>
  );
});
Analyze.displayName = 'Analyze';

export default Analyze;
