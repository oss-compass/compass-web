import React from 'react';
import { GetServerSideProps } from 'next';
import NoSsr from '@common/components/NoSsr';
import getLocalesFile from '@common/utils/getLocalesFile';
import { Main } from '@common/components/Layout';
import OhRole from '@modules/oh/components/OhRole';
import NavBar from '@modules/oh/NavBar';
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
        <Main>
          <Process />
        </Main>
      </OhRole>
    </NoSsr>
  );
};

export default ProcessPage;
