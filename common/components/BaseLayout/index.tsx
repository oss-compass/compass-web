import classnames from 'classnames';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';

export const Header: React.FC<{
  sticky?: boolean;
  contentCenter?: boolean;
}> = ({ contentCenter = false, sticky = false }) => {
  return (
    <header className={classnames({ 'sticky top-0': sticky })}>
      <div
        className={classnames(
          { 'mx-auto w-[1200px]': contentCenter },
          'h-20 px-6 py-4',
          'flex items-center justify-between'
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
    </header>
  );
};

export const Main: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="flex flex-1">{children}</main>;
};

export const SideBar = () => {
  return (
    <div className="h-full w-64 flex-shrink-0 border-r p-6">
      <div>Overview</div>
      <div>Overview</div>
      <div>Overview</div>
      <div>Overview</div>
    </div>
  );
};

export const Content: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="flex-1  bg-slate-50 px-10 py-8">{children}</div>;
};

export const Footer = () => {
  return <div>Footer</div>;
};

export const Center = () => {};
