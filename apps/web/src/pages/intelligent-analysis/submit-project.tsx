import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import IntelligentAnalysisLayout from '@modules/intelligent-analysis/components/Layout';
import SubmitProject from '@modules/intelligent-analysis/DataView/SubmitProject';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const SubmitProjectPage: React.FC = () => {
  return (
    <IntelligentAnalysisLayout>
      <SubmitProject />
    </IntelligentAnalysisLayout>
  );
};

export default SubmitProjectPage;
