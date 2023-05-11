import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import LoginPage from '@modules/auth/LoginPage';
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
  return (
    <>
      <Header />
      <Banner content={t('submit_project:enroll_your_project')} />
      <LoginPage />
    </>
  );
};

export default SignIn;
