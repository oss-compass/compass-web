import React, { PropsWithChildren } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

export const ItemCard = ({
  onHandleEdit,
  onHandleDelete,
}: {
  onHandleEdit: () => void;
  onHandleDelete: () => void;
}) => {
  return (
    <div className="flex h-24 flex-col border border-[#CCCCCC] bg-[#FAFAFA] p-3">
      <div className="flex-1">
        <div>Deep Learning Frameworks</div>
        <div className="text-xs text-[#585858]">12 projects selected</div>
      </div>
      <div className="flex justify-end text-[#585858]">
        <div
          className="cursor-pointer p-1"
          onClick={() => {
            onHandleEdit();
          }}
        >
          <RiDeleteBinLine />
        </div>
      </div>
    </div>
  );
};

export const ItemCardPlus = ({ onHandleAdd }: { onHandleAdd: () => void }) => {
  return (
    <div
      className="flex h-24 cursor-pointer flex-col items-center justify-center border border-[#CCCCCC]  p-3 text-lg"
      onClick={() => {
        onHandleAdd();
      }}
    >
      <AiOutlinePlus />
    </div>
  );
};
