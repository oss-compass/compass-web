import React from 'react';
import classnames from 'classnames';
import { NoSsr } from '@mui/base';
import LabelItems from './LabelItems';
import DatePicker from './DatePicker';
import MobileDatePicker from './MobileDatePicker';

const NavBar = () => {
  return (
    <NoSsr>
      <nav
        className={classnames(
          'flex h-14 items-center justify-between border-b border-t bg-white px-6',
          'md:h-12 md:px-4'
        )}
      >
        <LabelItems />
        <DatePicker />
        <MobileDatePicker />
      </nav>
    </NoSsr>
  );
};

export default NavBar;
