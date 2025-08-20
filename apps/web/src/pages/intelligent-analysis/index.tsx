import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import IntelligentAnalysis from '@modules/intelligent-analysis';
import NoSsr from '@common/components/NoSsr';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home'])),
    },
  };
};

const IntelligentAnalysisPage = () => {
  return (
    <NoSsr>
      <IntelligentAnalysis />
    </NoSsr>
  );
};

export default IntelligentAnalysisPage;
