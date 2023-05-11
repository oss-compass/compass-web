import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { FiAlertCircle } from 'react-icons/fi';
import Copyright from '@modules/auth/components/Copyright';
import LogoHeader from '@modules/auth/components/LogoHeader';
import LoginItems from '@modules/auth/LoginItems';
import getLocalesFile from '@common/utils/getLocalesFile';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['submit_project'])),
    },
  };
}

const SignIn: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const error = router.query.error;

  return (
    <div>
      {error && (
        <h4 className="mt-4 flex items-center justify-center text-base font-medium text-warning">
          <FiAlertCircle className="mr-2 text-xl" /> {error}
        </h4>
      )}

      <LogoHeader />
      <div className="flex flex-col items-center">
        <h1 className="my-12 text-3xl font-bold">
          {t('submit_project:welcome_to')}
        </h1>

        <LoginItems />

        <div className="w-[400px] text-xs">
          {t('submit_project:by_creating_an_account')}
          <Link href="/docs/terms-of-use/">
            <a target="_blank" className="text-[#3A5BEF]">
              {t('submit_project:terms_of_use')}
            </a>
          </Link>

          {t('submit_project:as_well_as')}

          <Link href="/docs/privacy-policy/">
            <a target="_blank" className="text-[#3A5BEF]">
              {t('submit_project:non_active_account_processing_specification')}
            </a>
          </Link>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default SignIn;
