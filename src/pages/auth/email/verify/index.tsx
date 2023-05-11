import React from 'react';
import Copyright from '@modules/auth/components/Copyright';
import LogoHeader from '@modules/auth/components/LogoHeader';
import Mail from '@public/images/login/mail.svg';
import getLocalesFile from '@common/utils/getLocalesFile';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['submit_project'])),
    },
  };
}
const Verify: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <LogoHeader />
      <div className="flex justify-center">
        <div className="mt-36 w-[720px] max-w-full border border-solid border-[#CFCFCF] bg-white px-[72px] pt-[64px] text-base text-slate-700 shadow-sm">
          <div className="flex h-24">
            <div className="flex w-24 flex-shrink-0 items-center justify-center rounded-full bg-[#3a5bef]">
              <Mail />
            </div>
            <div className="pl-6">
              <h1 className="m-0 my-2 text-xl font-semibold text-black sm:leading-8">
                {t('submit_project:email_verification_successful')}
              </h1>
              <div className="leading-6 text-black">
                {t('submit_project:the_email_address')}
                <span className="font-semibold"> poorfish@gmail.com </span>
                {t('submit_project:has_been_successfully')}
              </div>
            </div>
          </div>
          <div className="mt-5 mb-[56px] ml-[120px] flex h-12 w-[180px] items-center justify-center bg-black text-sm text-white">
            {t('submit_project:account_settings')}
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Verify;
