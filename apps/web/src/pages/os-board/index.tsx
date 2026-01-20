import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import OsBoardHome from '@modules/os-board/Dashboard/Home';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'os_board',
        'lab_metrics',
        'metrics_models',
      ])),
    },
  };
};

const OsBoardPage = () => {
  return (
    <NoSsr>
      <Header />
      <OsBoardHome />
    </NoSsr>
  );
};

export default OsBoardPage;
