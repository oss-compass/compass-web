import React, { useContext, useState } from 'react';
import dynamic from 'next/dynamic';
import DatePicker from './DatePicker';

const DynamicContrastItems = dynamic(() => import('./ContrastItems'), {
  ssr: false,
});

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 z-[1000] flex h-14 flex-shrink-0 items-center justify-between border-b border-t bg-white px-6">
      <DynamicContrastItems />
      <DatePicker />
    </nav>
  );
};

export default NavBar;
