import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import AuthRequire from '@modules/auth/AuthRequire';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Model/Banner';
import MyModel from '@modules/lab/Model/My';

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
        <MyModel />
      </AuthRequire>
    </NoSsr>
  );
};

export default create;
