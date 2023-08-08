import React from 'react';
import type { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import ModelVersionView from '@modules/lab/Model/Version/View';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab'])),
    },
  };
};

const Version = () => {
  const router = useRouter();
  return (
    <NoSsr>
      <Header />
      <AuthRequire loadingClassName="mx-auto w-[1000px] py-10 md:w-full md:px-6">
        <ModelVersionView />
      </AuthRequire>
    </NoSsr>
  );
};

export default Version;
