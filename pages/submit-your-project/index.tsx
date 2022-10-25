import React from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { Header } from '@common/components/Layout';
import Banner from '@modules/submitProject/Banner';
import SubmitProject from '@modules/submitProject';
import LoginOptionCard from '@modules/submitProject/LoginOptionCard';

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const SubmitYourProject: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <>
        <Header />
        <Banner />
        <SubmitProject providers={providers} />
      </>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <Header />
        <Banner />
        <LoginOptionCard providers={providers} />
      </>
    );
  }

  return null;
};

export default SubmitYourProject;
