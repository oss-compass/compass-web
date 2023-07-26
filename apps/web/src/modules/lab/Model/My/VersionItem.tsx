import React from 'react';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Popper } from '@oss-compass/ui';

const ItemMore = () => {
  const router = useRouter();
  return (
    <Popper
      placement="bottom-end"
      content={
        <div className="w-24 rounded bg-white shadow">
          <div
            className="cursor-pointer border-b px-2 py-2 text-sm"
            onClick={() => {
              router.push('/lab/model/create');
            }}
          >
            编辑
          </div>
          {/*<div className="px-2 py-2 text-sm"></div>*/}
          {/*<div className="px-2 py-2 text-sm"></div>*/}
        </div>
      }
    >
      {(trigger) => (
        <div
          className="ml-2 cursor-pointer p-2 text-sm"
          onClick={(e) => trigger(e)}
        >
          <FiMoreHorizontal />
        </div>
      )}
    </Popper>
  );
};

export const VersionCreate = () => {
  return (
    <div className="flex flex-col border bg-[#FAFAFA]">
      <div className="flex-1"></div>
    </div>
  );
};

export const VersionCard = () => {
  return (
    <div className="flex flex-col border bg-[#FAFAFA]">
      <div className="flex-1">
        <div className="flex justify-between px-3 py-2">
          <div className="flex-1 truncate font-bold">
            v20230711v20230711v20230711v20230711.214155
          </div>
          <ItemMore />
        </div>
        <div className="px-3 pb-2">
          <div>
            <span className="text-secondary text-xs">数据集：</span>
          </div>
          <div>
            <span className="text-secondary text-xs">度量指标：</span>
          </div>
          <div>
            <span className="text-secondary text-xs">模型算法：</span>
          </div>
        </div>
      </div>
      <div className="flex h-8 border-t py-3">
        <div className="flex w-1/2 cursor-pointer items-center justify-center border-r">
          <span className="text-sm">触发分析</span>
        </div>
        <div className="flex w-1/2 cursor-pointer items-center justify-center">
          <span className="text-sm">查看报告</span>
        </div>
      </div>
    </div>
  );
};
