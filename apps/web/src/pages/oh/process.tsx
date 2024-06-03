import React from 'react';
import { GetServerSideProps } from 'next';
import NoSsr from '@common/components/NoSsr';
import getLocalesFile from '@common/utils/getLocalesFile';
import OhRole from '@modules/oh/components/OhRole';
import Process from '@modules/oh/Process';
import Header from '@common/components/Header';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['analyze', 'oh'])),
    },
  };
};
const ProcessPage = () => {
  return (
    <NoSsr>
      <OhRole>
        <Header />
        <Process />
      </OhRole>
    </NoSsr>
  );
};

export default ProcessPage;
