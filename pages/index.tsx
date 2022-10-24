import React from 'react';
import { Header, Center } from '@common/components/Layout';
import FooterLinks from '@common/components/FooterLinks';
import Copyright from '@common/components/Copyright';
import Banner from '@modules/home/Banner';
import Projects from '@modules/home/Projects';
import Explain from '@modules/home/Explain';
import SpecialThank from '@modules/home/SpecialThank';

const Home = () => {
  return (
    <>
      <Header />
      <main>
        <Banner />
        <Projects />
        <Explain />
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
