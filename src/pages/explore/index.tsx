import React from 'react';
import { GetServerSideProps } from 'next';
import Explore from '@modules/explore';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['collection'])),
    },
  };
};

const ExplorePage = () => {
  return <Explore />;
};

export default ExplorePage;
