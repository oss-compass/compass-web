import React from 'react';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

const Message: React.FC<{
  show: boolean;
  isError: boolean;
  status?: string;
  message?: string;
  url?: string | null;
}> = ({ show, isError, status, message, url }) => {
  if (!show) {
    return null;
  }
  if (isError) {
    return <ErrorMessage />;
  }
  return (
    <SuccessMessage content={message || 'submit success!'} url={url || ''} />
  );
};

export default Message;
