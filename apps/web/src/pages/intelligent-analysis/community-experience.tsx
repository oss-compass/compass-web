import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import getLocalesFile from '@common/utils/getLocalesFile';

const UserJourney = dynamic(
  () => import('@modules/intelligent-analysis/UserJourney'),
  {
    loading: () => (
      <div className="flex min-h-screen items-center justify-center px-6 text-sm text-slate-500">
        报告加载中...
      </div>
    ),
  }
);

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
    },
  };
};

const CommunityExperiencePage: React.FC = () => {
  return (
    <div className="flex h-screen flex-1 bg-[#eef2fa]">
      <div className="h-screen w-full overflow-y-auto">
        <UserJourney hidePageHeaderDeveloperControls transparentPageHeader />
      </div>
    </div>
  );
};

export default CommunityExperiencePage;
