import React from 'react';
import { useRouter } from 'next/router';
import { AiOutlineUser } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Popper } from '@oss-compass/ui';
import { ModelDetail } from '@oss-compass/graphql';
import IconProductivity from '@public/images/analyze/topic/Productivity.svg';

import { VersionCard, VersionCreate } from './VersionItem';

const ItemMore = ({ modelId }: { modelId: number }) => {
  const router = useRouter();
  return (
    <Popper
      placement="bottom-end"
      content={
        <div className="w-24 rounded bg-white shadow">
          <div
            className="cursor-pointer border-b px-2 py-2 text-sm"
            onClick={() => {
              router.push(`/lab/model/${modelId}/edit`);
            }}
          >
            编辑
          </div>
          <div className="cursor-pointer border-b px-2 py-2 text-sm">删除</div>
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

const ModelItem = ({ model }: { model: ModelDetail }) => {
  const router = useRouter();
  return (
    <div className="mb-8 bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <IconProductivity className="h-[21px] w-[21px]" />
          <span className="ml-2 text-sm">Productivity</span>
        </div>
        <div className="flex items-center">
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              router.push(`/lab/model/${model.id}/user`);
            }}
          >
            <AiOutlineUser className="text-[#666]" />
            <div className="ml-1 text-sm">用户管理</div>
          </div>
          <ItemMore modelId={model.id} />
        </div>
      </div>

      <div className="mb-2 text-lg font-semibold">{model.name}</div>
      <div className="mb-2 flex items-center justify-between">
        <div className="text-secondary text-sm font-semibold">版本</div>
        <div className="text-sm">
          <span className="text-secondary">本周剩余分析次数</span>
          <span className="ml-1 font-semibold text-black">2 次</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {model.latestVersions?.map?.((item) => {
          return (
            <VersionCard key={item.id} modelId={model.id} version={item} />
          );
        })}
        <VersionCreate
          onClick={() => {
            router.push(`/lab/model/${model.id}/version/create`);
          }}
        />
      </div>
    </div>
  );
};

export default ModelItem;
