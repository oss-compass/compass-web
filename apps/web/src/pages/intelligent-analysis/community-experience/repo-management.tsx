import React from 'react';
import type { GetServerSideProps } from 'next';
import NoSsr from '@common/components/NoSsr';
import getLocalesFile from '@common/utils/getLocalesFile';
import RepoManagementPage from '@modules/intelligent-analysis/UserJourney/RepoManagementPage';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const CommunityExperienceRepoManagement: React.FC = () => {
  return (
    <NoSsr>
      <div className="flex h-screen flex-1 overflow-auto bg-[#eef2fa]">
        <div className="w-full overflow-y-auto">
          <RepoManagementPage />
        </div>
      </div>
    </NoSsr>
  );
};

export default CommunityExperienceRepoManagement;
