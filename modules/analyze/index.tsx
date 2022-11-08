import React, { memo } from 'react';
import { useWindowScroll, usePrevious } from 'react-use';
import { Header, Main, Content } from '@common/components/Layout';
import Footer from '@common/components/Footer';
import SideBar from './Misc/SideBar';
import NavBar from './Misc/NavBar';
import DataView from './DataView';
import { SideBarMenu } from './Misc/SideBar';
import classnames from 'classnames';

const AnalyzeHeader = () => {
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;

  return (
    <div
      className={classnames('sticky z-header flex-shrink-0 transition-all', [
        y < preY ? 'top-0' : ' md:-top-[48px] >md:-top-[80px]',
      ])}
    >
      <Header
        mobileMenu={
          <div className="pb-8 pt-8">
            <SideBarMenu />
          </div>
        }
      />
      <NavBar />
    </div>
  );
};

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
