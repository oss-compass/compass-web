import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { SiGitee } from 'react-icons/si';
import Image from 'next/image';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { BuiltInProviderType } from 'next-auth/providers';
import { useTranslation } from 'react-i18next';

export const getIcons = (type: LiteralUnion<BuiltInProviderType>) => {
  switch (type) {
    case 'github':
      return <AiFillGithub className="cursor-pointer text-5xl" />;
    case 'gitee':
      return <SiGitee color="#c71c27" className="cursor-pointer text-5xl" />;
    default:
      return null;
  }
};

const Auth: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const { t } = useTranslation();
  const session = useSession();
  const isLogin = Boolean(session?.data);

  return (
    <>
      <h1 className="mb-4 text-xl font-medium">
        {t('submit_project:your_project_hosting_on')}
      </h1>

      {!isLogin && (
        <div className="flex">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                className="h-12 w-12"
                onClick={() => signIn(provider.id)}
              >
                {getIcons(provider.id)}
              </button>
            ))}
        </div>
      )}

      {isLogin && (
        <div className="flex items-center justify-between ">
          <div className="flex">
            <div className="daisy-avatar">
              <div className="h-12 w-12 rounded-full bg-slate-100">
                <Image
                  width={48}
                  height={48}
                  src={session!.data!.user?.image!}
                  unoptimized
                  alt={''}
                />
              </div>
            </div>
            <div className="ml-4 flex flex-col">
              <span className="text-base font-medium line-clamp-1">
                {session?.data?.user?.name}
              </span>
              <span className="text-sm text-gray-400">
                {session?.data?.provider === 'gitee' ? 'Gitee' : ''}
                {session?.data?.provider === 'github' ? 'GitHub' : ''}
              </span>
            </div>
          </div>
          <div className="ml-5 flex w-16 items-center">
            <button className="text-primary" onClick={() => signOut()}>
              {t('submit_project:logout')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
