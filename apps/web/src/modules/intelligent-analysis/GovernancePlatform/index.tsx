import React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { IoIosArrowForward } from 'react-icons/io';
import { PROJECTS_CONFIG, ProjectConfig } from '../config/projects';

interface ProjectData {
  name: string;
  developers: number;
  organizations: number;
  slug: string;
}

// 从配置文件转换为组件需要的数据格式
const projectsData: ProjectData[] = PROJECTS_CONFIG.map((project) => ({
  name: project.name,
  developers: project.developers,
  organizations: project.organizations,
  slug: project.slug,
}));

const ProjectCard: React.FC<{ project: ProjectData }> = ({ project }) => {
  const { t } = useTranslation('intelligent_analysis');
  const router = useRouter();

  const normalStyle =
    'flex h-full bg-[#ffffff] cursor-pointer flex-col rounded border p-6 shadow hover:shadow-xl md:gap-4';
  const normalTitleStyle = 'text-lg font-semibold';
  const normalDescStyle = 'mt-3 h-[60px] text-sm leading-5 text-[#7b7c86]';
  const normalLinkStyle =
    'text-primary mt-6 flex items-center gap-2 font-semibold text-sm';

  return (
    <div
      className={normalStyle}
      onClick={() => {
        router.push(`/intelligent-analysis/overview/${project.slug}`);
      }}
    >
      <div className="mt-2 flex items-center">
        <span className={normalTitleStyle}>{project.name}</span>
      </div>

      <div className={normalDescStyle}>
        <div className="space-y-2 text-[#868690]">
          <div className="flex items-center">
            <span className="text-sm">
              {project.developers.toLocaleString()}
            </span>
            <span className="ml-1 text-xs">
              {t('overview_page.developers')}
            </span>
          </div>

          <div className="flex items-center">
            <span className="text-sm ">
              {project.organizations.toLocaleString()}
            </span>
            <span className="ml-1 text-xs">
              {t('overview_page.organizations')}
            </span>
          </div>
        </div>
      </div>

      <div className={normalLinkStyle}>
        {t('overview_page.view_details')}{' '}
        <IoIosArrowForward className="mt-[1px]" />
      </div>
    </div>
  );
};

const Overview: React.FC = () => {
  const { t } = useTranslation('intelligent_analysis');

  return (
    <div className=" mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">
          {/* {t('overview_page.title')} */}
          开发者运营治理平台
        </h1>
        {/* <p className="text-gray-600">{t('overview_page.description')}</p> */}
      </div>
      <div className="mb-8 text-2xl font-medium">全景图</div>
      <div className="flex flex-col gap-6 pb-16">
        <div className="grid grid-cols-4 gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {projectsData.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
