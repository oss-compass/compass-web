import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import OsBoardManage from '@modules/os-board/Manage';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['os_board'])),
    },
  };
};

const ManagePage = () => {
  return (
    <NoSsr>
      <Header />
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
        <OsBoardManage />
      </AuthRequire>
    </NoSsr>
  );
};

export default ManagePage;
