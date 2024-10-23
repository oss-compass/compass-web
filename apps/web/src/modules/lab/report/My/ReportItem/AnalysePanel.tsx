import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { BsSend } from 'react-icons/bs';
import { BiLoaderAlt, BiDetail } from 'react-icons/bi';
import gqlClient from '@common/gqlClient';
import {
  ModelVersion,
  useTriggerLabModelVersionMutation,
} from '@oss-compass/graphql';
import { MyModelVersion } from '@oss-compass/graphql';
import { formatToNow } from '@common/utils/time';

const AnalysePanel = ({ model }: { model: MyModelVersion }) => {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const triggerMutation = useTriggerLabModelVersionMutation(gqlClient, {
    onSuccess() {
      setOpenConfirm(false);
    },
  });
  const { triggerUpdatedAt, triggerStatus, modelId, versionId } = model;

  return (
    <div className="mt-4 flex">
      <div className="mr-3 flex h-5 items-center text-sm font-medium">
        <BsSend className="mr-2" />
        {t('lab:trigger_analysis_status')}

        {triggerStatus === 'success' ? (
          <span className="ml-3 rounded-2xl bg-[#cdf0ce] px-2 py-0.5 text-xs text-[#00B400]">
            {' '}
            {t(`lab:analysis_status.${triggerStatus}`)}
          </span>
        ) : (
          <span className="ml-3 rounded-2xl bg-[#fff2f0] px-2 py-0.5 text-xs text-[#ff4d4f]">
            {t(`lab:analysis_status.${triggerStatus}`)}
          </span>
        )}
        {triggerUpdatedAt ? (
          <span className="text-secondary ml-2 text-xs">
            {formatToNow(triggerUpdatedAt)}
          </span>
        ) : null}
      </div>

      {/* <Dialog
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
      /> */}
    </div>
  );
};

export default AnalysePanel;
