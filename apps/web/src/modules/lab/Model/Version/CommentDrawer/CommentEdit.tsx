import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import {
  CommentFragment,
  useUpdateLabModelCommentMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import CommentItemMore from './CommentItemMore';
import CommentInput, { InputRefProps } from './CommentInput';

const CommentEdit = ({
  comment,
  onUpdateSuccess,
  onCancel,
}: {
  comment: CommentFragment;
  onUpdateSuccess: () => void;
  onCancel: () => void;
}) => {
  const modelId = comment.model?.id;
  const commentId = comment.id;

  const editInputRef = useRef<InputRefProps>(null);
  const updateCommentMutation = useUpdateLabModelCommentMutation(gqlClient);

  useEffect(() => {
    editInputRef.current.backFill(comment?.content);
  }, [comment?.content]);

  return (
    <CommentInput
      showFooter
      ref={editInputRef}
      placeholder="编辑"
      loading={updateCommentMutation.isLoading}
      onSubmit={(v) => {
        updateCommentMutation.mutate(
          {
            modelId,
            commentId,
            content: v,
          },
          {
            onSuccess() {
              onUpdateSuccess();
            },
          }
        );
      }}
      onCancel={() => {
        onCancel();
      }}
    />
  );
};

export default CommentEdit;
