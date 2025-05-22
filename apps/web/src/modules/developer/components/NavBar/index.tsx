import React from 'react';
import classnames from 'classnames';
import LabelItems from './LabelItems';
import NavDatePicker from './NavDatePicker';

const NavBar = () => {
  return (
    <nav
      className={classnames(
        'flex h-14 items-center justify-between border-b border-t bg-white px-6',
        'md:h-12 md:px-4'
      )}
    >
      <LabelItems />
      <div className="flex items-center text-[#585858]">
        <NavDatePicker />
      </div>
    </nav>
  );
};

export default NavBar;
