import React from 'react';
import { GetServerSideProps } from 'next';
import getLocalesFile from '@common/utils/getLocalesFile';
import Main from '@modules/intelligent-analysis/GovernancePlatform/Overview/Project';
import { isValidProject } from '@modules/intelligent-analysis/config/projects';
import Header from '@common/components/Header';
import StickyNav from '@common/components/Header/StickyNav';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const project = params?.project as string;

  // 验证项目类型
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

interface ProjectPageProps {
  projectType: string;
}

const ProjectPage: React.FC<ProjectPageProps> = ({ projectType }) => {
  return (
    <>
      <StickyNav className=">md:-top-[80px] md:-top-[48px]">
        <Header />
      </StickyNav>
      <Main projectType={projectType} />
    </>
  );
};

export default ProjectPage;
