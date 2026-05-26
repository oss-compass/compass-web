import React from 'react';
import { GetServerSideProps } from 'next';

import getLocalesFile from '@common/utils/getLocalesFile';
import IntelligentAnalysisLayout from '@modules/intelligent-analysis/components/Layout';
import RustPage from '@modules/intelligent-analysis/Rust';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const RustAnalysisPage: React.FC = () => {
  return (
    <IntelligentAnalysisLayout>
      <RustPage />
    </IntelligentAnalysisLayout>
  );
};

export default RustAnalysisPage;
