import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import Overview from '@modules/intelligent-analysis/GovernancePlatform/index';
import Header from '@common/components/Header';
import { Main } from '@common/components/Layout';
import StickyNav from '@common/components/Header/StickyNav';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const GovernancePlatformPage: React.FC = () => {
  return (
    <>
      <StickyNav className=">md:-top-[80px] md:-top-[48px]">
        <Header />
      </StickyNav>
      <Main>
        <div className="flex h-[calc(100vh-80px)] flex-1 overflow-auto">
          <div className="w-full overflow-y-auto">
            {' '}
            <Overview />
          </div>
        </div>
      </Main>
    </>
  );
};

export default GovernancePlatformPage;
