import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Model/Banner';
import VersionCreatePage from '@modules/lab/Model/Version/CreatePage';
import ModelDetailProvider from '@modules/lab/Model/Provider/ModelDetailProvider';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab', 'lab_metrics'])),
    },
  };
};

const VersionCreate = () => {
  return (
    <NoSsr>
      <Header />
      <Banner />
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
        <ModelDetailProvider loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
          <VersionCreatePage />
        </ModelDetailProvider>
      </AuthRequire>
    </NoSsr>
  );
};

export default VersionCreate;
