import React from 'react';
import { useTranslation } from 'react-i18next';
import gqlClient from '@common/gqlClient';
import { useUpdateLabModelMutation } from '@oss-compass/graphql';
import { ModelDetail } from '@oss-compass/graphql';
import { toast } from 'react-hot-toast';
import classnames from 'classnames';
import { CgSpinner } from 'react-icons/cg';
import { CustomRadio } from '@oss-compass/ui';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { ModelVersion, Permission } from '@oss-compass/graphql';
import { ReFetch } from '@common/constant';
import getErrorMessage from '@common/utils/getErrorMessage';
import VersionItemMore from './VersionItemMore';
import CreatReport from './CreatReport';
import Weight from './Weight';
import { Popover } from 'antd';

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
  const { isScore } = version;
  const { t } = useTranslation();
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

  const metricsList = version?.metrics;
  const cardLoading = updateMutation.isLoading;

  return (
    <div className={classnames('flex flex-col border bg-[#FAFAFA] ')}>
      <div className="flex-1">
        <div className="flex justify-between px-3 py-2 pb-4">
          <div className="flex-1 truncate font-bold">{version.version}</div>
          {
            <VersionItemMore
              permissions={permissions}
              modelId={modelId}
              versionId={version.id}
              event$={event$}
            />
          }
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
            <div className="text-secondary flex gap-1 text-sm">
              <div className="flex-shrink-0">{t('lab:metrics')}: </div>
              <div className="ml-1 flex flex-wrap gap-1">
                {metricsList.map(({ ident, category }) => (
                  <Popover
                    key={ident}
                    content={t(`lab_metrics:${category}.${ident}_desc`)}
                  >
                    <div className="mr-2 flex h-5 flex-shrink-0 cursor-pointer rounded-full border bg-[#F1F1F1] px-2.5 pt-[1px] text-xs text-[#585858]">
                      {t(`lab_metrics:${category}.${ident}`)}
                    </div>
                  </Popover>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-2">
            {isScore ? (
              <span className="text-secondary block truncate text-sm">
                {t('lab:algorithm')}:
                <span className="ml-2 h-5 rounded-full border bg-[#F1F1F1] px-2.5 pt-[1px] text-xs text-[#585858]">
                  {t('lab:algorithm_selection.default')}
                </span>
              </span>
            ) : (
              <span className="text-secondary block truncate text-sm">
                {t('lab:non_score_text')}
              </span>
            )}
          </div>
          {isScore && (
            <div className="mb-2">
              <div className="text-secondary  gap-1 text-sm">
                <div>{t('lab:weight_and_threshold')}: </div>
                <Weight metrics={version?.metrics} />
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex h-8 border-t">
        <CreatReport version={version} model={model} />
      </div>
    </div>
  );
};

export default VersionCard;
