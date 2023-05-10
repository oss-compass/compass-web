import React, { useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { FiAlertCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { oauthProvider } from '@common/constant';
import LoginCard from './LoginCard';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const error = router.query.error;

  return (
    <div className="mx-auto w-[1000px] md:w-full md:px-10 md:pb-10">
      <h3 className="mt-32 mb-10 text-xl font-medium">
        {t('submit_project:please_select_the_platform_where_your_project_is_h')}
      </h3>
      <div>
        <div className="flex justify-between md:flex-col">
          {Object.values(oauthProvider).map((provider) => {
            return <LoginCard provider={provider} key={provider.name} />;
          })}
        </div>
      </div>
      {error && (
        <h4 className="mt-10 flex items-center text-base font-medium text-warning">
          <FiAlertCircle className="mr-2 text-4xl" /> {error}
        </h4>
      )}
    </div>
  );
};

export default LoginPage;
