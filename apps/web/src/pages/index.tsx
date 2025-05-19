import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import DataHub from '@modules/dataHub';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['open_api'])),
    },
  };
};

const DataHubPage = () => {
  return (
    <>
      <DataHub />
    </>
  );
};

export default DataHubPage;
