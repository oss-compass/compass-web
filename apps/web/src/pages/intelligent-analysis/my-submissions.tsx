import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import IntelligentAnalysisLayout from '@modules/intelligent-analysis/components/Layout';
import MySubmissions from '@modules/intelligent-analysis/DataView/MySubmissions';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const MySubmissionsPage: React.FC = () => {
  return (
    <IntelligentAnalysisLayout>
      <MySubmissions />
    </IntelligentAnalysisLayout>
  );
};

export default MySubmissionsPage;
