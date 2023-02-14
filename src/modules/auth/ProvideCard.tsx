import React from 'react';
import { ClientSafeProvider } from 'next-auth/react/types';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

const ProvideCard: React.FC<{ provider: ClientSafeProvider }> = ({
  provider,
}) => {
  const { t } = useTranslation();
  if (provider.id === 'github') {
    return (
      <div
        className={classnames(
          'flex h-48 w-[calc(50%-20px)] cursor-pointer flex-col items-center justify-center hover:opacity-90 md:mb-4 md:w-full',
          {
            'bg-black': provider.id === 'github',
            'bg-[#d9001a]': provider.id === 'gitee',
          }
        )}
        onClick={async () => {
          await signIn(provider.id, {
            callbackUrl: '/submit-your-project',
          });
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
          {
            'bg-black': provider.id === 'github',
            'bg-[#d9001a]': provider.id === 'gitee',
          }
        )}
        onClick={async () => {
          await signIn(provider.id, {
            callbackUrl: '/submit-your-project',
          });
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

export default ProvideCard;
