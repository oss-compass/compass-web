import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import {
  CommentFragment,
  useCreateLabModelCommentMutation,
} from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import CommentInput, { InputRefProps } from './CommentInput';

const CommentReply = ({
  parentId,
  comment,
  onReplySuccess,
  onCancel,
}: {
  parentId;
  comment: CommentFragment;
  onReplySuccess: () => void;
  onCancel: () => void;
}) => {
  const router = useRouter();
  const modelId = Number(router.query.model);
  const defaultVersionId = Number(router.query.version);

  const commentId = comment.id;
  const replyInputRef = useRef<InputRefProps>(null);
  const commentMutation = useCreateLabModelCommentMutation(gqlClient);

  return (
    <div className="mt-4">
      <CommentInput
        showFooter
        ref={replyInputRef}
        placeholder="回复"
        loading={commentMutation.isLoading}
        onSubmit={(v) => {
          commentMutation.mutate(
            {
              modelId,
              replyTo: parentId,
              content: v,
              versionId: 0,
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
