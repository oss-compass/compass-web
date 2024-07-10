import React, { useState, useRef } from 'react';
import { Popper } from '@oss-compass/ui';
import { useRouter } from 'next/router';
import { CommentFragment, ReplyFragment } from '@oss-compass/graphql';
import {
  ModelDetail,
  useDeleteReportMetricClarificationMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { FiMoreHorizontal } from 'react-icons/fi';
import Dialog from '@common/components/Dialog';
import { Button, PopperRefProps } from '@oss-compass/ui';
import { useUserInfo } from '@modules/auth/useUserInfo';
import { useTranslation } from 'react-i18next';
import { userRiskStore, userEvent } from '@modules/oh/store/UserRiskStore';

const CommentItemMore = ({
  userId,
  clarificationId,
  onDeleteSuccess,
  onDeleteEdit,
}: {
  userId: number;
  clarificationId: number;
  onDeleteSuccess: () => void;
  onDeleteEdit: () => void;
}) => {
  const { t } = useTranslation();

  const popperRef = useRef<PopperRefProps>();
  const router = useRouter();
  const { currentUser } = useUserInfo();

  const modelId = Number(router.query.model);

  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteMutation = useDeleteReportMetricClarificationMutation(gqlClient, {
    onSuccess: () => {
      setOpenConfirm(false);
      onDeleteSuccess();
      // userRiskStore.event$[shortCode]?.emit(userEvent.REFRESH);
      userRiskStore.event$?.emit(userEvent.REFRESH);
    },
  });

  const isMySelf = currentUser?.id == userId;
  console.log(userId, currentUser, isMySelf);
  if (!isMySelf) {
    return null;
  }

  return (
    <>
      <Popper
        ref={popperRef}
        placement="bottom-end"
        content={
          <div className="w-24 rounded bg-white shadow">
            <div
              className="cursor-pointer border-b px-2 py-2 text-sm"
              onClick={() => {
                onDeleteEdit();
                popperRef.current?.toggle();
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
            className="text-secondary ml-1 cursor-pointer p-1 text-sm"
            onClick={(e) => trigger(e)}
          >
            <FiMoreHorizontal />
          </div>
        )}
      </Popper>

      <Dialog
        open={openConfirm}
        dialogTitle={<>{t('common:btn.confirm')}</>}
        dialogContent={<div className="w-96">确定删除？</div>}
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
                deleteMutation.mutate({ clarificationId });
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

export default CommentItemMore;
