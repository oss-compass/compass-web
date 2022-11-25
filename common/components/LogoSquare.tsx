import React from 'react';
import LogoSquareSvg from '../svgs/compass-square.svg';

const LogoSquare = () => {
  return (
    <div className="flex h-[88px] w-[88px] items-end justify-end p-1 text-sm font-bold text-white md:hidden">
      <LogoSquareSvg />
    </div>
  );
};

export default LogoSquare;
