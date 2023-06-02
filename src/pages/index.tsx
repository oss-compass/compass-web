import React from 'react';
import type { GetServerSideProps } from 'next';
import { NoSsr } from '@mui/base';
import Header from '@common/components/Header';
import { Center } from '@common/components/Layout';
import FooterLinks from '@common/components/FooterLinks';
import Copyright from '@common/components/Copyright';
import Questionnaire from '@common/components/Questionnaire';
import Banner from '@modules/home/Banner';
import HotFields from '@modules/home/HotFields';
import Trending from '@modules/home/Trending';
import Explain from '@modules/home/Explain';
import ExplainMobile from '@modules/home/Explain/Mobile';
import SpecialThank from '@modules/home/SpecialThank';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'home',
        'analyze',
        'metrics_models',
      ])),
    },
  };
};

const Home: React.FC = (props) => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <HotFields />
        <Trending />
        <NoSsr>
          <Explain />
          <ExplainMobile />
          <Questionnaire />
        </NoSsr>
        <SpecialThank />
      </main>
      <footer>
        <Center>
          <FooterLinks />
        </Center>
        <Copyright />
      </footer>
    </>
  );
};

export default Home;
