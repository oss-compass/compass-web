import React from 'react';
import { GetServerSideProps } from 'next';
import Header from '@common/components/Header';
import StickyNav from '@common/components/Header/StickyNav';
import { Main } from '@common/components/Layout';
import getLocalesFile from '@common/utils/getLocalesFile';
import NoSsr from '@common/components/NoSsr';
import AuthRequire from '@modules/auth/AuthRequire';
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
    <NoSsr>
      <AuthRequire
        allowedRoleLevels={[3, 7]}
        redirectToAuth={true}
        redirectOnPermissionDenied={true}
      >
        <StickyNav className=">md:-top-[80px] md:-top-[48px]">
          <Header />
        </StickyNav>
        <Main>
          <div className="flex h-[calc(100vh-80px)] flex-1 overflow-auto bg-[#eef2fa]">
            <div className="w-full overflow-y-auto">
              <UserJourney />
            </div>
          </div>
        </Main>
      </AuthRequire>
    </NoSsr>
  );
};

export default UserJourneyPage;
