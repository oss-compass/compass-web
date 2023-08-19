import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiLoaderAlt, BiDetail } from 'react-icons/bi';
import { BsSend } from 'react-icons/bs';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import {
  ModelVersion,
  useTriggerLabModelVersionMutation,
} from '@oss-compass/graphql';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import gqlClient from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import { ReFetch } from '@common/constant';
import { formatToNow } from '@common/utils/time';

const TriggerConfirmBtn = ({
  modelId,
  version,
  event$,
}: {
  modelId: number;
  version: ModelVersion;
  event$: EventEmitter<string>;
}) => {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const triggerMutation = useTriggerLabModelVersionMutation(gqlClient);

  if (
    version.triggerStatus === 'pending' ||
    version.triggerStatus === 'progress'
  ) {
    return (
      <div className="text-secondary flex basis-1/2 cursor-pointer items-center justify-center border-r last:border-r-0">
        <span className="block text-sm">
          {t('lab:trigger_analysis.analyzing')}
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        className="hover:bg-smoke flex basis-1/2 cursor-pointer items-center justify-center border-r last:border-r-0"
        onClick={() => {
          setOpenConfirm(true);
        }}
      >
        <BsSend className="text-secondary" />
        <span className="ml-2 block flex items-center text-sm">
          {triggerMutation.isLoading ? (
            <BiLoaderAlt className="text-silver mr-2 animate-spin cursor-pointer text-xl" />
          ) : null}
          {t('lab:trigger_analysis.card_btn')}
        </span>
      </div>

      <Dialog
        open={openConfirm}
        dialogTitle={
          <>
            {version.triggerUpdatedAt ? (
              <>{t('lab:trigger_analysis.retry_title')}</>
            ) : (
              <>{t('lab:trigger_analysis.title')}</>
            )}
          </>
        }
        dialogContent={
          <div className="w-96">
            <div className="mb-2">
              <span className="text-sm">
                {t('lab:trigger_analysis.status')}
              </span>
              <span className="text-secondary ml-2 text-sm">
                {t(`lab:analysis_status.${version.triggerStatus}`)}
              </span>
            </div>
            {version.triggerUpdatedAt ? (
              <div className="mb-2">
                <span className="text-sm">
                  {t('lab:trigger_analysis.time')}
                </span>
                <span className="text-secondary ml-2 text-sm">
                  {formatToNow(version.triggerUpdatedAt)}
                </span>
              </div>
            ) : null}
          </div>
        }
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              {t('common:btn.cancel')}
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              loading={triggerMutation.isLoading}
              onClick={() => {
                triggerMutation.mutate(
                  { modelId, versionId: version.id },
                  {
                    onSuccess: (res) => {
                      event$.emit(ReFetch);
                    },
                    onError: (err) => {
                      toast.error('Trigger analysis failed!');
                    },
                  }
                );
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => {
          setOpenConfirm(false);
        }}
      />
    </>
  );
};

export default TriggerConfirmBtn;
