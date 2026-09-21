import React from 'react';
import type { GetServerSideProps } from 'next';
import NoSsr from '@common/components/NoSsr';
import getLocalesFile from '@common/utils/getLocalesFile';
import TaskManagementPage from '@modules/intelligent-analysis/UserJourney/TaskManagementPage';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const CommunityExperienceTaskManagement: React.FC = () => {
  return (
    <NoSsr>
      <div className="flex h-screen flex-1 bg-[#eef2fa]">
        <div className="w-full">
          <TaskManagementPage />
        </div>
      </div>
    </NoSsr>
  );
};

export default CommunityExperienceTaskManagement;
