import React from 'react';
import type { GetServerSideProps } from 'next';
import NoSsr from '@common/components/NoSsr';
import getLocalesFile from '@common/utils/getLocalesFile';
import TaskManagementPage from '@modules/intelligent-analysis/DeveloperExperience/IssueContribution/TaskManagementPage';

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: {
    ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
  },
});

const IssueTaskManagementPage: React.FC = () => (
  <NoSsr>
    <div className="flex h-screen flex-1 bg-[#eef2fa]">
      <div className="w-full">
        <TaskManagementPage />
      </div>
    </div>
  </NoSsr>
);

export default IssueTaskManagementPage;
