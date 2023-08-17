import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import uniq from 'lodash/uniq';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiLoaderAlt } from 'react-icons/bi';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import {
  ModelVersion,
  Permission,
  useTriggerLabModelVersionMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import { ReFetch } from '@common/constant';
import { formatToNow } from '@common/utils/time';
import VersionItemMore from './VersionItemMore';

export const VersionCreate = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="hover:bg-smoke flex min-h-[160px] cursor-pointer flex-col  items-center  justify-center border bg-[#FAFAFA] "
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
  permissions,
}: {
  modelId: number;
  version: ModelVersion;
  permissions: Permission;
  event$: EventEmitter<string>;
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const triggerMutation = useTriggerLabModelVersionMutation(gqlClient);

  const dataSetIdent = version?.dataset?.items?.map?.((i) => i.secondIdent);
  const dataSetNames = uniq(dataSetIdent).join(',');
  const metricsNames = version?.metrics?.map?.((i) => i.name).join(',');

  return (
    <div className="flex flex-col border bg-[#FAFAFA]">
      <div className="flex-1">
        <div className="flex justify-between px-3 py-2">
          <div className="flex-1 truncate font-bold">{version.version}</div>
          {permissions.canUpdate || permissions.canDestroy ? (
            <VersionItemMore
              permissions={permissions}
              modelId={modelId}
              versionId={version.id}
              event$={event$}
            />
          ) : null}
        </div>
        <div className="px-3 pb-2">
          <div className="mb-2">
            <span className="text-secondary block truncate text-xs">
              {t('lab:datasets')}: {dataSetNames}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-secondary block truncate  text-xs">
              {t('lab:metrics')}：{metricsNames}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-secondary block truncate text-xs">
              {t('lab:algorithm')}：Default
            </span>
          </div>
          {version.triggerUpdatedAt ? (
            <>
              <div className="mb-2">
                <span className="text-secondary block truncate text-xs">
                  {t('lab:last_trigger')}：
                  {formatToNow(version.triggerUpdatedAt)}
                </span>
              </div>
            </>
          ) : null}
        </div>
      </div>
      <div className="flex h-8 border-t">
        {permissions?.canRead ? (
          <div
            className="hover:bg-smoke flex flex-1 basis-1/2 cursor-pointer items-center justify-center border-r last:border-r-0"
            onClick={() => {
              router.push(
                `/lab/model/${modelId}/version/${version.id}/dataset`
              );
            }}
          >
            <span className="block text-sm">{t('lab:view_report')}</span>
          </div>
        ) : null}

        {permissions?.canExecute ? (
          <>
            {version.triggerStatus === 'pending' ||
            version.triggerStatus === 'progress' ? (
              <div className="text-secondary flex basis-1/2 cursor-pointer items-center justify-center">
                <span className="block text-sm">Analyzing...</span>
              </div>
            ) : (
              <div
                className="hover:bg-smoke flex basis-1/2 cursor-pointer items-center justify-center"
                onClick={() => {
                  triggerMutation.mutate(
                    { modelId, versionId: version.id },
                    {
                      onSuccess: (res) => {
                        const msg = res?.triggerLabModelVersion?.message;
                        if (msg) {
                          toast.error(msg || 'Trigger analysis failed!');
                        }
                        event$.emit(ReFetch);
                      },
                      onError: (err) => {
                        toast.error('Trigger analysis failed!');
                      },
                    }
                  );
                }}
              >
                <span className="block flex items-center text-sm">
                  {triggerMutation.isLoading ? (
                    <BiLoaderAlt className="text-silver mr-2 animate-spin cursor-pointer text-xl" />
                  ) : null}
                  {t('lab:trigger_analysis')}
                </span>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};
