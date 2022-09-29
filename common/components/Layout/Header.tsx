import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
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
          'h-20 px-6 py-4',
          'flex items-center justify-between',
          'lg:hidden'
        )}
      >
        <div className="flex items-center">
          <Link href="/">
            <h1 className="mr-20 flex cursor-pointer items-center text-2xl font-bold ">
              <span className="mr-4 flex h-[44px] w-[44px] items-end justify-end bg-black p-1 text-sm  text-white">
                OSS
              </span>
              OSS Compass
            </h1>
          </Link>
          <Link href="/">
            <a className="mr-[70px] px-2.5 font-medium">Explore</a>
          </Link>
          <Link href="/">
            <a className="mr-[70px] px-2.5 font-medium">Explore</a>
          </Link>
          <Link href="/">
            <a className="mr-[70px] px-2.5 font-medium">About</a>
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
