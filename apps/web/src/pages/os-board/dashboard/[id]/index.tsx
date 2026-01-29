import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import OsBoardDetail from '@modules/os-board/Detail';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['os_board', 'lab', 'analyze'])),
    },
  };
};

const DashboardDetailPage = () => {
  return (
    <NoSsr>
      <Header />
      {/* <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6"> */}
      <OsBoardDetail />
      {/* </AuthRequire> */}
    </NoSsr>
  );
};

export default DashboardDetailPage;
