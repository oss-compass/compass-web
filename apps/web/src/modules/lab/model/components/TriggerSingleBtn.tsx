import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BiLoaderAlt, BiDetail } from 'react-icons/bi';
import { BsSend } from 'react-icons/bs';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { useTriggerSingleProjectMutation } from '@oss-compass/graphql';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import gqlClient from '@common/gqlClient';
import { toast } from 'react-hot-toast';
import { ReFetch } from '@common/constant';
import { formatToNow } from '@common/utils/time';
import getErrorMessage from '@common/utils/getErrorMessage';
import { getRepoName } from '@common/utils';

const TriggerSingleBtn = ({
  projectUrl,
  reportId,
  triggerStatus,
  triggerUpdatedAt,
  event$,
}: {
  projectUrl: string;
  reportId: number;
  triggerStatus: string;
  triggerUpdatedAt: string;
  event$?: EventEmitter<string>;
}) => {
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const triggerMutation = useTriggerSingleProjectMutation(gqlClient, {
    onSuccess(res) {
      toast.success(res.triggerSingleProject?.message);
      setOpenConfirm(false);
    },
  });

  if (triggerStatus === 'pending' || triggerStatus === 'progress') {
    return (
      <div className="text-secondary flex basis-1/2 cursor-pointer items-center justify-center last:border-r-0">
        <span className="block text-sm">
          {t('lab:trigger_analysis.analyzing')}
        </span>
      </div>
    );
  }

  return (
    <>
      <div
        className="hover:bg-smoke flex cursor-pointer items-center justify-center"
        onClick={() => {
          setOpenConfirm(true);
        }}
      >
        <span className="ml-2 flex items-center py-1 text-sm">
          {triggerMutation.isLoading ? (
            <BiLoaderAlt className="text-silver mr-2 animate-spin cursor-pointer text-xl" />
          ) : (
            <BsSend className="text-secondary mr-2" />
          )}
          {/* {t('lab:trigger_analysis.card_btn')} */}
        </span>
      </div>

      <Dialog
        open={openConfirm}
        dialogTitle={
          <>
            {triggerUpdatedAt ? (
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
                {t(`lab:analysis_status.${triggerStatus}`)}
              </span>
            </div>
            {triggerUpdatedAt ? (
              <div className="mb-2">
                <span className="text-sm">
                  {t('lab:trigger_analysis.time')}
                </span>
                <span className="text-secondary ml-2 text-sm">
                  {formatToNow(triggerUpdatedAt)}
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
                  {
                    reportId,
                    projectUrl,
                    level: getRepoName(projectUrl) ? 'repo' : 'community',
                  },
                  {
                    onSuccess: (res) => {
                      event$ && event$.emit(ReFetch);
                    },
                    onError: (err) => {
                      // @ts-ignore
                      if (err?.response?.errors) {
                        toast.error(
                          getErrorMessage(err) || 'Trigger analysis failed!'
                        );
                      } else {
                        // @ts-ignore
                        toast.error(err?.response?.message);
                      }
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

export default TriggerSingleBtn;
