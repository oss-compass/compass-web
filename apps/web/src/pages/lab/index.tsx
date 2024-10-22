import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import Header from '@common/components/Header';
import Banner from '@modules/lab/model/components/Banner';
import PublicModel from '@modules/lab/model/Public';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'lab',
        'lab_metrics',
        'collection',
      ])),
    },
  };
};

const LabPage = () => {
  return (
    <NoSsr>
      <Header />
      <Banner />
      <PublicModel />
    </NoSsr>
  );
};

export default LabPage;
