import React from 'react';
import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';
import getLocalesFile from '@common/utils/getLocalesFile';
import IntelligentAnalysisLayout from '@modules/intelligent-analysis/components/Layout';
import { isValidProject } from '@modules/intelligent-analysis/config/projects';

const Main = dynamic(
  () => import('@modules/intelligent-analysis/DataView/Overview/Project')
);

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
    <IntelligentAnalysisLayout>
      <Main projectType={projectType} />
    </IntelligentAnalysisLayout>
  );
};

export default ProjectPage;
