import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import OsBoardCreate from '@modules/os-board/Create';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'lab',
        'os_board',
        'lab_metrics',
        'metrics_models',
        'metrics_models_v2',
      ])),
    },
  };
};

const CreateDashboardPage = () => {
  return (
    <NoSsr>
      <Header />
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
        <OsBoardCreate />
      </AuthRequire>
    </NoSsr>
  );
};

export default CreateDashboardPage;
