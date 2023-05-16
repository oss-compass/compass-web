import React, { useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import useProviderInfo from '@modules/auth/useProviderInfo';

const Auth: React.FC = () => {
  const { t } = useTranslation();
  const { providerUser: user, loginBinds, toggle } = useProviderInfo();
  const hasLoggedIn = Boolean(user);
  const bindLen = loginBinds?.length;

  if (!hasLoggedIn) return null;

  return (
    <>
      <h1 className="mb-4 text-xl font-medium">
        {t('submit_project:your_project_hosting_on')}
      </h1>

      <div className="flex items-center justify-between ">
        <div className="flex">
          <div className="daisy-avatar">
            <div className="h-12 w-12 rounded-full bg-slate-100">
              <Image
                width={48}
                height={48}
                src={user?.avatarUrl!}
                unoptimized
                alt={''}
              />
            </div>
          </div>
          <div className="ml-4 flex flex-col">
            <span className="text-base font-medium line-clamp-1">
              {user?.nickname}
            </span>
            <span className="text-sm text-gray-400">
              {user?.provider === 'gitee' ? 'Gitee' : ''}
              {user?.provider === 'github' ? 'GitHub' : ''}
            </span>
          </div>
        </div>

        <div className="ml-5 flex  items-center">
          {bindLen && bindLen > 1 ? (
            <button className="text-primary" onClick={() => toggle()}>
              {user?.provider === 'gitee'
                ? t('submit_project:switch_github')
                : null}
              {user?.provider === 'github'
                ? t('submit_project:switch_gitee')
                : null}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Auth;
