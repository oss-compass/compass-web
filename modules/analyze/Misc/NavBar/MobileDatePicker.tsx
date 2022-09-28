import React from 'react';
import { BiCalendar } from 'react-icons/bi';

const MobileDatePicker = () => {
  return (
    <div className="flex items-center >md:hidden">
      <span>3M</span>
      <BiCalendar className="ml-1 text-xl" />
    </div>
  );
};

export default MobileDatePicker;
