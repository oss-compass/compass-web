import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { getProviders } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { Header } from '@common/components/Layout';
import Banner from '@modules/submitProject/Misc/Banner';
import LoginOptionCard from '@modules/auth/LoginOptionCard';
import getLocalesFile from '@common/utils/getLocalesFile';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const providers = await getProviders();
  return { props: { providers, ...(await getLocalesFile(req.cookies)) } };
}

const SignIn: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  return (
    <>
      <Header />
      <Banner content="Enroll your project" />
      <LoginOptionCard providers={providers} />
    </>
  );
};

export default SignIn;
