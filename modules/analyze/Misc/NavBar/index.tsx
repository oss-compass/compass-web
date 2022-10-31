import React from 'react';
import classnames from 'classnames';
import LabelItems from './LabelItems';
import DatePicker from './DatePicker';
import MobileDatePicker from './MobileDatePicker';

const NavBar = () => {
  return (
    <nav
      className={classnames(
        'sticky top-0 left-0 right-0 z-nav flex h-14 flex-shrink-0 items-center justify-between border-b border-t bg-white px-6',
        'md:h-12 md:px-4'
      )}
    >
      <LabelItems />
      <DatePicker />
      <MobileDatePicker />
    </nav>
  );
};

export default NavBar;
