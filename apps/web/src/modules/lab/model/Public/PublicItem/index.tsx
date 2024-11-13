import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ModelPublicOverview } from '@oss-compass/graphql';
import ProductivityIcon from '@modules/analyze/components/SideBar/assets/Productivity.svg';
import { formatToNow } from '@common/utils/time';
import MetricsName from './MetricsName';

const PublicItem: React.FC<{
  model: ModelPublicOverview;
  fullWidth?: boolean;
}> = ({ fullWidth = false, model }) => {
  const { modelName, modelId, description, metrics, loginBinds, createdAt } =
    model;
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/lab/model/${modelId}/detail`);
      }}
      className="flex cursor-pointer flex-col items-start gap-1 overflow-hidden border p-[15px] hover:shadow-[0px_4px_6px_0px_rgba(0,0,0,0.09)]"
    >
      <div className="flex items-center gap-2 self-stretch">
        <span className="mr-1 h-4 w-4 flex-shrink-0">
          <ProductivityIcon />
        </span>
        <div
          className="line-clamp-1 text-slate-auto-900 break-all text-lg font-medium leading-7"
          title={modelName}
        >
          {modelName}
        </div>
      </div>
      <MetricsName metrics={metrics} modelId={modelId} />

      <div className="line-clamp-2 my-1 h-8 text-xs leading-4 text-[#585858]">
        {description}
      </div>
      <div className="flex items-center gap-2 self-stretch pt-2 md:gap-3">
        <div className="mr-auto flex min-w-0 items-center gap-2">
          <span className="border-secondary relative flex h-[24px] w-[24px] cursor-pointer items-center justify-center overflow-hidden rounded-full border group-hover:bg-[#333333]">
            <Image
              src={loginBinds?.avatarUrl!}
              unoptimized
              fill
              sizes="24px"
              style={{
                objectFit: 'cover',
              }}
              alt=""
            />
          </span>
          <div className="text-slate-auto-700 overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-6">
            {loginBinds?.nickname}
          </div>
        </div>
        <div className="whitespace-nowrap text-sm leading-[normal]">
          <time>{formatToNow(createdAt)}</time>
        </div>
      </div>
    </div>
  );
};

export default PublicItem;
