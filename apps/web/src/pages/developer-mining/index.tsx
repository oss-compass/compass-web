import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import DeveloperMining from '@modules/developer-mining';
import NoSsr from '@common/components/NoSsr';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home'])),
    },
  };
};

const DeveloperMiningPage = () => {
  return (
    <NoSsr>
      <DeveloperMining />
    </NoSsr>
  );
};

export default DeveloperMiningPage;
