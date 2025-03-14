import React from 'react';
import Image from 'next/image';
import { formatToNow } from '@common/utils/time';
import { MEMBER_MAP } from '@modules/oh/constant';

const ApproveContent = ({ item }: { item: any }) => {
  const { state, memberType } = item;

  return (
    <>
      <div className="flex pb-4">
        <div className="relative h-8 w-8  shrink-0 overflow-hidden rounded-full">
          <Image
            src={
              item?.user?.loginBinds[0]?.avatarUrl ||
              '/images/default-avatar.png'
            }
            unoptimized
            fill
            sizes="64px"
            style={{
              objectFit: 'cover',
            }}
            alt={'avatar'}
          />
        </div>
        <div className="flex-1 pl-2">
          <div className="mt-1 flex items-center justify-between">
            <div className=" flex items-center ">
              <div className="text-sm font-medium">{item?.user?.name}</div>
              <div className="text-secondary ml-2 text-xs">
                {formatToNow(item?.updatedAt)}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        {MEMBER_MAP[memberType]}
        {state === 1 ? ' 评审通过' : ' 驳回'}
      </div>
    </>
  );
};

export default ApproveContent;
