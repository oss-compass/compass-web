import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AiOutlineUser } from 'react-icons/ai';
import { PiShareFatLight } from 'react-icons/pi';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { ModelDetail, useDeleteLabModelMutation } from '@oss-compass/graphql';
import ModelItemMore from './ModelItemMore';

import IconProductivity from '@public/images/analyze/topic/Productivity.svg';
import IconRobustness from '@public/images/analyze/topic/Robustness.svg';
import IconNicheCreation from '@public/images/analyze/topic/NicheCreation.svg';

import VersionCreate from './VersionCreate';
import VersionCard from './VersionCard';
import toast from 'react-hot-toast';

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

  return (
    <div className="mb-8 bg-white p-4 shadow">
      <div className="flex items-center justify-between">
        {/* <div className="flex items-center">
          {dimensionLogo[`${model.dimension}`]}
        </div> */}
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
        </div>
        <div className="flex items-center">
          {model.isPublic ? (
            <div
              className="mr-2 flex cursor-pointer items-center"
              onClick={() => {
                if (navigator.clipboard?.writeText) {
                  let source = `https://oss-compass.org/lab/model/${model.id}/detail`;
                  navigator.clipboard
                    .writeText(source)
                    .then((value) => {
                      toast.success(t('lab:copy_successfully'));
                    })
                    .catch((err) => {
                      toast.error('Failed! No copy permission');
                    });
                } else {
                  toast.error('Failed! Not Supported clipboard');
                }
              }}
            >
              <PiShareFatLight />
              <div className="ml-1 text-sm">{t('lab:share')}</div>
            </div>
          ) : null}
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
          <span className="text-base font-normal text-black">
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
