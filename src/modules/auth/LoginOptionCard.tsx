import React from 'react';
import { useTranslation } from 'next-i18next';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { BuiltInProviderType } from 'next-auth/providers';
import { FiAlertCircle } from 'react-icons/fi';
import { useRouter } from 'next/router';
import ProvideCard from './ProvideCard';

const LoginOptionCard: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
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
          {providers &&
            Object.values(providers).map((provider) => {
              return <ProvideCard provider={provider} key={provider.name} />;
            })}
        </div>
      </div>
      {error === 'OAuthCallback' && (
        <h4 className="mt-10 flex items-center text-lg font-medium text-warning">
          <FiAlertCircle className="mr-2 text-2xl" /> outgoing request timed
          out, please try again!
        </h4>
      )}
    </div>
  );
};

export default LoginOptionCard;
