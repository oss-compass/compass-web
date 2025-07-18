import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AiOutlineUser, AiOutlineExperiment } from 'react-icons/ai';
import { MdOutlineLogout, MdOutlineSettings } from 'react-icons/md';
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
  const { providerUser: user, roleLevel } = useUserInfo();

  if (!user) {
    return (
      <Link
        href="/auth/signin"
        className={'ml-6 flex-shrink-0 font-medium text-white'}
      >
        {t('common:signin')}
      </Link>
    );
  }

  return (
    <div className="group relative flex h-full items-center pl-6 transition">
      <div className="border-secondary relative flex h-[32px] w-[32px] cursor-pointer items-center justify-center overflow-hidden rounded-full border group-hover:bg-[#333333]">
        <Image
          src={user?.avatarUrl!}
          unoptimized
          fill
          sizes="64px"
          style={{
            objectFit: 'cover',
          }}
          alt=""
        />
      </div>

      <div className="z-dropdown absolute top-[100%] -right-4 hidden w-auto group-hover:block">
        <div className="mt-[2px] bg-black/90 text-white">
          <Link
            href="/settings/subscribe"
            className="flex cursor-pointer items-center whitespace-nowrap border-b border-white/20 py-4 px-6 text-center last:border-b-0 hover:bg-[#333333]"
          >
            <FiBookmark className="mr-2 text-base" />
            {t('common:subscribe')}
          </Link>

          <Link
            href="/lab/model/my"
            className="flex cursor-pointer items-center whitespace-nowrap border-b border-white/20 py-4 px-6 text-center last:border-b-0 hover:bg-[#333333]"
          >
            <AiOutlineExperiment className="mr-2 text-base" />
            {t('common:my_models')}
          </Link>

          {roleLevel >= 7 && (
            <Link
              href="/system-admin"
              className="flex cursor-pointer items-center whitespace-nowrap border-b border-white/20 py-4 px-6 text-center last:border-b-0 hover:bg-[#333333]"
            >
              <MdOutlineSettings className="mr-2 text-base" />
              {t('common:system_admin')}
            </Link>
          )}

          <Link
            href="/settings/profile"
            className="flex cursor-pointer items-center whitespace-nowrap border-b border-white/20 py-4 px-6 text-center last:border-b-0 hover:bg-[#333333]"
          >
            <AiOutlineUser className="mr-2 text-base" />
            {t('common:profile_setting')}
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
