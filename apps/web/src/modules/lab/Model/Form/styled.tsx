import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

export const FormItemLabel: React.FC<
  PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div className={twMerge('mb-3 font-medium', className)}>{children}</div>
  );
};

export const ItemCard = () => {
  return (
    <div className="flex h-24 flex-col border border-[#CCCCCC] bg-[#FAFAFA] p-3">
      <div className="flex-1">
        <div>Deep Learning Frameworks</div>
        <div className="text-xs text-[#585858]">12 projects selected</div>
      </div>
      <div className="flex justify-end text-[#585858]">
        <div className="mr-1 cursor-pointer p-1">
          <RiDeleteBinLine />
        </div>
        <div className="cursor-pointer p-1">
          <FiEdit />
        </div>
      </div>
    </div>
  );
};

export const ItemCardPlus = () => {
  return (
    <div className="flex h-24 flex-col items-center justify-center border border-[#CCCCCC] p-3  text-lg">
      <AiOutlinePlus />
    </div>
  );
};
