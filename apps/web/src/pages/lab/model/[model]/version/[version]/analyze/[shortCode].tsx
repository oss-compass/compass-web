import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import AnalyzePage from '@modules/lab/Model/Analyze';
import ModelInfoProvider from '@modules/lab/Model/Provider/ModelVersionProvider';

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
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
        <ModelInfoProvider>
          <AnalyzePage />
        </ModelInfoProvider>
      </AuthRequire>
    </NoSsr>
  );
};

export default VersionCreate;
