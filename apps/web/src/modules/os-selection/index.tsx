import React from 'react';
import Header from '@common/components/Header';
import Footer from '@common/components/Footer';
import Banner from './components/Banner';
import DataView from './DataView';
import AuthRequire from '@modules/auth/AuthRequire';

const OsSelection = () => {
  return (
    <AuthRequire>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <Banner />
        <DataView />
      </div>
      <Footer />
    </AuthRequire>
  );
};

export default OsSelection;
