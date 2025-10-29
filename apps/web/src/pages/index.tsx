import React from 'react';
import type { GetServerSideProps } from 'next';
import { NoSsr } from '@mui/base';
import Header from '@common/components/Header';
import { Center } from '@common/components/Layout';
import FooterLinks from '@common/components/FooterLinks';
import Copyright from '@common/components/Copyright';
import Questionnaire from '@common/components/Questionnaire';
import LatestUpdate from '@modules/home/LatestUpdate';
import Banner from '@modules/home/Banner';
import HotFields from '@modules/home/HotFields';
import Trending from '@modules/home/Trending';
import Explain from '@modules/home/Explain';
import LatestNews from '@modules/home/LatestNews';
import Purpose from '@modules/home/Purpose';
import StatisticsModule from '@modules/home/StatisticsModule';

// import ExplainMobile from '@modules/home/Explain/Mobile';
import SpecialThank from '@modules/home/SpecialThank';
import getLocalesFile from '@common/utils/getLocalesFile';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, [
        'home',
        'analyze',
        'metrics_models',
        'academe',
      ])),
    },
  };
};

const Home: React.FC = (props) => {
  return (
    <>
      <Header />
      <main>
        {/* <LatestUpdate /> */}
        <Banner />
        <Purpose />
        <HotFields />
        <Trending />
        <LatestNews />
        <NoSsr>
          <Explain />
          {/* <ExplainMobile /> */}
          {/* <Questionnaire /> */}
        </NoSsr>
        <StatisticsModule />
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
