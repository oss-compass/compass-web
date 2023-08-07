import React from 'react';
import { useRouter } from 'next/router';
import uniq from 'lodash/uniq';
import { AiOutlinePlus } from 'react-icons/ai';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { ModelVersion } from '@oss-compass/graphql';
import VersionItemMore from './VersionItemMore';

export const VersionCreate = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="flex min-h-[160px] cursor-pointer flex-col items-center  justify-center  border bg-[#FAFAFA]"
      onClick={() => onClick()}
    >
      <AiOutlinePlus />
    </div>
  );
};

export const VersionCard = ({
  version,
  modelId,
  event$,
}: {
  modelId: number;
  version: ModelVersion;
  event$: EventEmitter<string>;
}) => {
  const router = useRouter();

  const dataSetIdent = version?.dataset?.items?.map?.((i) => i.secondIdent);
  const dataSetNames = uniq(dataSetIdent).join(',');
  const metricsNames = version?.metrics?.map?.((i) => i.name).join(',');

  return (
    <div className="flex flex-col border bg-[#FAFAFA]">
      <div className="flex-1">
        <div className="flex justify-between px-3 py-2">
          <div className="flex-1 truncate font-bold">{version.version}</div>
          <VersionItemMore
            modelId={modelId}
            versionId={version.id}
            event$={event$}
          />
        </div>
        <div className="px-3 pb-2">
          <div className="mb-2">
            <span className="text-secondary block truncate text-xs">
              数据集：{dataSetNames}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-secondary block truncate  text-xs">
              度量指标：{metricsNames}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-secondary block truncate text-xs">
              模型算法：默认
            </span>
          </div>
        </div>
      </div>
      <div className="flex h-8 border-t py-3">
        <div className="flex w-1/2 cursor-pointer items-center justify-center border-r">
          <span className="text-sm">触发分析</span>
        </div>
        <div
          className="flex w-1/2 cursor-pointer items-center justify-center"
          onClick={() => {
            router.push(`/lab/model/${modelId}/version/${version.id}`);
          }}
        >
          <span className="text-sm">查看报告</span>
        </div>
      </div>
    </div>
  );
};
