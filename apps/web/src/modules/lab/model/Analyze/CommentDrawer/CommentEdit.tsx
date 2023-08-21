import { useEffect, useState, useRef } from 'react';
import {
  CommentFragment,
  ReplyFragment,
  useUpdateLabModelCommentMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import CommentInput, { InputRefProps } from './CommentInput';

const CommentEdit = ({
  comment,
  onUpdateSuccess,
  onCancel,
}: {
  comment: CommentFragment | ReplyFragment;
  onUpdateSuccess: () => void;
  onCancel: () => void;
}) => {
  const modelId = comment.model?.id;
  const commentId = comment.id;

  const { t } = useTranslation();
  const editInputRef = useRef<InputRefProps>(null);
  const updateCommentMutation = useUpdateLabModelCommentMutation(gqlClient);

  useEffect(() => {
    const images = comment?.images?.map((img) => ({
      id: img.id,
      name: img.filename,
      base64: img.url,
    }));
    editInputRef.current.backFill(comment?.content, images);
  }, [comment?.content, comment?.images]);

  return (
    <CommentInput
      showFooter
      ref={editInputRef}
      placeholder={t('lab:edit_comment')}
      loading={updateCommentMutation.isLoading}
      onSubmit={(v, images) => {
        const img = images.map((i) => ({
          id: i.id,
          filename: i.name,
          base64: i.base64,
        }));

        updateCommentMutation.mutate(
          {
            modelId,
            commentId,
            content: v,
            images: img,
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
