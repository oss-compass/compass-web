import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import Academe from '@modules/academe';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['academe'])),
    },
  };
};

const AcademePage = () => {
  return (
    <>
      <Academe />
    </>
  );
};

export default AcademePage;
