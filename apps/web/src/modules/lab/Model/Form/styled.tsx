import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';
import {
  getAnalyzeLink,
  getNameSpace,
  getShortAnalyzeLink,
  getProvider,
  getRepoName,
} from '@common/utils';
import { SiGitee } from 'react-icons/si';
import { AiFillGithub } from 'react-icons/ai';

export const FormItemLabel: React.FC<
  PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
  return (
    <div className={twMerge('mb-3 font-medium', className)}>{children}</div>
  );
};

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
  return (
    <div className="flex h-24 flex-col border border-[#CCCCCC] bg-[#FAFAFA] p-3">
      <div className="flex-1">
        <div>{ident}</div>
        <div className="text-xs text-[#585858]">{count} projects selected</div>
      </div>
      <div className="flex justify-end text-[#585858]">
        <div
          className="mr-1 cursor-pointer p-1"
          onClick={() => {
            onHandleDelete();
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

export const BadgeCount = ({ count = 0 }: { count: number }) => {
  return (
    <span className="bg-primary h-4 w-4 shrink-0 rounded-full text-center text-xs leading-4 text-white">
      {count}
    </span>
  );
};
