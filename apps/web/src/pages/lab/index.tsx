import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Banner';
import Model from '@modules/lab/Model';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab'])),
    },
  };
};

const LabPage = () => {
  return (
    <NoSsr>
      <Header />
      <Banner />
      <Model />
    </NoSsr>
  );
};

export default LabPage;
