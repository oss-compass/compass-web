import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import getLocalesFile from '@common/utils/getLocalesFile';
import getReportMetadata from '@common/server/reportMetadata';

const Analyze = dynamic(() => import('@modules/analyze'));

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const [locales, reportMetadata] = await Promise.all([
    getLocalesFile(req.cookies, ['analyze', 'metrics_models']),
    getReportMetadata(query),
  ]);
  return {
    props: {
      ...locales,
      reportMetadata,
    },
  };
};

const AnalyzePage = () => {
  return <Analyze />;
};

export default AnalyzePage;
