import { useRef } from 'react';
import { useUpdateTpcSoftwareSelectionCommentMutation } from '@oss-compass/graphql';
import gqlClient from '@common/gqlClient';
import { useTranslation } from 'next-i18next';
import CommentInput, {
  InputRefProps,
} from '@modules/oh/components/EvaluationInfo/MetricDrawer/CommentInput';
import toast from 'react-hot-toast';

const CommentEdit = ({
  content,
  commentId,
  onUpdateSuccess,
  onCancel,
}: {
  content: string;
  commentId: number;
  onUpdateSuccess: () => void;
  onCancel: () => void;
}) => {
  const { t } = useTranslation();
  const editInputRef = useRef<InputRefProps>(null);
  const updateCommentMutation =
    useUpdateTpcSoftwareSelectionCommentMutation(gqlClient);

  return (
    <CommentInput
      showFooter
      content={content}
      ref={editInputRef}
      loading={updateCommentMutation.isLoading}
      onSubmit={(content) => {
        updateCommentMutation.mutate(
          {
            commentId,
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
