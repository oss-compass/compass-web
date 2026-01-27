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
  // 'opensearch-project/OpenSearch' -> 'https://github.com/opensearch-project/OpenSearch'
  // Currently compass default to GitHub if only name provided, but for accurate icon we need to know the source.
  // Assuming the project name format in dashboard config might be just 'owner/repo' or full URL.
  // If it is just 'owner/repo', getProvider might fail if it expects a full URL.
  // Let's check how 'name' is formatted. Based on typical usage, it's likely 'owner/repo'.
  // However, getProvider implementation:
  // export function getProvider(url: string) {
  //   if (!url) return '';
  //   const result = url.match(/^https:\/\/(.+?)\..+$/i);
  //   if (result && result.length >= 2) {
  //     return result[1];
  //   }
  //   return url;
  // }
  // If name is 'owner/repo', getProvider returns 'owner/repo'.
  // ProviderIcon expects 'github', 'gitee', etc.

  // We need a helper to determine provider from project string or default to github if ambiguous/internal logic implies so.
  // In many parts of the app, 'owner/repo' implies GitHub.

  let host = 'github'; // Default to github for simple 'owner/repo'
  if (name.includes('gitee.com')) {
    host = 'gitee';
  } else if (name.includes('gitcode.com')) {
    host = 'gitcode';
  } else if (name.startsWith('http')) {
    host = getProvider(name);
  }

  const { t } = useTranslation();
  const projectUrl = name.startsWith('http')
    ? name
    : `https://github.com/${name}`;

  return (
    <div className={classnames('flex items-center')}>
      <ProviderIcon provider={host} />
      <a
        className={classnames(
          'ml-1 mr-1 whitespace-nowrap font-semibold hover:underline',
          isCompetitor ? 'text-orange-700' : 'text-blue-700'
        )}
        href={projectUrl}
        target="_blank"
        rel={'noreferrer'}
      >
        {name.replace('github:', '')}
      </a>
      {isCompetitor && (
        <span className="ml-1 rounded bg-orange-100 px-1.5 py-0.5 text-[10px] text-orange-600">
          竞品
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
