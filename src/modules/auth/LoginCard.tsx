import React from 'react';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import Image from 'next/image';
import { setCallbackUrl, setAuthProvider } from '@common/utils/cookie';

const LoginCard: React.FC<{ provider: { id: string; name: string } }> = ({
  provider,
}) => {
  const { t } = useTranslation();
  if (provider.id === 'github') {
    return (
      <div
        className={classnames(
          'flex h-48 w-[calc(50%-20px)] cursor-pointer flex-col items-center justify-center hover:opacity-90 md:mb-4 md:w-full',
          'bg-black'
        )}
        onClick={async () => {
          setAuthProvider('github');
          setCallbackUrl('/submit-your-project');
          window.location.href = '/users/auth/github';
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
          setAuthProvider('gitee');
          setCallbackUrl('/submit-your-project');
          window.location.href = '/users/auth/gitee';
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
