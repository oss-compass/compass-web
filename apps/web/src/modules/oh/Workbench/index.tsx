import React from 'react';
import Side from '@modules/oh/Workbench/Side';
import Mian from '@modules/oh/Workbench/Main';
import NavDatePicker from '@modules/oh/components/NavDatePicker';
import StickyNav from '@common/components/Header/StickyNav';
import Header from '@common/components/Header';

const NavBarContent = () => {
  return (
    <nav className="flex h-14 items-center justify-between border-b border-t bg-white px-6 md:h-12 md:px-4">
      <div className="relative flex h-6 flex-1 items-center overflow-hidden text-xl font-semibold text-black">
        OpenHarmony TPC 孵化治理看板
      </div>
      <NavDatePicker />
    </nav>
  );
};

const NavBar = () => {
  return (
    <StickyNav className=">md:-top-[80px] md:-top-[48px]">
      <Header />
      <NavBarContent />
    </StickyNav>
  );
};

const Process = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-1 bg-[#f2f2f2]">
        <Side />
        <Mian />
      </div>
    </>
  );
};

export default Process;
