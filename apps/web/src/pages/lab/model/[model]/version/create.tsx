import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import MyModelsBanner from '@modules/lab/model/components/MyModelsBanner';
import VersionCreatePage from '@modules/lab/model/Version/CreatePage';
import ModelDetailProvider from '@modules/lab/model/Provider/ModelDetailProvider';

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
      <MyModelsBanner />
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
        <ModelDetailProvider loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
          <VersionCreatePage />
        </ModelDetailProvider>
      </AuthRequire>
    </NoSsr>
  );
};

export default VersionCreate;
