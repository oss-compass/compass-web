import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import OsSituation from '@modules/os-situation';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['os_situation'])),
    },
  };
};

const OsSituationPage = () => {
  return (
    <>
      <OsSituation />
    </>
  );
};

export default OsSituationPage;
