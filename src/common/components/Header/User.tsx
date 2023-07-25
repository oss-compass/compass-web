import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AiOutlineUser } from 'react-icons/ai';
import { MdOutlineLogout } from 'react-icons/md';
import { FiBookmark } from 'react-icons/fi';
import client from '@common/gqlClient';
import { useSignOutMutation } from '@oss-compass/graphql';
import { resetUserInfo } from '@modules/auth/UserInfoStore';
import { useTranslation } from 'react-i18next';
import { useUserInfo } from '@modules/auth';

const User = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const mutation = useSignOutMutation(client);
  const { providerUser: user } = useUserInfo();

  if (!user) {
    return (
      <Link href="/auth/signin">
        <a className={'ml-6 flex-shrink-0 font-medium text-white'}>
          {t('common:signin')}
        </a>
      </Link>
    );
  }

  return (
    <div className="group relative flex h-full items-center pl-6 transition">
      <div className="flex h-[32px] cursor-pointer items-center justify-center overflow-hidden rounded-full group-hover:bg-[#333333]">
        <Image
          src={user?.avatarUrl!}
          unoptimized
          width={32}
          height={32}
          alt=""
        />
      </div>

      <div className="absolute top-[100%] -right-4 z-dropdown hidden w-auto group-hover:block">
        <div className="mt-[2px] bg-black/90 text-white">
          <Link href="/settings/subscribe">
            <a className="flex cursor-pointer items-center whitespace-nowrap border-b border-white/20 py-4 px-6 text-center last:border-b-0 hover:bg-[#333333]">
              <FiBookmark className="mr-2 text-base" />
              {t('common:subscribe')}
            </a>
          </Link>

          <Link href="/settings/profile">
            <a className="flex cursor-pointer items-center whitespace-nowrap border-b border-white/20 py-4 px-6 text-center last:border-b-0 hover:bg-[#333333]">
              <AiOutlineUser className="mr-2 text-base" />
              {t('common:profile_setting')}
            </a>
          </Link>

          <div
            className="flex cursor-pointer items-center  whitespace-nowrap border-b border-white/20 py-4 pl-6 text-center last:border-b-0 hover:bg-[#333333]"
            onClick={() => {
              mutation.mutate(
                {},
                {
                  onSuccess: () => {
                    resetUserInfo();
                    router.push('/auth/signin');
                  },
                }
              );
            }}
          >
            <MdOutlineLogout className="mr-2 text-base" /> {t('common:signout')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
