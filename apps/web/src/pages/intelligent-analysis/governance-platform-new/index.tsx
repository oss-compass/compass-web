import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import GovernancePlatformNewOverview from '@modules/intelligent-analysis/GovernancePlatformNew';
import Header from '@common/components/Header';
import StickyNav from '@common/components/Header/StickyNav';
import { Main } from '@common/components/Layout';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const GovernancePlatformNewPage: React.FC = () => {
  return (
    <>
      <StickyNav className=">md:-top-[80px] md:-top-[48px]">
        <Header />
      </StickyNav>
      <Main>
        <div className="flex h-[calc(100vh-80px)] flex-1 overflow-auto bg-gray-50">
          <div className="w-full overflow-y-auto">
            <GovernancePlatformNewOverview />
          </div>
        </div>
      </Main>
    </>
  );
};

export default GovernancePlatformNewPage;
