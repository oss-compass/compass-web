import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import SubmitYouProject from '../Misc/SubmitYouProject';
import Logo from '../Logo';
import MobileHeader from './MobileHeader';

const Header: React.FC<{
  sticky?: boolean;
  contentCenter?: boolean;
  mobileMenu?: React.ReactNode;
  blackMode?: boolean;
}> = ({
  sticky = false,
  contentCenter = false,
  mobileMenu,
  blackMode = false,
}) => {
  const fontColor = blackMode ? 'text-white' : 'text-black';
  return (
    <>
      <header
        className={classnames('flex-shrink-0 lg:hidden', {
          'sticky top-0': sticky,
          'bg-black': blackMode,
        })}
      >
        <div
          className={classnames(
            { 'mx-auto w-[1200px]': contentCenter },
            'h-20 py-4 pl-4 pr-6',
            'flex items-center justify-between'
          )}
        >
          <div className="flex items-center">
            <Link href="/">
              <a className="mr-4">
                <Logo black={blackMode} />
              </a>
            </Link>
            <Link href="/docs/metrics">
              <a className={classnames('mx-6 px-2.5 font-medium', fontColor)}>
                Metrics Models
              </a>
            </Link>
            <Link href="https://github.com/orgs/oss-compass/discussions">
              <a className={classnames('mx-6 px-2.5 font-medium', fontColor)}>
                Community
              </a>
            </Link>
            <Link href="/">
              <a className={classnames('mx-6 px-2.5 font-medium', fontColor)}>
                About
              </a>
            </Link>
          </div>
          <SubmitYouProject blackMode={blackMode} />
        </div>
      </header>
      <header className={classnames('flex-shrink-0 >lg:hidden')}>
        <MobileHeader>{mobileMenu}</MobileHeader>
      </header>
    </>
  );
};
export default Header;
