import React from 'react';
import LogoWhite from './logo-white.svg';
import LogoBlack from './logo-black.svg';

const Logo: React.FC<{ black: boolean }> = ({ black = false }) => {
  return (
    <div className="h-[42px] w-[230px]  md:hidden">
      {black ? <LogoWhite /> : <LogoBlack />}
    </div>
  );
};

export default Logo;
