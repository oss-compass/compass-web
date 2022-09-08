import React from 'react';
import { Header, Center } from '@common/components/BaseLayout';
import FooterLinks from '@common/components/FooterLinks';
import Copyright from '@common/components/Copyright';
import SectionBanner from './SectionBanner';
import SectionProjects from './SectionProjects';
import SectionExplain from './SectionExplain';

const Home = () => {
  return (
    <>
      <Header contentCenter />
      <main>
        <SectionBanner />
        <SectionProjects />
        <SectionExplain />
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
