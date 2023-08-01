import React, { PropsWithChildren } from 'react';
import { twMerge } from 'tailwind-merge';
import classnames from 'classnames';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { AiOutlinePlus } from 'react-icons/ai';

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

export const RepoCard = ({ select = false }: { select?: boolean }) => {
  const provider = 'gitee';
  return (
    <div
      className={classnames('relative cursor-pointer bg-white', [
        select ? ['border-blue-600', 'border-2'] : ['border', 'p-px'],
      ])}
      onClick={async () => {}}
    >
      <div className="py-2.5 px-4">
        <div className="absolute bottom-4 right-4">
          <input checked={select} type="checkbox" onChange={() => {}} />
        </div>
        <div>
          <div className="h-20">
            <p
              className={classnames(
                'mb-1 truncate break-words text-xl font-bold '
              )}
            >
              openGauss-server
            </p>
            <p className="h-6 truncate text-sm text-gray-400">sebasti</p>
          </div>
        </div>

        <div className="flex w-full items-center">
          <div className="mr-auto flex-1">
            {provider ? (
              provider === 'gitee' ? (
                <SiGitee className="inline-block h-5 w-5 text-[#c71c27]" />
              ) : (
                <AiFillGithub className="inline-block h-5 w-5 text-[#000000]" />
              )
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
