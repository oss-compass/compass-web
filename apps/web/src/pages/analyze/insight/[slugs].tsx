import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import MetricDetailPage from '@modules/analyze/MetricDetailPage';
import AuthRequire from '@modules/auth/AuthRequire';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['analyze', 'metrics_models'])),
    },
  };
};

const MetricDetail = () => {
  return (
    <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
      <MetricDetailPage />
    </AuthRequire>
  );
};

export default MetricDetail;
