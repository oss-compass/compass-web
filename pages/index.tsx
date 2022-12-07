import React from 'react';
import type { GetServerSideProps } from 'next';
import { NoSsr } from '@mui/base';
import Header from '@common/components/Header';
import { Center } from '@common/components/Layout';
import FooterLinks from '@common/components/FooterLinks';
import Copyright from '@common/components/Copyright';
import Banner from '@modules/home/Banner';
import HotFields from '@modules/home/HotFields';
import Projects from '@modules/home/Projects';
import Explain from '@modules/home/Explain';
import SpecialThank from '@modules/home/SpecialThank';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'metrics_models'])),
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
        <Projects />
        <NoSsr>
          <Explain />
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
