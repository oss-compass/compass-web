import React from 'react';
import { Alert, Button } from 'antd';
import { useTranslation } from 'next-i18next';
import BreadcrumbNav from './BreadcrumbNav';

interface ErrorStateProps {
  error: string;
  projectType: string;
  userId: string;
  onBack: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({
  error,
  projectType,
  userId,
  onBack,
}) => {
  const { t } = useTranslation('intelligent_analysis');
  
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <BreadcrumbNav
            projectType={projectType}
            userId={userId}
            onBack={onBack}
          />
          <Alert
            message={t('project_detail.error_state.data_load_failed')}
            description={error}
            type="error"
            showIcon
            action={
              <Button size="small" onClick={() => window.location.reload()}>
                {t('project_detail.error_state.retry')}
              </Button>
            }
          />
        </div>
      </main>
    </div>
  );
};

export default ErrorState;
