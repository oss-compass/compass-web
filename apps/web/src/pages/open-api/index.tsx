import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import OpenApi from '@modules/openApi';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['open_api'])),
    },
  };
};

const AcademePage = () => {
  return (
    <>
      <OpenApi />
    </>
  );
};

export default AcademePage;
