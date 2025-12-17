import React, { useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineSwitchHorizontal } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { useSubmitUser, userInfoStore } from '@modules/auth';

const Auth: React.FC = () => {
  const { t } = useTranslation();
  const { submitUser: user, repoProviderCount, loginBinds } = useSubmitUser();
  const hasLoggedIn = Boolean(user);

  // 获取所有已绑定的代码托管平台
  const availableProviders = useMemo(() => {
    return (
      loginBinds
        ?.filter((bind) =>
          ['github', 'gitee', 'gitcode'].includes(bind.provider!)
        )
        .map((bind) => bind.provider!) || []
    );
  }, [loginBinds]);

  // 获取下一个可切换的 provider
  const getNextProvider = () => {
    const currentIndex = availableProviders.indexOf(user?.provider!);
    const nextIndex = (currentIndex + 1) % availableProviders.length;
    return availableProviders[nextIndex];
  };

  // 获取下一个 provider 的显示名称
  const getNextProviderName = () => {
    const nextProvider = getNextProvider();
    switch (nextProvider) {
      case 'github':
        return 'GitHub';
      case 'gitee':
        return 'Gitee';
      case 'gitcode':
        return 'AtomGit';
      default:
        return '';
    }
  };

  if (!hasLoggedIn) return null;

  return (
    <>
      <h1 className="mb-4 text-xl font-medium">
        {t('submit_project:your_project_hosting_on')}
      </h1>

      <div className="flex items-center justify-between ">
        <div className="flex">
          <div className="daisy-avatar">
            <div className="relative h-12 w-12  overflow-hidden rounded-full bg-slate-100">
              <Image
                src={user?.avatarUrl!}
                referrerPolicy="no-referrer"
                unoptimized
                fill
                sizes="64px"
                style={{
                  objectFit: 'cover',
                }}
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
              {user?.provider === 'gitcode' ? 'AtomGit' : ''}
            </span>
          </div>
        </div>

        <div className="ml-5 flex  items-center">
          {repoProviderCount && repoProviderCount > 1 ? (
            <button
              className="text-primary flex items-center text-sm"
              onClick={() => {
                userInfoStore.submitProvider = getNextProvider();
              }}
            >
              <HiOutlineSwitchHorizontal className="mr-1" />
              {t('submit_project:switch_to', {
                provider: getNextProviderName(),
              })}
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
