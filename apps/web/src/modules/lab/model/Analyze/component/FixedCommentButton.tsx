import React, { useState } from 'react';
import { BiMessageAltDetail } from 'react-icons/bi';

const FixedCommentButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="border-silver hover:bg-smoke fixed top-[200px] right-0 flex h-10 w-12 cursor-pointer items-center justify-center  rounded-l-full border bg-white pl-1 md:hidden"
      onClick={onClick}
    >
      <BiMessageAltDetail className="text-xl" />
    </div>
  );
};

export default FixedCommentButton;
