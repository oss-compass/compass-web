import React from 'react';
import { getProviders, signIn, signOut, useSession } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import AnalyzeCreate from '@modules/analyze/Create';
import { Header } from '@common/components/Layout';

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}

const Create: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}> = ({ providers }) => {
  return (
    <>
      <Header contentCenter />
      <AnalyzeCreate providers={providers} />
    </>
  );
};

export default Create;
