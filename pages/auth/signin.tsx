import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { getProviders } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { Header } from '@common/components/Layout';
import Banner from '@modules/submitProject/Misc/Banner';
import LoginOptionCard from '@modules/auth/LoginOptionCard';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const providers = await getProviders();
  return { props: { providers } };
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
