import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/Model/Banner';
import My from '@modules/lab/Model/My';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['lab'])),
    },
  };
};

const create = () => {
  return (
    <NoSsr>
      <Header />
      <Banner />
      <My />
    </NoSsr>
  );
};

export default create;
