import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import getLocalesFile from '@common/utils/getLocalesFile';

const Collection = dynamic(() => import('@modules/collection'));

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['collection'])),
    },
  };
};

const CollectionPage = () => {
  return <Collection />;
};

export default CollectionPage;
