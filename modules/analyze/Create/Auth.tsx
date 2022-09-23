import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import { AiFillGithub } from 'react-icons/ai';
import { SiGitee } from 'react-icons/si';
import Image from 'next/image';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { BuiltInProviderType } from 'next-auth/providers';

const Auth: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const session = useSession();
  const isLogin = Boolean(session?.data);

  return (
    <>
      <h1 className="mb-4">Your project repository is hosted at</h1>

      <div className="pl-60">
        {!isLogin && (
          <div className="flex">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button onClick={() => signIn(provider.id)}>
                  {provider.id === 'github' && (
                    <AiFillGithub className="cursor-pointer text-6xl" />
                  )}
                  {provider.id === 'gitee' && (
                    <SiGitee
                      color="#c71c27"
                      className="cursor-pointer text-6xl"
                    />
                  )}
                </button>
              </div>
            ))}
          </div>
        )}

        {isLogin && (
          <div className="flex flex-col items-start">
            <div className="avatar flex-shrink-0">
              <div className="rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                <Image
                  width={40}
                  height={40}
                  src={session.data!.user?.image as string}
                  alt={''}
                />
              </div>
            </div>
            <span>{session.data!.user?.name}</span>
            <button
              className="btn btn-outline btn-sm"
              onClick={() => signOut()}
            >
              logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Auth;
