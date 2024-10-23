import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import uniq from 'lodash/uniq';
import gqlClient from '@common/gqlClient';
import { BiDetail } from 'react-icons/bi';
import { AiOutlineSelect } from 'react-icons/ai';
import { useUpdateLabModelMutation } from '@oss-compass/graphql';
import { ModelDetail } from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import classnames from 'classnames';
import { CgSpinner } from 'react-icons/cg';
import { CustomRadio } from '@oss-compass/ui';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { ModelVersion, Permission } from '@oss-compass/graphql';
import { formatToNow } from '@common/utils/time';
import { ReFetch } from '@common/constant';
import getErrorMessage from '@common/utils/getErrorMessage';
import VersionItemMore from './VersionItemMore';
import TriggerConfirmBtn from './TriggerConfirmBtn';
import { getSecondIdentName } from '@common/collectionsI18n';
import CreatReport from './CreatReport';

const VersionCard = ({
  model,
  modelDefaultVersionId,
  version,
  permissions,
  event$,
}: {
  model: ModelDetail;
  modelDefaultVersionId: number;
  version: ModelVersion;
  permissions: Permission;
  event$: EventEmitter<string>;
}) => {
  const { id: modelId, isPublic: modelIsPublic, triggerRemainingCount } = model;
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const updateMutation = useUpdateLabModelMutation(gqlClient, {
    onSuccess(res) {
      toast.success(() => <>{t('lab:edit_succeed')}</>, {
        position: 'top-center',
      });
      event$.emit(ReFetch);
    },
    onError(res) {
      toast.error(getErrorMessage(res) || (() => <>{t('lab:edit_failed')}</>), {
        position: 'top-center',
      });
    },
  });

  // const dataSetIdent = version?.dataset?.items?.map?.((i) => i.secondIdent);
  // const dataSetNames = uniq(dataSetIdent)
  //   .map((i) => getSecondIdentName(i, i18n.language))
  //   .join(', ');

  const metricsNames = version?.metrics
    ?.map(({ ident, category }) => {
      return t(`lab_metrics:${category}.${ident}`);
    })
    .join(', ');

  const cardLoading = updateMutation.isLoading;

  return (
    <div className={classnames('flex flex-col border bg-[#FAFAFA] ')}>
      <div className="flex-1">
        <div className="flex justify-between px-3 py-2 pb-4">
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
          {modelIsPublic ? (
            <div className="mb-2 flex items-center">
              <span className="text-secondary block truncate text-sm">
                {t('lab:default_display_version')}：
              </span>
              {cardLoading ? (
                <CgSpinner className="mr-1 animate-spin text-xl" />
              ) : (
                <CustomRadio
                  size={'small'}
                  checked={modelDefaultVersionId === version.id}
                  checkedColor={'#00B400'}
                  // onChange={(e, v) => {
                  //   if (v) {
                  //     updateMutation.mutate({
                  //       modelId: modelId,
                  //       // defaultVersionId: version.id,
                  //     });
                  //   }
                  // }}
                />
              )}
            </div>
          ) : null}

          {/* <div className="mb-2">
            <span className="text-secondary block  truncate text-sm">
              {t('lab:datasets')}: {dataSetNames}
            </span>
          </div> */}
          <div className="mb-2">
            <span className="text-secondary block truncate text-sm">
              {t('lab:metrics')}: {metricsNames}
            </span>
          </div>
          <div className="mb-2">
            <span className="text-secondary block truncate text-sm">
              {t('lab:algorithm')}: {t('lab:algorithm_selection.default')}
            </span>
          </div>

          {/* {version.triggerStatus ? (
            <>
              <div className="mb-2">
                <span className="text-secondary block truncate text-sm">
                  {t('lab:trigger_analysis.status')}
                  {t(`lab:analysis_status.${version.triggerStatus}`)}
                </span>
              </div>
            </>
          ) : null}

          {version.triggerUpdatedAt ? (
            <>
              <div className="mb-2">
                <span className="text-secondary block truncate text-sm">
                  {t('lab:trigger_analysis.time')}
                  {formatToNow(version.triggerUpdatedAt)}
                </span>
              </div>
            </>
          ) : null} */}
        </div>
      </div>
      <div className="flex h-8 border-t">
        <CreatReport version={version} model={model} />
        {/* <div
          className="hover:bg-smoke flex flex-1 basis-1/2 cursor-pointer items-center justify-center"
          onClick={() => {
            router.push(`/lab/model/${modelId}/version/${version.id}/detail`);
          }}
        >
          <AiOutlineSelect className="text-secondary" />
          <span className="ml-2 block text-sm">{'选择数据集'}</span>
        </div> */}

        {/* {permissions?.canExecute ? (
          <TriggerConfirmBtn
            modelId={modelId}
            version={version}
            triggerRemainingCount={triggerRemainingCount}
            event$={event$}
          />
        ) : null}

        {permissions?.canRead ? (
          <div
            className="hover:bg-smoke flex flex-1 basis-1/2 cursor-pointer items-center justify-center"
            onClick={() => {
              router.push(
                `/lab/model/${modelId}/version/${version.id}/dataset`
              );
            }}
          >
            <BiDetail className="text-secondary" />
            <span className="ml-2 block text-sm">{t('lab:view_report')}</span>
          </div>
        ) : (
          <div className="flex flex-1 basis-1/2 cursor-not-allowed items-center justify-center">
            <BiDetail className="text-secondary" />
            <span className="ml-2 block text-sm">{t('lab:view_report')}</span>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default VersionCard;
