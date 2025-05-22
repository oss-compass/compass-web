import { useEffect, useState } from 'react';
import { BiChat, BiGitPullRequest, BiGitCommit } from 'react-icons/bi';

const RightPan = () => {
  const userInfo = [
    // {
    //   icon: <TfiWorld className="h-4 w-4" />,
    //   label: userData?.location || 'Shenzhen',
    //   tooltipContent: '国家: China',
    // },
    // {
    //   icon: <IoLocationOutline className="h-4 w-4" />,
    //   label: userData?.location || 'Shenzhen',
    //   tooltipContent: '地址: Shenzhen',
    // },
    // {
    //   icon: <GoOrganization className="h-4 w-4" />,
    //   label: userData?.company || 'Huawei',
    //   tooltipContent: '组织: Huawei',
    // },
  ];

  return (
    <div className="relative flex w-[400px] flex-shrink-0 flex-col gap-4">
      <div className="flex flex-1 items-center justify-between rounded-lg border-2 border-transparent bg-white p-6 drop-shadow-sm">
        <div className="flex">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#e0edff] text-[28px] text-[#6da7ff]">
            <BiGitCommit />
          </div>
          <div className="flex flex-col justify-between gap-1">
            <div className="text-xs text-gray-500">Commits</div>
            <div className="line-clamp-1 text-2xl">523</div>
          </div>
        </div>
        <div className="float-right text-sm text-gray-500">
          <div>
            Top <span className="text-xl font-bold text-[#ff2366]">25%</span> in
            China
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-between rounded-lg border-2 border-transparent bg-white p-6 drop-shadow-sm">
        <div className="flex">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#fffae5] text-[28px] text-[#ffd950]">
            <BiGitCommit />
          </div>
          <div className="flex flex-col justify-between gap-1">
            <div className="text-xs text-gray-500">Commits</div>
            <div className="line-clamp-1 text-2xl">523</div>
          </div>
        </div>
        <div className="float-right text-sm text-gray-500">
          <div>
            Top <span className="text-xl font-bold text-[#02bc77]">25%</span> in
            China
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-between rounded-lg border-2 border-transparent bg-white p-6 drop-shadow-sm">
        <div className="flex">
          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#d8f5ea] text-[28px] text-[#27c68b]">
            <BiGitCommit />
          </div>
          <div className="flex flex-col justify-between gap-1">
            <div className="text-xs text-gray-500">Commits</div>
            <div className="line-clamp-1 text-2xl">523</div>
          </div>
        </div>
        <div className="float-right text-sm text-gray-500">
          <div>
            Top <span className="text-xl font-bold text-[#ff2366]">25%</span> in
            China
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightPan;
