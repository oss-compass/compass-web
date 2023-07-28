import React from 'react';
import Image from 'next/image';

const MemberCard = (props: { name: string; avatar: string; intro: string }) => {
  const { name, avatar, intro } = props;
  return (
    <div className="flex">
      <div className="mr-4 h-12 w-12 shrink-0 overflow-hidden rounded-full">
        <Image
          src={avatar}
          width={48}
          height={48}
          alt=""
          style={{
            maxWidth: '100%',
            height: 'auto',
          }}
        />
      </div>
      <div className="flex flex-col pt-1.5">
        <div className="mb-1 text-sm font-medium">{name}</div>
        <div className="text-xs">{intro}</div>
      </div>
    </div>
  );
};

export default MemberCard;
