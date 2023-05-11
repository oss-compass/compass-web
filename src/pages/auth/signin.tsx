import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
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
      <LoginPage />
    </>
  );
};

export default SignIn;
