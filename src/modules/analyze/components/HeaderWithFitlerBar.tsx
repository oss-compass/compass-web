import React, { PropsWithChildren } from 'react';
import { usePrevious, useWindowScroll } from 'react-use';
import classnames from 'classnames';
import Header from '@common/components/Header';
import { SideBarMenu } from '@modules/analyze/components/SideBar';
import NavBar from '@modules/analyze/components/NavBar';

const HeaderBarWrap: React.FC<PropsWithChildren> = ({ children }) => {
  const { y } = useWindowScroll();
  const preY = usePrevious(y) as number;

  return (
    <div
      className={classnames('sticky z-header flex-shrink-0 transition-all', [
        y < preY ? 'top-0' : ' md:-top-[48px] >md:-top-[80px]',
      ])}
    >
      {children}
    </div>
  );
};

const HeaderWithFilterBar = () => {
  return (
    <HeaderBarWrap>
      <Header
        mobileMenu={
          <div className="pb-8 pt-8">
            <SideBarMenu />
          </div>
        }
      />
      <NavBar />
    </HeaderBarWrap>
  );
};

export default HeaderWithFilterBar;
