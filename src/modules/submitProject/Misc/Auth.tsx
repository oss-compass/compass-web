import React, { useEffect } from 'react';
import Image from 'next/image';
import client from '@graphql/client';
import { useRouter } from 'next/router';
import { useSnapshot } from 'valtio';
import { useTranslation } from 'react-i18next';
import { userInfoStore } from '@modules/auth/UserInfoStore';
import { useSignOutMutation } from '@graphql/generated';

const Auth: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { user, loading } = useSnapshot(userInfoStore);
  const hasLoggedIn = Boolean(user);
  const mutation = useSignOutMutation(client);

  useEffect(() => {
    if (!loading && !hasLoggedIn) {
      router.push('/auth/signin');
    }
  }, [loading, hasLoggedIn, router]);

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

        <div className="ml-5 flex w-16 items-center">
          <button
            className="text-primary"
            onClick={() => {
              mutation.mutate(
                {},
                {
                  onSuccess: () => {
                    router.push('/auth/signin');
                  },
                }
              );
            }}
          >
            {t('submit_project:logout')}
          </button>
        </div>
      </div>
    </>
  );
};

export default Auth;
