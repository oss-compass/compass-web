import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import client from '@graphql/client';
import { useSignOutMutation } from '@graphql/generated';
import {
  cookieSetCallbackUrl,
  cookieSetAuthProvider,
} from '@common/utils/cookie';

const LoginItems: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const mutation = useSignOutMutation(client);

  const redirectTo = React.useMemo(() => {
    const rt = router.query.redirect_to;
    return typeof rt === 'string' ? rt : '/settings/profile';
  }, [router.query.redirect_to]);

  return (
    <>
      <div
        className="mb-6 flex h-12 w-[400px] cursor-pointer items-center bg-black  pl-24 text-white hover:bg-gray-900"
        onClick={async () => {
          mutation.mutate(
            {},
            {
              onSuccess: () => {
                cookieSetAuthProvider('github');
                cookieSetCallbackUrl(redirectTo);
                window.location.href = '/users/auth/github';
              },
            }
          );
        }}
      >
        <Image
          width={28}
          height={28}
          src={'/images/logos/white-github.svg'}
          alt={'github'}
        />
        <span className="ml-3">{t('submit_project:continue_with_github')}</span>
      </div>

      <div
        className="mb-6 flex h-12 w-[400px] cursor-pointer items-center bg-[#d90013] pl-24 text-white hover:bg-[#be0010]"
        onClick={async () => {
          mutation.mutate(
            {},
            {
              onSuccess: () => {
                cookieSetAuthProvider('gitee');
                cookieSetCallbackUrl(redirectTo);
                window.location.href = '/users/auth/gitee';
              },
            }
          );
        }}
      >
        <Image
          width={28}
          height={28}
          src={'/images/logos/white-gitee.svg'}
          alt={'gitee'}
        />
        <span className="ml-3">{t('submit_project:continue_with_gitee')}</span>
      </div>
    </>
  );
};

export default LoginItems;
