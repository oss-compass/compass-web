import React, { useState } from 'react';
import { BsFillBookmarkFill, BsBookmark } from 'react-icons/bs';

const SubscribeButton = () => {
  const [sub, setSub] = useState(false);
  return (
    <div
      className="ml-6 flex cursor-pointer select-none items-center rounded-full border border-[#CFCFCF] py-1 px-2 hover:bg-gray-100"
      onClick={() => {
        setSub((pre) => !pre);
      }}
    >
      {sub ? (
        <>
          <BsBookmark className="text-base " />
          <div className="mr-1 ml-2 text-sm">Subscribe</div>
        </>
      ) : (
        <>
          <BsFillBookmarkFill className="text-base text-primary" />
          <div className="mr-1 ml-2 text-sm">Subscribed</div>
        </>
      )}

      <div className="rounded-full border border-[#EAEAEA] bg-[#F8F9FB] px-1 text-xs">
        1354
      </div>
    </div>
  );
};

export default SubscribeButton;
