import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import DataView from '@modules/os-situation/DataView';
import NoSsr from '@common/components/NoSsr';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['os-situation'])),
    },
  };
};

const Metric = () => {
  return (
    <NoSsr>
      <DataView />
    </NoSsr>
  );
};

export default Metric;
