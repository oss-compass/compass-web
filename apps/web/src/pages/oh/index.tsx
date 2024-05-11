import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import Oh from '@modules/oh';
import Header from '@common/components/Header';
import NoSsr from '@common/components/NoSsr';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['analyze', 'oh'])),
    },
  };
};

const OhPage = () => {
  return (
    <>
      <NoSsr>
        <Header />
        <Oh />
      </NoSsr>
    </>
  );
};

export default OhPage;
