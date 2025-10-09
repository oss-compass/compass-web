import React from 'react';
import { Spin } from 'antd';
import { useTranslation } from 'next-i18next';

const LoadingState: React.FC = () => {
  const { t } = useTranslation('intelligent_analysis');

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <Spin
              size="large"
              tip={t('project_detail.loading_state.loading_user_details')}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoadingState;
