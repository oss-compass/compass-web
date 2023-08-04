import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Model/Banner';
import ModelVersionCreate from '@modules/lab/Model/Version/Create';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab'])),
    },
  };
};

const VersionCreate = () => {
  return (
    <NoSsr>
      <Header />
      <Banner />
      <ModelVersionCreate />
    </NoSsr>
  );
};

export default VersionCreate;
