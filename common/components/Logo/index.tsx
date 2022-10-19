import React from 'react';
import LogoWhite from './logo-white.svg';
import LogoBlack from './logo-black.svg';

const Logo: React.FC<{ color: 'black' | 'white' }> = ({ color = 'black' }) => {
  return (
    <div className="h-[42px] w-[230px]  md:hidden">
      {color === 'black' ? <LogoBlack /> : <LogoWhite />}
    </div>
  );
};

export default Logo;
