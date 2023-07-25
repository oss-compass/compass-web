import React from 'react';
import classNames from 'classnames';
import Router, { useRouter } from 'next/router';
import { useSnapshot } from 'valtio';
import Copyright from '@modules/auth/components/Copyright';
import LogoHeader from '@modules/auth/components/LogoHeader';
import AuthRequire from '@modules/auth/AuthRequire';
import { userInfoStore } from '@modules/auth/UserInfoStore';
import { Button } from '@oss-compass/ui';
import Mail from '@public/images/login/mail.svg';
import getLocalesFile from '@common/utils/getLocalesFile';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['auth'])),
    },
  };
}

const Content = ({ status }: { status: string }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { currentUser } = useSnapshot(userInfoStore);

  const isSuccess = status === 'success';

  const title = isSuccess
    ? t('auth:email_verification_successful')
    : t('auth:email_verification_expired');

  const desc = isSuccess ? (
    <>
      {t('auth:the_email_address')}
      <span className="font-semibold"> {currentUser?.email} </span>
      {t('auth:has_been_successfully')}
    </>
  ) : (
    <>{t('auth:resend_email')}</>
  );

  return (
    <>
      <div className="flex px-[72px] pt-[64px]">
        <div
          className={classNames(
            'flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full ',
            {
              'bg-primary': status === 'success',
              'bg-[#ff0000]': status === 'failed',
            }
          )}
        >
          <Mail />
        </div>
        <div className="pl-6">
          <h1 className="m-0 my-2 text-xl font-semibold text-black sm:leading-8">
            {title}
          </h1>
          <div className="leading-6 text-black">{desc}</div>
        </div>
      </div>
      <div className="mt-5 mb-[56px] ml-[190px]">
        <Button
          size="lg"
          onClick={() => {
            router.push('/settings/profile');
          }}
        >
          {t('auth:account_setting')}
        </Button>
      </div>
    </>
  );
};

const Verify: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const status = router.query.status as string;

  return (
    <div>
      <LogoHeader />
      <div className="flex justify-center">
        <div
          className={classNames(
            'mt-36 w-[720px] max-w-full border border-solid border-[#CFCFCF] bg-white text-base text-slate-700 shadow-sm',
            'md:mx-6 md:w-full md:px-6'
          )}
        >
          <AuthRequire className="p-6">
            <Content status={status} />
          </AuthRequire>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Verify;
