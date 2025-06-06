import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import OsSituation from '@modules/os-situation';
import NoSsr from '@common/components/NoSsr';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['os-situation'])),
    },
  };
};

const OsSituationPage = () => {
  return (
    <NoSsr>
      <OsSituation />
    </NoSsr>
  );
};

export default OsSituationPage;
