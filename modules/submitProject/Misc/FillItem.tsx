import React from 'react';
import { AiFillGithub, AiOutlineClose } from 'react-icons/ai';

const FillItem: React.FC<{ url: string; onDelete: (v: string) => void }> = ({
  url,
  onDelete,
}) => {
  return (
    <div className="mb-6 flex max-w-[600px] items-center">
      <div className="flex flex-1 items-center">
        <AiFillGithub className="mr-2" />
        <p className="max-w-[400px] truncate">{url}</p>
      </div>
      <div
        className="cursor-pointer p-2 transition-all hover:bg-gray-200"
        onClick={() => onDelete(url)}
      >
        <AiOutlineClose />
      </div>
    </div>
  );
};

export default FillItem;
