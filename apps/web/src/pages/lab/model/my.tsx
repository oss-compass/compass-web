import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import AuthRequire from '@modules/auth/AuthRequire';
import FlashToast from '@common/components/FlashToast';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import MyModelsBanner from '@modules/lab/model/components/MyModelsBanner';
import MyModel from '@modules/lab/model/My';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab', 'lab_metrics'])),
    },
  };
};

const create = () => {
  return (
    <NoSsr>
      <Header />
      <MyModelsBanner />
      <FlashToast />
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full md:px-6">
        <MyModel />
      </AuthRequire>
    </NoSsr>
  );
};

export default create;
