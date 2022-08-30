import React from 'react';
import { Header } from '@components/BaseLayout';
import Link from 'next/link';
import Image from 'next/image';
import SectionBanner from './SectionBanner';
import SectionProjects from './SectionProjects';
import SectionExplain from './SectionExplain';

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
        <div className="h-[360px] w-full"></div>
        <div className="h-[78px] w-full bg-gray-100"></div>
      </footer>
    </div>
  );
};

export default Home;
