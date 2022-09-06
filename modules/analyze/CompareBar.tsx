import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const CompareBar = () => {
  const [showInput, setShowInput] = useState(false);
  return (
    <div className="mb-8 flex h-[100px] overflow-hidden rounded-xl">
      <div className="flex-1 bg-[#3A5BEF]"></div>
      <div
        className="ml-0.5 w-24 flex-shrink-0 cursor-pointer bg-[#00B5EA] text-white transition-all hover:w-[300px]"
        onMouseEnter={() => {
          setShowInput(true);
        }}
        onMouseLeave={() => {
          setShowInput(false);
        }}
      >
        {showInput ? (
          <div className="flex h-full w-full items-center justify-center ">
            <div className="flex items-center rounded  border ">
              <input
                type="text"
                className="h-10 w-36 bg-transparent px-2 py-1 text-white outline-0 placeholder:text-neutral-300"
                placeholder="Pick a project"
              />
              <button className="h-10 w-24 bg-white text-[#00B5EA] hover:bg-gray-100">
                compare
              </button>
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <AiOutlinePlus className="text-2xl" />
            <div>compare</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareBar;
