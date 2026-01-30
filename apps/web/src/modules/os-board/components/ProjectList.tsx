import React from 'react';
import { useTranslation } from 'next-i18next';
import { BiGitRepoForked } from 'react-icons/bi';
import classnames from 'classnames';
import ProviderIcon from '@modules/analyze/components/ProviderIcon';
import { getProvider } from '@common/utils';

interface ProjectListProps {
  projects: readonly string[];
  competitorProjects: readonly string[];
  compareMode: boolean;
}

const ProjectItem: React.FC<{ name: string; isCompetitor?: boolean }> = ({
  name,
  isCompetitor,
}) => {
  const { t } = useTranslation();
  let host = 'github';
  if (name.includes('gitee.com')) {
    host = 'gitee';
  } else if (name.includes('gitcode.com')) {
    host = 'gitcode';
  } else if (name.startsWith('http')) {
    host = getProvider(name);
  }

  const projectUrl = name.startsWith('http')
    ? name
    : `https://github.com/${name}`;

  return (
    <div className={classnames('flex items-center')}>
      <ProviderIcon provider={host} />
      <a
        className="ml-1 mr-1 whitespace-nowrap font-semibold hover:underline"
        href={projectUrl}
        target="_blank"
        rel={'noreferrer'}
      >
        {name.replace('github:', '')}
      </a>
      {isCompetitor && (
        <span className="ml-1 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-600">
          {t('os_board:detail.competitors')}
        </span>
      )}
    </div>
  );
};

const ProjectList: React.FC<ProjectListProps> = ({
  projects,
  competitorProjects,
  compareMode,
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <ProjectItem key={project} name={project} />
        ))}
      </div>

      {compareMode && competitorProjects.length > 0 && (
        <>
          <div className="h-4 w-[1px] bg-gray-300"></div>
          <div className="flex flex-wrap gap-4">
            {competitorProjects.map((project) => (
              <ProjectItem key={project} name={project} isCompetitor />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectList;
