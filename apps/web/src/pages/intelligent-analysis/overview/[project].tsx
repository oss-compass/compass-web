import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import getLocalesFile from '@common/utils/getLocalesFile';
import IntelligentAnalysisLayout from '@modules/intelligent-analysis/components/Layout';
import Main from '@modules/intelligent-analysis/DataView/Overview/Project';

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const project = params?.project as string;

  // 验证项目类型
  const validProjects = [
    'flutter-tpc',
    'flutter',
    'ionic',
    'react-native',
    'cef',
    'electron',
    'chromium',
    'kmp-oh',
    // 新增项目
    'ollama',
    'vllm',
    'pytorch',
    'llama-factory',
    'onnxruntime',
    'servers',
    'avalonia',
    'triton',
    'vllm-ascend',
    'jax',
    'xla',
    'aibrix',
    'a2a',
  ];
  if (!validProjects.includes(project)) {
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
