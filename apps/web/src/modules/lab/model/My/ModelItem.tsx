import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AiOutlineUser } from 'react-icons/ai';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { ModelDetail, useDeleteLabModelMutation } from '@oss-compass/graphql';
import ModelItemMore from './ModelItemMore';

import IconProductivity from '@public/images/analyze/topic/Productivity.svg';
import IconRobustness from '@public/images/analyze/topic/Robustness.svg';
import IconNicheCreation from '@public/images/analyze/topic/NicheCreation.svg';

import VersionCreate from './VersionCreate';
import VersionCard from './VersionCard';

const ModelItem = ({
  model,
  event$,
}: {
  model: ModelDetail;
  event$: EventEmitter<string>;
}) => {
  const router = useRouter();
  const { t } = useTranslation();

  const permissions = model?.permissions;

  const dimensionLogo = {
    '0': (
      <>
        <IconProductivity className="h-[21px] w-[21px]" />
        <span className="ml-2 text-sm">{t('common:topic.productivity')}</span>
      </>
    ),
    '1': (
      <>
        <IconRobustness className="h-[21px] w-[21px]" />
        <span className="ml-2 text-sm">{t('common:topic.robustness')}</span>
      </>
    ),
    '2': (
      <>
        <IconNicheCreation className="h-[21px] w-[21px]" />
        <span className="ml-2 text-sm">{t('common:topic.niche_creation')}</span>
      </>
    ),
  };

  return (
    <div className="mb-8 bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {dimensionLogo[`${model.dimension}`]}
        </div>
        <div className="flex items-center">
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

      <div className="mb-2 flex items-center text-lg font-semibold">
        {model.name}
        {model.isPublic ? (
          <span className="ml-2 rounded-2xl bg-[#cdf0ce] px-2 py-0.5  text-xs text-[#00B400]">
            Public
          </span>
        ) : null}
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="text-secondary text-sm font-semibold">
          {t('lab:versions')}
        </div>
        <div className="text-sm">
          <span className="text-secondary">
            {t('lab:remaining_times_of_analysis_performed_this_week')}
          </span>
          <span className="ml-1 font-semibold text-black">
            {model.triggerRemainingCount}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {model.latestVersions?.map?.((item) => {
          return (
            <VersionCard
              key={item.id}
              modelId={model.id}
              event$={event$}
              version={item}
              permissions={permissions}
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
