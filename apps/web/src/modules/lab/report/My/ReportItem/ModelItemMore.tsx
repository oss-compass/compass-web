import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AiOutlineUser } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Popper } from '@oss-compass/ui';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import {
  MyModelVersion,
  useDeleteLabModelReportMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { ReFetch } from '@common/constant';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import EditReportModal from '@modules/lab/report/My/ReportItem/EditReportModal';

const ModelItemMore = ({
  model,
  event$,
}: {
  model: MyModelVersion;
  event$: EventEmitter<string>;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const { id, modelId, modelName } = model;
  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteMutation = useDeleteLabModelReportMutation(gqlClient, {
    onSuccess: () => {
      event$.emit(ReFetch);
      setOpenConfirm(false);
    },
  });
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <EditReportModal
        version={model}
        modelName={modelName}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        event$={event$}
      />
      <Popper
        placement="bottom-end"
        content={
          <div className="w-24 rounded bg-white shadow">
            <div
              className="cursor-pointer border-b px-2 py-2 text-sm"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              {t('common:btn.edit')}
            </div>

            <div
              className="cursor-pointer border-b px-2 py-2 text-sm"
              onClick={() => {
                setOpenConfirm(true);
              }}
            >
              {t('common:btn.delete')}
            </div>
          </div>
        }
      >
        {(trigger) => (
          <div
            className="cursor-pointer p-2 text-sm"
            onClick={(e) => trigger(e)}
          >
            <FiMoreHorizontal />
          </div>
        )}
      </Popper>
      <Dialog
        open={openConfirm}
        dialogTitle={<> {t('common:btn.confirm')}</>}
        dialogContent={<div className="w-96">{t('common:confirm.delete')}</div>}
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
              loading={deleteMutation.isLoading}
              onClick={() => {
                deleteMutation.mutate({ id });
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

export default ModelItemMore;
