import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import ReportPage from '@modules/os-selection/DataView/MyReports/ReportPage';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['os-selection', 'mertic_detail'])),
    },
  };
};

const ReportPagePage = () => {
  return (
    <>
      <ReportPage />
    </>
  );
};

export default ReportPagePage;
