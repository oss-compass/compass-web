import React from 'react';
import { BiMessageAltDots } from 'react-icons/bi';

const CardHeadButtons = () => {
  return (
    <div className="flex cursor-pointer items-center">
      <span className="mr-2 text-sm">Discussion</span>
      <BiMessageAltDots />
    </div>
  );
};

export default CardHeadButtons;
