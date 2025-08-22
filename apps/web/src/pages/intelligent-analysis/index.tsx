import React from 'react';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/intelligent-analysis/overview',
      permanent: false,
    },
  };
};

const IntelligentAnalysisPage = () => {
  return null;
};

export default IntelligentAnalysisPage;
