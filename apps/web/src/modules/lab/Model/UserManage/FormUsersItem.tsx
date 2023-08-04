import React, { PropsWithChildren, useState, useRef } from 'react';
import { User } from './type';
import Image from 'next/image';
import classNames from 'classnames';
import { RiDeleteBinLine } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const FormUsersItem = (props: { user: User }) => {
  const { user } = props;
  return (
    <div
      className={classNames('flex h-32 flex-col border border-[#CCCCCC] p-4', [
        user.confirmed
          ? 'bg-[#FFFFFF] text-[#000000]'
          : 'bg-[#FAFAFA] text-[#868690]',
      ])}
    >
      <div className="flex">
        <div className="mr-4 flex">
          <Image
            src={user?.image!}
            unoptimized
            width={48}
            height={48}
            alt=""
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="font-medium">{user.name}</div>
          <div className="mt-1 text-xs text-[#868690]">
            {user.confirmed
              ? '加入于 : ' + user.joinTime
              : '邀请已发出，等候对方确认加入'}
          </div>
        </div>
      </div>
      <div className="ml-16 flex">
        {user.roles.map((item) => {
          return (
            <div
              key={item}
              className={classNames(
                'mr-2 h-5 cursor-pointer rounded py-0.5 px-1.5 text-xs ',
                [
                  user.confirmed
                    ? 'bg-[#00B400]/10 text-[#00B400]'
                    : 'bg-[#F0F0F0] text-[#868690]',
                ]
              )}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div className="mt-1.5 flex h-5 justify-end">
        {user.confirmed ? (
          user.isOwner ? (
            <div className="rounded-full bg-[#3A5BEF] px-2 pt-0.5 text-xs text-[#ffffff]">
              Owner
            </div>
          ) : (
            <div className="flex text-[#585858]">
              <div className="mr-1 cursor-pointer p-1">
                <RiDeleteBinLine />
              </div>
              <div className="cursor-pointer p-1">
                <FiEdit />
              </div>
            </div>
          )
        ) : (
          <div className="flex cursor-pointer text-[#868690]">
            <div className="pt-1 pr-1">
              <AiOutlineCloseCircle />
            </div>
            <div>取消邀请</div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FormUsersItem;
