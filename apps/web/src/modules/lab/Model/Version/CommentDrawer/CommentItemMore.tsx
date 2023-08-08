import React, { useState } from 'react';
import { Popper } from '@oss-compass/ui';
import { useRouter } from 'next/router';
import { CommentFragment } from '@oss-compass/graphql';
import {
  ModelDetail,
  useDeleteLabModelCommentMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { FiMoreHorizontal } from 'react-icons/fi';
import Dialog from '@common/components/Dialog';
import { Button } from '@oss-compass/ui';
import { useUserInfo } from '@modules/auth/useUserInfo';

const CommentItemMore = ({
  comment,
  onDeleteSuccess,
  onDeleteEdit,
}: {
  comment: CommentFragment;
  onDeleteSuccess: () => void;
  onDeleteEdit: () => void;
}) => {
  const router = useRouter();
  const useInfo = useUserInfo();
  console.log(useInfo);
  const modelId = Number(router.query.model);
  const commentId = comment?.id;

  const [openConfirm, setOpenConfirm] = useState(false);
  const deleteMutation = useDeleteLabModelCommentMutation(gqlClient, {
    onSuccess: () => {
      setOpenConfirm(false);
      onDeleteSuccess();
    },
  });

  // if(comment.user)

  return (
    <>
      <Popper
        placement="bottom-end"
        content={
          <div className="w-24 rounded bg-white shadow">
            <div
              className="cursor-pointer border-b px-2 py-2 text-sm"
              onClick={() => {
                onDeleteEdit();
              }}
            >
              编辑
            </div>
            <div
              className="cursor-pointer border-b px-2 py-2 text-sm"
              onClick={() => {
                setOpenConfirm(true);
              }}
            >
              删除
            </div>
          </div>
        }
      >
        {(trigger) => (
          <div
            className="text-secondary ml-1 cursor-pointer p-1 text-xs"
            onClick={(e) => trigger(e)}
          >
            <FiMoreHorizontal />
          </div>
        )}
      </Popper>

      <Dialog
        open={openConfirm}
        dialogTitle={<>确定</>}
        dialogContent={<div className="w-96">确认删除?</div>}
        dialogActions={
          <div className="flex">
            <Button
              intent="text"
              size="sm"
              onClick={() => {
                setOpenConfirm(false);
              }}
            >
              取消
            </Button>
            <Button
              intent="primary"
              size="sm"
              className="ml-4"
              loading={deleteMutation.isLoading}
              onClick={() => {
                deleteMutation.mutate({ modelId, commentId });
              }}
            >
              确定
            </Button>
          </div>
        }
        handleClose={() => {}}
      />
    </>
  );
};

export default CommentItemMore;
