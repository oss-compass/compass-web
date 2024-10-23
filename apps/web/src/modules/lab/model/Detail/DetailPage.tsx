import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AiOutlineUser } from 'react-icons/ai';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { ModelDetail, useDeleteLabModelMutation } from '@oss-compass/graphql';
import ModelItemMore from '../My/ModelItemMore';
import Image from 'next/image';
// import Version from './Version';
import VersionCreate from '../My/VersionCreate';
import VersionCard from '../My/VersionCard';
import { formatToNow } from '@common/utils/time';

const ModelItem = ({
  model,
  event$,
}: {
  model: ModelDetail;
  event$: EventEmitter<string>;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { description, name, id, createdAt, loginBinds } = model;
  const permissions = model?.permissions;

  return (
    <div className="mb-8 w-full p-4">
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center">
          {dimensionLogo[`${model.dimension}`]}
        </div> */}
        <div className="mb-2 flex items-center text-3xl font-bold">
          <a className="cursor-default">{name}</a>

          {model.isPublic ? (
            <span className="ml-2 rounded-2xl bg-[#cdf0ce] px-2 py-0.5  text-xs text-[#00B400]">
              {t('lab:is_public')}
            </span>
          ) : null}
        </div>
        <div className="flex items-center">
          {permissions?.canUpdate ? (
            <div
              className="flex cursor-pointer items-center"
              onClick={() => {
                router.push(`/lab/model/${model.id}/user`);
              }}
            >
              <AiOutlineUser className="text-[#666]" />
              <div className="ml-1 text-sm">{t('lab:user_management')}</div>
            </div>
          ) : null}
          <ModelItemMore
            modelId={model.id}
            event$={event$}
            permissions={permissions}
          />
        </div>
      </div>
      <div className="mb-4 flex items-center justify-start gap-2 md:gap-3">
        <div className="mr-2 flex min-w-0 items-center gap-2">
          <span className="border-secondary relative flex h-[20px] w-[20px] cursor-pointer items-center justify-center overflow-hidden rounded-full border group-hover:bg-[#333333]">
            <Image
              src={loginBinds?.avatarUrl!}
              unoptimized
              fill
              sizes="20px"
              style={{
                objectFit: 'cover',
              }}
              alt=""
            />
          </span>
          <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm leading-6 text-[#585858]">
            {loginBinds?.nickname}
          </div>
        </div>
        <div className="whitespace-nowrap text-sm leading-[normal] text-[#585858]">
          <time>{formatToNow(createdAt)}</time>
        </div>
      </div>
      {description ? (
        <div className="text-secondary mb-2 text-sm font-semibold">
          {/* {t('lab:description')} */}
          <span className="text-base font-normal text-black">
            {description}
          </span>
        </div>
      ) : (
        ''
      )}
      <div className="mt-6 mb-2 flex items-center justify-between">
        <div className="text-secondary text-base font-semibold">
          {t('lab:versions')}
        </div>
        {/* <div className="text-sm">
          <span className="text-secondary">
            {t('lab:remaining_times_of_analysis_performed_this_week')}
          </span>
          <span className="ml-1 font-semibold text-black">
            {model.triggerRemainingCount}
          </span>
        </div> */}
      </div>

      <div className="grid grid-cols-4 gap-4 md:grid-cols-1">
        {model.latestVersions?.map?.((item) => {
          return (
            <VersionCard
              model={model}
              key={item.id}
              version={item}
              permissions={permissions}
              event$={event$}
              modelDefaultVersionId={model?.defaultVersion?.id}
            />
          );
        })}

        {permissions?.canUpdate ? (
          <VersionCreate
            onClick={() => {
              router.push(`/lab/model/${model.id}/version/create`);
            }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ModelItem;
