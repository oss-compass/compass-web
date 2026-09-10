import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'next-i18next';
import { useStatusContext } from '@modules/analyze/context';
import LoadingAnalysis from './LoadingAnalysis';
import NotFoundAnalysis from './NotFoundAnalysis';
import UnderAnalysis from './UnderAnalysis';

export const AnalysisFeedback = ({
  state,
  onRetry,
}: {
  state: 'loading' | 'pending' | 'error' | 'empty';
  onRetry?: () => void;
}) => {
  const { t } = useTranslation();
  if (state === 'loading') {
    return (
      <div role="status" aria-label={t('common:loading')} aria-busy="true">
        <LoadingAnalysis />
      </div>
    );
  }
  if (state === 'pending') {
    return (
      <div role="status" className="py-10">
        <UnderAnalysis />
      </div>
    );
  }
  return (
    <div
      role={state === 'error' ? 'alert' : 'status'}
      className="flex flex-col items-center gap-4 p-10 text-center text-gray-600"
    >
      <p>
        {t(
          state === 'error'
            ? 'common:error.something_went_wrong'
            : 'common:no_data'
        )}
      </p>
      {state === 'error' && onRetry && (
        <button
          type="button"
          className="rounded border border-blue-600 px-4 py-2 text-blue-600"
          onClick={onRetry}
        >
          {t('common:error.try_again')}
        </button>
      )}
    </div>
  );
};

const AnalysisStatus: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoading, isError, status, notFound, refetch } = useStatusContext();
  if (isLoading) return <AnalysisFeedback state="loading" />;
  if (isError || status === 'error') {
    return <AnalysisFeedback state="error" onRetry={refetch} />;
  }
  if (notFound) return <NotFoundAnalysis />;
  if (status === 'pending' || status === 'progress') {
    return <AnalysisFeedback state="pending" />;
  }
  if (status !== 'success') {
    return <AnalysisFeedback state="error" onRetry={refetch} />;
  }
  return <>{children}</>;
};

export default AnalysisStatus;
