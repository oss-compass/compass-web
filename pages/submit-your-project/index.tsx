import React from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import SubmitProject from '@modules/submitProject';
import { Header } from '@common/components/Layout';

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
  return (
    <>
      <Header />
      <SubmitProject providers={providers} />
    </>
  );
};

export default SubmitYourProject;
