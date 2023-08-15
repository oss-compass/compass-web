import React from 'react';
import { GetServerSideProps } from 'next';
import AuthRequire from '@modules/auth/AuthRequire';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Model/Banner';
import ModelEditForm from '@modules/lab/Model/Edit';
import ModelDetailProvider from '@modules/lab/Model/Provider/ModelDetailProvider';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab', 'lab_metrics'])),
    },
  };
};

const ModelEdit = () => {
  return (
    <NoSsr>
      <Header />
      <Banner />
      <AuthRequire loadingClassName="mx-auto w-[1200px] py-10 md:w-full">
        <ModelDetailProvider loadingClassName="mx-auto w-[1200px] lg:w-full md:px-4">
          <ModelEditForm />
        </ModelDetailProvider>
      </AuthRequire>
    </NoSsr>
  );
};

export default ModelEdit;
