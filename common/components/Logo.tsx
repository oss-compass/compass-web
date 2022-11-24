import React from 'react';
import LogoBlack from '../svgs/compass-black.svg';
import LogoWhite from '../svgs/compass-white.svg';

const Logo: React.FC<{ color: 'black' | 'white' }> = ({ color = 'black' }) => {
  return (
    <div className="h-[42px] w-[230px]  md:hidden">
      {color === 'black' ? <LogoBlack /> : <LogoWhite />}
    </div>
  );
};

export default Logo;
