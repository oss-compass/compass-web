import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

const VersionCreate = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="hover:bg-smoke flex min-h-[160px] cursor-pointer flex-col  items-center  justify-center border bg-[#FAFAFA] "
      onClick={() => onClick()}
    >
      <AiOutlinePlus />
    </div>
  );
};

export default VersionCreate;
