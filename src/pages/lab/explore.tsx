import React from 'react';
import { GetServerSideProps } from 'next';
import LibDetail from '@modules/lab/Detail/LibDetail';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'analyze',
        'metrics_models',
        'lab',
      ])),
    },
  };
};

const LabDetailPage = () => {
  return <LibDetail />;
};

export default LabDetailPage;
