import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import OsSelection from '@modules/os-selection';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'submit_project',
        'os-selection',
      ])),
    },
  };
};

const OsSelectionPage = () => {
  return (
    <>
      <OsSelection />
    </>
  );
};

export default OsSelectionPage;
