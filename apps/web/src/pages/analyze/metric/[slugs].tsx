import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import MetricDetailPage from '@modules/analyze/MetricDetailPage';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['analyze', 'metrics_models'])),
    },
  };
};

const MetricDetail = () => {
  return <MetricDetailPage />;
};

export default MetricDetail;
