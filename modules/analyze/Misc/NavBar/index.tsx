import React from 'react';
import dynamic from 'next/dynamic';
import DatePicker from './DatePicker';

const DynamicCompareItems = dynamic(() => import('./CompareItems'), {
  ssr: false,
});

const NavBar = () => {
  return (
    <nav className="sticky top-0 left-0 right-0 z-[1000] flex h-14 flex-shrink-0 items-center justify-between border-b border-t bg-white px-6">
      <DynamicCompareItems />
      <DatePicker />
    </nav>
  );
};

export default NavBar;
