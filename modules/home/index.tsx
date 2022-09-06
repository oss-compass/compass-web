import React from 'react';
import { Header } from '@components/BaseLayout';
import Logo from '@components/Logo';
import Link from 'next/link';
import Image from 'next/image';
import SectionBanner from './SectionBanner';
import SectionProjects from './SectionProjects';
import SectionExplain from './SectionExplain';
import FooterLinks from './FooterLinks';
import Copyright from './Copyright';
import styles from './index.module.scss';

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
        <FooterLinks />
        <Copyright />
      </footer>
    </div>
  );
};

export default Home;
