import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { AiOutlineUser } from 'react-icons/ai';
import { FiMoreHorizontal } from 'react-icons/fi';
import { Popper } from '@oss-compass/ui';
import type { EventEmitter } from 'ahooks/lib/useEventEmitter';
import { Permission, useDeleteLabModelMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { ReFetch } from '@common/constant';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';

const ModelItemMore = ({
  modelId,
  event$,
  permissions,
}: {
  modelId: number;
  event$: EventEmitter<string>;
  permissions: Permission;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteMutation = useDeleteLabModelMutation(gqlClient, {
    onSuccess: () => {
      event$.emit(ReFetch);
      setOpenConfirm(false);
    },
  });

  return (
    <>
      <Popper
        placement="bottom-end"
        content={
          <div className="w-24 rounded bg-white shadow">
            <div
              className="cursor-pointer border-b px-2 py-2 text-sm"
              onClick={() => {
                router.push(`/lab/model/${modelId}/edit`);
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
            className="ml-2 cursor-pointer p-2 text-sm"
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
                deleteMutation.mutate({ id: modelId });
              }}
            >
              {t('common:btn.confirm')}
            </Button>
          </div>
        }
        handleClose={() => {}}
      />
    </>
  );
};

export default ModelItemMore;
