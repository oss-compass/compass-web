import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AiOutlineUser } from 'react-icons/ai';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { ModelDetail } from '@oss-compass/graphql';
import ModelItemMore from './ModelItemMore';
import VersionCreate from './VersionCreate';
import VersionCard from './VersionCard';
import ShareBtn from '@modules/lab/model/components/ShareBtn';
import ForkFrom from '@modules/lab/model/components/ForkFrom';

const ModelItem = ({
  model,
  event$,
}: {
  model: any;
  event$: EventEmitter<string>;
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const permissions = model?.permissions;
  const parentLabModel = model?.parentLabModel;

  return (
    <div className="mb-8 bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <div className="mb-2 flex items-center text-lg font-semibold">
          <a
            className="cursor-pointer"
            onClick={() => {
              router.push(`/lab/model/${model.id}/detail`);
            }}
          >
            {model.name}
          </a>

          {model.isPublic ? (
            <span className="ml-2 rounded-2xl bg-[#cdf0ce] px-2 py-0.5  text-xs text-[#00B400]">
              {t('lab:is_public')}
            </span>
          ) : null}
          {parentLabModel?.id ? (
            <ForkFrom
              id={parentLabModel?.id}
              name={parentLabModel?.name}
            ></ForkFrom>
          ) : (
            ''
          )}
        </div>
        <div className="flex items-center">
          {model.isPublic ? <ShareBtn id={model.id} /> : null}
          <div
            className="flex cursor-pointer items-center"
            onClick={() => {
              router.push(`/lab/model/${model.id}/user`);
            }}
          >
            <AiOutlineUser className="text-[#666]" />
            <div className="ml-1 text-sm">{t('lab:user_management')}</div>
          </div>
          <ModelItemMore
            modelId={model.id}
            event$={event$}
            permissions={permissions}
          />
        </div>
      </div>
      {model?.description ? (
        <div className="text-secondary my-3 text-sm font-semibold">
          {/* {t('lab:description')} */}
          <span className="line-clamp-3 text-base font-normal text-black">
            {model.description}
          </span>
        </div>
      ) : (
        ''
      )}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-secondary text-sm font-semibold">
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

      <div className="grid grid-cols-3 gap-4 md:grid-cols-1">
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
