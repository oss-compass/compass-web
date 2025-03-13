import { useRef } from 'react';
import { useUpdateReportMetricClarificationMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import CommentInput, { InputRefProps } from './CommentInput';
import toast from 'react-hot-toast';

const CommentEdit = ({
  content,
  clarificationId,
  onUpdateSuccess,
  onCancel,
}: {
  content: string;
  clarificationId: number;
  onUpdateSuccess: () => void;
  onCancel: () => void;
}) => {
  const { t } = useTranslation();
  const editInputRef = useRef<InputRefProps>(null);
  const updateCommentMutation =
    useUpdateReportMetricClarificationMutation(gqlClient);

  return (
    <CommentInput
      showFooter
      content={content}
      ref={editInputRef}
      loading={updateCommentMutation.isLoading}
      onSubmit={(content) => {
        updateCommentMutation.mutate(
          {
            clarificationId,
            content,
          },
          {
            onSuccess() {
              toast.success('修改成功');
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
