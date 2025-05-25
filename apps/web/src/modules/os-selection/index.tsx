import React from 'react';
import Header from '@common/components/Header';
import Footer from '@common/components/Footer';
import Banner from './components/Banner';
import MainContent from './components/MainContent';

const OsSelection = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Banner />
        <MainContent />
      </div>
      <Footer />
    </>
  );
};

export default OsSelection;
