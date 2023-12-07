import React from 'react';
import Header from '@common/components/Header';
import Banner from '@modules/academe/components/Banner';
import CooperationCase from './CooperationCase';
import CooperationProcess from './CooperationProcess';
import SubmitApplication from './SubmitApplication';

const Explore = () => {
  return (
    <>
      <Header />
      <div>
        <Banner />
        <div className="mx-auto w-[1200px] pb-20 pt-10 md:pt-4 xl:w-full">
          <CooperationCase />
          <CooperationProcess />
          <SubmitApplication />
        </div>
      </div>
    </>
  );
};

export default Explore;
