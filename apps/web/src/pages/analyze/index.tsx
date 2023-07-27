import React from 'react';
import { GetServerSideProps } from 'next';
import Analyze from '@modules/analyze';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['analyze', 'metrics_models'])),
    },
  };
};

const AnalyzePage = () => {
  return <Analyze />;
};

export default AnalyzePage;
