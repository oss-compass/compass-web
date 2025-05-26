import React from 'react';
import Header from '@common/components/Header';
import Banner from '@modules/os-situation/components/Banner';
import MerticPage from './MerticPage';
import Footer from '@common/components/Footer';

const Explore = () => {
  return (
    <>
      <Header />
      <div>
        <Banner />
        <div className="mx-auto w-[1200px] pb-20 pt-10 md:pt-4 xl:w-full">
          <MerticPage />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
