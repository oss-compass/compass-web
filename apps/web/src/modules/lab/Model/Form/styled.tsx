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

export const BadgeCount = ({ count = 0 }: { count: number }) => {
  return (
    <span className="bg-primary h-4 min-w-[16px] shrink-0 rounded-full text-center text-xs leading-4 text-white">
      {count}
    </span>
  );
};
