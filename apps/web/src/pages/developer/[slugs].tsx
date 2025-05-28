import React from 'react';
import { GetServerSideProps } from 'next';
import Developer from '@modules/developer';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'analyze',
        'metrics_models',
        'developer',
      ])),
    },
  };
};

const DeveloperPage = () => {
  return <Developer />;
};

export default DeveloperPage;
