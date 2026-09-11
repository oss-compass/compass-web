import React from 'react';
import { GetServerSideProps } from 'next';

import getLocalesFile from '@common/utils/getLocalesFile';
import IntelligentAnalysisLayout from '@modules/intelligent-analysis/components/Layout';
import IntelligentAnalysisAccessGuard from '@modules/intelligent-analysis/components/AccessGuard';
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
      <IntelligentAnalysisAccessGuard>
        <RustPage />
      </IntelligentAnalysisAccessGuard>
    </IntelligentAnalysisLayout>
  );
};

export default RustAnalysisPage;
