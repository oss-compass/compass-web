import React from 'react';
import StickyNav from '@common/components/Header/StickyNav';
import NavDatePicker from '@modules/analyze/components/NavBar/NavDatePicker';

const NavBarContent = () => {
  return (
    <nav className="flex h-14 items-center justify-between border-b border-t bg-white px-6 md:h-12 md:px-4">
      <div className="relative flex h-6 flex-1 items-center overflow-hidden text-xl font-semibold text-black">
        OpenHarmony TPC
      </div>
      <NavDatePicker />
    </nav>
  );
};

const NavBar = () => {
  return (
    <StickyNav className=">md:-top-[80px] md:-top-[48px]">
      <NavBarContent />
    </StickyNav>
  );
};

export default NavBar;
