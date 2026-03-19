import React from 'react';
import { GetServerSideProps } from 'next';
import Header from '@common/components/Header';
import StickyNav from '@common/components/Header/StickyNav';
import { Main } from '@common/components/Layout';
import getLocalesFile from '@common/utils/getLocalesFile';
import UserJourney from '@modules/intelligent-analysis/UserJourney';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const UserJourneyPage: React.FC = () => {
  return (
    <>
      <StickyNav className=">md:-top-[80px] md:-top-[48px]">
        <Header />
      </StickyNav>
      <Main>
        <div className="flex h-[calc(100vh-80px)] flex-1 overflow-auto bg-gray-50">
          <div className="w-full overflow-y-auto">
            <UserJourney />
          </div>
        </div>
      </Main>
    </>
  );
};

export default UserJourneyPage;
