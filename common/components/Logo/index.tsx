import React from 'react';
import LogoWithName from './logo-with-name.svg';

const Logo = () => {
  return (
    <div className="flex items-end justify-end p-1 text-sm font-bold text-white md:hidden">
      <LogoWithName className=" h-[42px] w-[230px]" />
    </div>
  );
};

export default Logo;
