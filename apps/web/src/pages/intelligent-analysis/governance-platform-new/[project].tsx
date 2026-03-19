import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import GovernancePlatformNewProject from '@modules/intelligent-analysis/GovernancePlatformNew/Project';
import { isValidProject } from '@modules/intelligent-analysis/config/projects';
import Header from '@common/components/Header';
import StickyNav from '@common/components/Header/StickyNav';
import { Main } from '@common/components/Layout';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const project = params?.project as string;

  if (!isValidProject(project)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...(await getLocalesFile(req.cookies, ['home', 'intelligent_analysis'])),
      projectType: project,
    },
  };
};

interface GovernancePlatformNewProjectPageProps {
  projectType: string;
}

const GovernancePlatformNewProjectPage: React.FC<
  GovernancePlatformNewProjectPageProps
> = ({ projectType }) => {
  return (
    <>
      <StickyNav className=">md:-top-[80px] md:-top-[48px]">
        <Header />
      </StickyNav>
      <Main>
        <div className="flex h-[calc(100vh-80px)] flex-1 overflow-auto bg-gray-50">
          <div className="w-full overflow-y-auto">
            <GovernancePlatformNewProject projectType={projectType} />
          </div>
        </div>
      </Main>
    </>
  );
};

export default GovernancePlatformNewProjectPage;
