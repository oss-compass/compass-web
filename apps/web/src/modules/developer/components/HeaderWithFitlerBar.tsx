import React from 'react';
import Header from '@common/components/Header';
import StickyNav from '@common/components/Header/StickyNav';
import { SideBarMenu } from '@modules/developer/components/SideBar';
import NavBar from '@modules/developer/components/NavBar';
import TopicNavbar from '@modules/developer/components/TopicNavbar';

const HeaderWithFilterBar = () => {
  return (
    <StickyNav className=">md:-top-[80px] md:-top-[48px]">
      {/* Head Black Including language switch, login  */}
      <Header
        mobileMenu={
          <div className="pb-8 pt-8">
            <SideBarMenu />
          </div>
        }
      />

      {/* date picker, and parameter settings bar */}
      <NavBar />

      <TopicNavbar />
    </StickyNav>
  );
};

export default HeaderWithFilterBar;
