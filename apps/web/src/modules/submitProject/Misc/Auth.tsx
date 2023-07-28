import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useSubmitUser, userInfoStore } from '@modules/auth';

const Auth: React.FC = () => {
  const { t } = useTranslation();
  const { submitUser: user, repoProviderCount } = useSubmitUser();
  const hasLoggedIn = Boolean(user);

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
            <span className="line-clamp-1 text-base font-medium">
              {user?.nickname}
            </span>
            <span className="text-sm text-gray-400">
              {user?.provider === 'gitee' ? 'Gitee' : ''}
              {user?.provider === 'github' ? 'GitHub' : ''}
            </span>
          </div>
        </div>

        <div className="ml-5 flex  items-center">
          {repoProviderCount && repoProviderCount > 1 ? (
            <button
              className="text-primary flex items-center text-sm"
              onClick={() => {
                if (user?.provider === 'github') {
                  userInfoStore.submitProvider = 'gitee';
                } else {
                  userInfoStore.submitProvider = 'github';
                }
              }}
            >
              <HiOutlineSwitchHorizontal className="mr-1" />
              {user?.provider === 'gitee'
                ? t('submit_project:switch_github')
                : null}
              {user?.provider === 'github'
                ? t('submit_project:switch_gitee')
                : null}
            </button>
          ) : (
            <Link href="/settings/profile" className="text-primary text-sm ">
              {t('submit_project:bind_other_code_hosting_platforms')}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Auth;
