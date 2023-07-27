import React from 'react';
import router from 'next/router';
import Logo from '@public/images/logos/compass-logo.svg';

const LogoHeader = () => {
  return (
    <div className="flex h-20 items-center justify-center border-0 border-b border-solid border-[#CFCFCF]">
      <div
        className="cursor-pointer"
        onClick={() => {
          router.push('/');
        }}
      >
        <Logo />
      </div>
    </div>
  );
};

export default LogoHeader;
