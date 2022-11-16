import React, { useEffect } from 'react';
import { getProviders, useSession } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react/types';
import { Header } from '@common/components/Layout';
import Banner from '@modules/submitProject/Misc/Banner';
import SubmitProject from '@modules/submitProject';
import FormCommunity from '@modules/submitProject/FormCommunity';
import { GetServerSidePropsContext } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import { useSessionStorage } from 'react-use';
import { GITHUB_CLIENT_ID } from '@modules/submitProject/constant';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const githubClientID = process.env.GITHUB_ID;
  const providers = await getProviders();
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return { redirect: { destination: '/auth/signin', permanent: false } };
  }

  if (!session.user.email) session.user.email = '';
  return { props: { session, providers, githubClientID } };
}

const SubmitYourProject: React.FC<{
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
  githubClientID: string;
}> = ({ providers, githubClientID }) => {
  useSessionStorage(GITHUB_CLIENT_ID, githubClientID);
  return (
    <>
      <Header />
      <Banner content="Submit your project" />
      <SubmitProject providers={providers}>
        <FormCommunity />
      </SubmitProject>
    </>
  );
};

export default SubmitYourProject;
