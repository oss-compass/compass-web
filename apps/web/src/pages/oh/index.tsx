import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import Oh from '@modules/oh';
import NoSsr from '@common/components/NoSsr';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home'])),
    },
  };
};

const OhPage = () => {
  return (
    <>
      <NoSsr>
        <Oh />
      </NoSsr>
    </>
  );
};

export default OhPage;
