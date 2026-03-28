import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import getLocalesFile from '@common/utils/getLocalesFile';

const Explore = dynamic(() => import('@modules/explore'));

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
