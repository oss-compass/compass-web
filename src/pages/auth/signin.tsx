import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { getProviders } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import Header from '@common/components/Header';
import Banner from '@modules/submitProject/Misc/Banner';
import LoginOptionCard from '@modules/auth/LoginOptionCard';
import getLocalesFile from '@common/utils/getLocalesFile';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const providers = await getProviders();
  return {
    props: {
      providers,
      ...(await getLocalesFile(req.cookies, ['submit_project'])),
    },
  };
}

const SignIn: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <Banner content={t('submit_project:enroll_your_project')} />
      <LoginOptionCard providers={providers} />
    </>
  );
};

export default SignIn;
