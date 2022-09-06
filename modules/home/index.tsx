import React from 'react';
import { Header, Center } from '@components/BaseLayout';
import SectionBanner from './SectionBanner';
import SectionProjects from './SectionProjects';
import SectionExplain from './SectionExplain';
import FooterLinks from '@components/FooterLinks';
import Copyright from '@components/Copyright';

const Home = () => {
  return (
    <div>
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
    </div>
  );
};

export default Home;
