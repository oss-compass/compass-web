import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { Button } from '@oss-compass/ui';
import CSDialog from '@common/components/Dialog';
import { toast } from 'react-hot-toast';
import { submitFeedback, getModuleFromPath, FeedbackModule } from './api';

interface FeedbackDialogProps {
  open: boolean;
  onClose: () => void;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 根据当前路径自动识别模块
  const currentModule: FeedbackModule = getModuleFromPath(router.pathname);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      toast.error(t('common:feedback_required'));
      return;
    }

    setIsSubmitting(true);

    try {
      // 调用真实的API接口
      const result = await submitFeedback({
        module: currentModule,
        content: feedback.trim(),
      });

      if (result.success) {
        toast.success(t('common:feedback_submitted'));
        setFeedback('');
        onClose();
      } else {
        toast.error(result.message || t('common:feedback_submit_error'));
      }
    } catch (error) {
      console.error('反馈提交失败:', error);
      toast.error(t('common:feedback_submit_error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFeedback('');
    onClose();
  };

  return (
    <CSDialog
      open={open}
      handleClose={handleClose}
      dialogTitle={
        <div className="text-lg font-semibold text-gray-800">
          {t('common:user_feedback')}
        </div>
      }
      dialogContent={
        <div className="w-96 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {t('common:feedback_content')}
            </label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={t('common:feedback_placeholder')}
              className="h-32 w-full resize-none rounded-none border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              maxLength={500}
            />
            <div className="mt-1 text-right text-xs text-gray-500">
              {feedback.length}/500
            </div>
          </div>
        </div>
      }
      dialogActions={
        <div className="flex space-x-3">
          <Button
            intent="text"
            size="md"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {t('common:btn.cancel')}
          </Button>
          <Button
            intent="primary"
            size="md"
            onClick={handleSubmit}
            loading={isSubmitting}
            disabled={!feedback.trim()}
          >
            {t('common:btn.submit')}
          </Button>
        </div>
      }
    />
  );
};

export default FeedbackDialog;
