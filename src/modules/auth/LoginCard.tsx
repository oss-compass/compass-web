import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import Image from 'next/image';
import client from '@graphql/client';
import { useSignOutMutation } from '@graphql/generated';
import { setCallbackUrl, setAuthProvider } from '@common/utils/cookie';

const LoginCard: React.FC<{ provider: { id: string; name: string } }> = ({
  provider,
}) => {
  const router = useRouter();
  const { t } = useTranslation();
  const mutation = useSignOutMutation(client);

  const redirectTo = React.useMemo(() => {
    const rt = router.query.redirect_to;
    return typeof rt === 'string' ? rt : '/settings/profile';
  }, [router.query.redirect_to]);

  if (provider.id === 'github') {
    return (
      <div
        className={classnames(
          'flex h-48 w-[calc(50%-20px)] cursor-pointer flex-col items-center justify-center hover:opacity-90 md:mb-4 md:w-full',
          'bg-black'
        )}
        onClick={async () => {
          mutation.mutate(
            {},
            {
              onSuccess: () => {
                setAuthProvider('github');
                setCallbackUrl(redirectTo);
                window.location.href = '/users/auth/github';
              },
            }
          );
        }}
      >
        <div className="mb-7  ">
          <Image
            width={64}
            height={64}
            src={'/images/logos/white-github.svg'}
            alt={'github'}
          />
        </div>
        <div className="font-semibold text-white">
          {t('submit_project:sign_in_with_github')}
        </div>
      </div>
    );
  }

  if (provider.id === 'gitee') {
    return (
      <div
        className={classnames(
          'flex h-48 w-[calc(50%-20px)] cursor-pointer flex-col items-center justify-center hover:opacity-90 md:mb-4 md:w-full',
          'bg-[#d9001a]'
        )}
        onClick={async () => {
          mutation.mutate(
            {},
            {
              onSuccess: () => {
                setAuthProvider('gitee');
                setCallbackUrl(redirectTo);
                window.location.href = '/users/auth/gitee';
              },
            }
          );
        }}
      >
        <div className="mb-7  ">
          <Image
            width={64}
            height={64}
            src={'/images/logos/white-gitee.svg'}
            alt={'gitee'}
          />
        </div>
        <h1 className="font-semibold text-white">
          {t('submit_project:sign_in_with_gitee')}
        </h1>
      </div>
    );
  }

  return null;
};

export default LoginCard;
