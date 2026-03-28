import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';

const Oh = dynamic(() => import('@modules/oh'));

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home'])),
    },
  };
};

const OhPage = () => {
  return (
    <NoSsr>
      <Oh />
    </NoSsr>
  );
};

export default OhPage;
