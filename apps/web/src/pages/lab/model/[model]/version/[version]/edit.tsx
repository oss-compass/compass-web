import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Model/Banner';
import VersionEdit from '@modules/lab/Model/Version/Edit';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab'])),
    },
  };
};

const ModelVersionEdit = () => {
  return (
    <NoSsr>
      <Header />
      <Banner />
      <VersionEdit />
    </NoSsr>
  );
};

export default ModelVersionEdit;
