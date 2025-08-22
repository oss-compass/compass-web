import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import IntelligentAnalysisLayout from '@modules/intelligent-analysis/components/Layout';
import Overview from '@modules/intelligent-analysis/DataView/Overview';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const OverviewPage: React.FC = () => {
  return (
    <IntelligentAnalysisLayout>
      <Overview />
    </IntelligentAnalysisLayout>
  );
};

export default OverviewPage;
