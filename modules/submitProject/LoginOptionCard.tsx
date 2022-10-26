import React from 'react';
import Image from 'next/image';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { BuiltInProviderType } from 'next-auth/providers';
import { signIn } from 'next-auth/react';
import { FiAlertCircle } from 'react-icons/fi';
import classnames from 'classnames';
import { useRouter } from 'next/router';

export const getIcons = (type: LiteralUnion<BuiltInProviderType>) => {
  switch (type) {
    case 'github':
      return (
        <>
          <div className="mb-7  ">
            <Image
              width={64}
              height={64}
              src={'/images/logos/white-github.svg'}
              alt={'github'}
            />
          </div>
          <div className="font-semibold text-white">Sign in with GitHub</div>
        </>
      );
    case 'gitee':
      return (
        <>
          <div className="mb-7  ">
            <Image
              width={64}
              height={64}
              src={'/images/logos/white-gitee.svg'}
              alt={'gitee'}
            />
          </div>
          <h1 className="font-semibold text-white">Sign in with Gitee</h1>
        </>
      );
    default:
      return null;
  }
};

const LoginOptionCard: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const router = useRouter();
  const error = router.query.error;

  return (
    <div className="mx-auto w-[1000px] md:w-full md:px-10 md:pb-10">
      <h3 className="mt-32 mb-10 text-xl font-medium">
        Please select the platform where your project is hosted
      </h3>
      <div>
        <div className="flex justify-between md:flex-col">
          {providers &&
            Object.values(providers).map((provider) => {
              return (
                <div
                  key={provider.name}
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
                  {getIcons(provider.id)}
                </div>
              );
            })}
        </div>
      </div>
      {error && (
        <h4 className="mt-10 flex items-center text-lg font-medium text-warning">
          <FiAlertCircle className="mr-2 text-2xl" /> outgoing request timed
          out, please try again!
        </h4>
      )}
    </div>
  );
};

export default LoginOptionCard;
