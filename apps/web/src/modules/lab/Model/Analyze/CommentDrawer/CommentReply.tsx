import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  CommentFragment,
  ReplyFragment,
  useCreateLabModelCommentMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'next-i18next';
import CommentInput, { InputRefProps } from './CommentInput';
import { pageState } from '../state';

const CommentReply = ({
  parentId,
  onReplySuccess,
  onCancel,
}: {
  parentId;
  comment: CommentFragment | ReplyFragment;
  onReplySuccess: () => void;
  onCancel: () => void;
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const modelId = Number(router.query.model);
  const snapshot = useSnapshot(pageState);
  const versionId = snapshot.commentVersion?.id;

  const replyInputRef = useRef<InputRefProps>(null);
  const commentMutation = useCreateLabModelCommentMutation(gqlClient);

  return (
    <div className="mt-4">
      <CommentInput
        showFooter
        ref={replyInputRef}
        placeholder={t('lab:reply')}
        loading={commentMutation.isLoading}
        onSubmit={(content, images) => {
          const img = images.map((i) => ({
            id: i.id,
            filename: i.name,
            base64: i.base64,
          }));

          commentMutation.mutate(
            {
              modelId,
              versionId,
              replyTo: parentId,
              content,
              images: img,
            },
            {
              onSuccess() {
                onReplySuccess();
              },
            }
          );
        }}
        onCancel={() => {
          onCancel();
        }}
      />
    </div>
  );
};

export default CommentReply;
