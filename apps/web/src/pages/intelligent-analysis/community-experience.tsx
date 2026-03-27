import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import UserJourney from '@modules/intelligent-analysis/UserJourney';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const CommunityExperiencePage: React.FC = () => {
  return (
    <div className="flex h-screen flex-1 overflow-auto bg-[#eef2fa]">
      <div className="w-full overflow-y-auto">
        <UserJourney hidePageHeaderDeveloperControls transparentPageHeader />
      </div>
    </div>
  );
};

export default CommunityExperiencePage;
