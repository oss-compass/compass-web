import React from 'react';
import { useTranslation } from 'next-i18next';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

const Message: React.FC<{
  show: boolean;
  isError: boolean;
  message?: string;
  prUrl?: string | null;
  reportUrl?: string | null;
}> = ({ show, isError, message, prUrl, reportUrl }) => {
  const { t } = useTranslation();

  if (!show) {
    return null;
  }

  if (isError) {
    return <ErrorMessage content={message} reportUrl={reportUrl || ''} />;
  }

  return (
    <SuccessMessage
      content={message || t('submit_project:submit_success')}
      url={prUrl || ''}
    />
  );
};

export default Message;
