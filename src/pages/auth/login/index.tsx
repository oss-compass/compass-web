import React from 'react';
import Copyright from '@modules/auth/components/Copyright';
import LogoHeader from '@modules/auth/components/LogoHeader';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import getLocalesFile from '@common/utils/getLocalesFile';
import { GetServerSidePropsContext } from 'next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['submit_project'])),
    },
  };
}
const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <LogoHeader />
      <div className="flex flex-col items-center">
        <h1 className="my-12 text-3xl font-bold">
          {t('submit_project:welcome_to')}
        </h1>
        <div className="mb-6 flex h-12 w-[400px] items-center bg-black pl-24 text-white">
          <Image
            width={28}
            height={28}
            src={'/images/logos/white-github.svg'}
            alt={'github'}
          />
          <span className="ml-3">
            {t('submit_project:continue_with_github')}
          </span>
        </div>
        <div className="mb-6 flex h-12 w-[400px] items-center bg-[#d90013] pl-24 text-white">
          <Image
            width={28}
            height={28}
            src={'/images/logos/white-gitee.svg'}
            alt={'gitee'}
          />
          <span className="ml-3">
            {t('submit_project:continue_with_gitee')}
          </span>
        </div>
        <div className="w-[400px] text-xs">
          {t('submit_project:by_creating_an_account')}
          <span className="text-[#3A5BEF]">
            {t('submit_project:terms_of_use')}
          </span>
          {t('submit_project:as_well_as')}
          <span className="text-[#3A5BEF]">
            {t('submit_project:non_active_account_processing_specification')}
          </span>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Login;
