import React from 'react';
import HeaderWithFilterBar from '@modules/analyze/components/HeaderWithFitlerBar';
import { Content, Main } from '@common/components/Layout';
import Footer from '@common/components/Footer';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['analyze', 'metrics_models'])),
    },
  };
};

const Lab = () => {
  return (
    <>
      <HeaderWithFilterBar />
      <Main>
        <Content>
          <div></div>
          <Footer />
        </Content>
      </Main>
    </>
  );
};

export default Lab;
