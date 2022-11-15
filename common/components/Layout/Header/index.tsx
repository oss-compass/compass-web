import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import Logo from '@common/components/Logo';
import SubmitYouProject from '@common/components/Misc/SubmitYouProject';
import MobileHeader from '@common/components/Layout/MobileHeader';
import { HeaderCommunityMenu } from '@common/components/MenuDropdown';
import LogoGitee from './logo-gitee.svg';
import LogoGithub from './logo-github.svg';

const Header: React.FC<{
  sticky?: boolean;
  mobileMenu?: React.ReactNode;
}> = ({ sticky = true, mobileMenu }) => {
  return (
    <header>
      <div className={classnames('bg-black lg:hidden')}>
        <div
          className={classnames(
            'h-20 px-8',
            'flex items-center justify-between'
          )}
        >
          <div className="flex h-full items-center">
            <Link href="/">
              <a className="mr-6">
                <Logo color="white" />
              </a>
            </Link>
            <Link href="/docs/dimensions-define" legacyBehavior>
              <a className={'mx-6 px-2.5 font-medium text-white'}>
                Metrics Models
              </a>
            </Link>
            <HeaderCommunityMenu />
            <Link href="/docs/about" legacyBehavior>
              <a className={'mx-6 px-2.5 font-medium text-white'}>About</a>
            </Link>
          </div>
          <div className="flex cursor-pointer items-center">
            <div className="ml-10">
              <Link href="https://gitee.com/oss-compass" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <LogoGitee />
                </a>
              </Link>
            </div>
            <div className="ml-10 mr-10 cursor-pointer">
              <Link href="https://github.com/oss-compass" passHref>
                <a target="_blank" rel="noopener noreferrer">
                  <LogoGithub />
                </a>
              </Link>
            </div>
            <SubmitYouProject />
          </div>
        </div>
      </div>
      <div className={classnames('bg-white >lg:hidden')}>
        <MobileHeader>{mobileMenu}</MobileHeader>
      </div>
    </header>
  );
};
export default Header;
