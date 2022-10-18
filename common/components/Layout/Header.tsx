import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import Logo from '../Logo';
import MobileHeader from './MobileHeader';

const Header: React.FC<{
  sticky?: boolean;
  contentCenter?: boolean;
  mobileMenu?: React.ReactNode;
}> = ({ sticky = false, contentCenter = false, mobileMenu }) => {
  return (
    <header className={classnames('flex-shrink-0', { 'sticky top-0': sticky })}>
      <div
        className={classnames(
          { 'mx-auto w-[1200px]': contentCenter },
          'h-20 py-4 pl-4 pr-6',
          'flex items-center justify-between',
          'lg:hidden'
        )}
      >
        <div className="flex items-center">
          <Link href="/">
            <a className="mr-4">
              <Logo />
            </a>
          </Link>
          <Link href="/docs/metrics">
            <a className="mx-6 px-2.5 font-medium">Metrics Models</a>
          </Link>
          <Link href="https://github.com/orgs/oss-compass/discussions">
            <a className="mx-6 px-2.5 font-medium">Community</a>
          </Link>
          <Link href="/">
            <a className="mx-6 px-2.5 font-medium">About</a>
          </Link>
          <Link href="/">
            <a className="mx-6 px-2.5 font-medium">Code</a>
          </Link>
        </div>
        <div className="cursor-pointer border-2 border-black px-6 py-3 font-semibold">
          Contact us
        </div>
      </div>
      <MobileHeader>{mobileMenu}</MobileHeader>
    </header>
  );
};
export default Header;
