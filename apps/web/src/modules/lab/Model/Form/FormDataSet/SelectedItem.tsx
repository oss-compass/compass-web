import React, { PropsWithChildren, useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';

export const ItemCard = ({
  ident,
  count,
  onHandleEdit,
  onHandleDelete,
}: {
  ident: string;
  count: number;
  onHandleEdit: () => void;
  onHandleDelete: () => void;
}) => {
  const [openConfirm, setOpenConfirm] = useState(false);

  return (
    <>
      <div className="flex h-24 flex-col border border-[#CCCCCC] bg-[#FAFAFA] p-3">
        <div className="flex-1">
          <div className="text-sm font-medium">{ident}</div>
          <div className="text-xs text-[#585858]">
            {count} projects selected
          </div>
        </div>
        <div className="flex justify-end text-[#585858]">
          <div
            className="mr-1 cursor-pointer p-1"
            onClick={() => {
              setOpenConfirm(true);
            }}
          >
            <RiDeleteBinLine />
          </div>
          <div
            className="cursor-pointer p-1"
            onClick={() => {
              onHandleEdit();
            }}
          >
            <FiEdit />
          </div>
        </div>
      </div>

      <Dialog
        open={openConfirm}
        dialogTitle={<>确定</>}
        dialogContent={<div className="w-96">确认删除?</div>}
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              取消
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              onClick={() => {
                onHandleDelete();
              }}
            >
              确定
            </Button>
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
    </>
  );
};

export const ItemCardPlus = ({ onHandleAdd }: { onHandleAdd: () => void }) => {
  return (
    <div
      className="hover:bg-smoke flex h-24 cursor-pointer flex-col items-center justify-center border  border-[#CCCCCC] p-3  text-lg"
      onClick={() => {
        onHandleAdd();
      }}
    >
      <AiOutlinePlus />
    </div>
  );
};
