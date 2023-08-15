import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Model/Banner';
import DataSetPage from '@modules/lab/Model/Version/DataSetPage';
import ModelVersionProvider from '@modules/lab/Model/Provider/ModelVersionProvider';

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
        <ModelVersionProvider loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
          <DataSetPage />
        </ModelVersionProvider>
      </AuthRequire>
    </NoSsr>
  );
};

export default VersionCreate;
