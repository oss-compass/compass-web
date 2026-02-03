import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import OsBoardHome from '@modules/os-board/Home';
import AuthRequire from '@modules/auth/AuthRequire';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'os_board',
        'lab_metrics',
        'metrics_models',
        'metrics_models_v2',
      ])),
    },
  };
};

const OsBoardPage = () => {
  return (
    <NoSsr>
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
        <Header />
        <OsBoardHome />
      </AuthRequire>
    </NoSsr>
  );
};

export default OsBoardPage;
