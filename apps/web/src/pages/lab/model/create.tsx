import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Model/Banner';
import CreateForm from '@modules/lab/Model/Create';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab'])),
    },
  };
};

const create = () => {
  return (
    <NoSsr>
      <Header />
      <Banner />
      <AuthRequire loadingClassName="mx-auto w-[1000px] py-10 md:w-full md:px-6">
        <CreateForm />
      </AuthRequire>
    </NoSsr>
  );
};

export default create;
