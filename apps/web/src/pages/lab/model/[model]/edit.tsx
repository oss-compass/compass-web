import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Model/Banner';
import ModelEditForm from '@modules/lab/Model/Edit';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab'])),
    },
  };
};

const ModelEdit = () => {
  return (
    <NoSsr>
      <Header />
      <Banner />
      <ModelEditForm />
    </NoSsr>
  );
};

export default ModelEdit;
