import React from 'react';
import { GetServerSideProps } from 'next';
import Collection from '@modules/collection';
import getLocalesFile from '@common/utils/getLocalesFile';

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
