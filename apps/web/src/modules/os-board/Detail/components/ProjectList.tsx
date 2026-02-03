import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { BsThreeDots } from 'react-icons/bs';
import ProviderIcon from '@modules/analyze/components/ProviderIcon';
import { getProvider } from '@common/utils';

interface ProjectListProps {
  projects: readonly string[];
  competitorProjects: readonly string[];
  compareMode: boolean;
  /** compact 模式用于 nav，只显示前 3 个，超出的用下拉展示 */
  compact?: boolean;
}

const ProjectItem: React.FC<{ name: string; isCompetitor?: boolean }> = ({
  name,
  isCompetitor,
}) => {
  const { t } = useTranslation();
  let host = 'gitcode';
  if (name.includes('gitee.com')) {
    host = 'gitee';
  } else if (name.includes('github.com')) {
    host = 'github';
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
  compact = false,
}) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMoreOpen((prev) => !prev);
  };

  // compact 模式：只显示前 3 个，超出的用下拉
  if (compact) {
    const visibleProjects = projects.slice(0, 3);
    const hiddenProjects = projects.slice(3);
    const hasHiddenItems =
      hiddenProjects.length > 0 ||
      (compareMode && competitorProjects.length > 0);

    return (
      <div className="flex items-center gap-3">
        {visibleProjects.map((project) => (
          <ProjectItem key={project} name={project} />
        ))}
        {hasHiddenItems && (
          <ClickAwayListener
            onClickAway={() => {
              if (moreOpen) setMoreOpen(false);
            }}
          >
            <div className="relative">
              <div
                className="flex h-6 w-6 cursor-pointer items-center justify-center rounded border bg-gray-50 hover:bg-gray-100"
                onClick={handleMoreClick}
              >
                <BsThreeDots className="text-gray-500" />
              </div>
              <Popper
                open={moreOpen}
                anchorEl={anchorEl}
                placement="bottom-start"
                style={{ zIndex: 1000 }}
              >
                <div className="mt-1 max-h-[300px] min-w-[200px] overflow-auto rounded bg-white p-3 shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                  {hiddenProjects.length > 0 && (
                    <div className="flex flex-col gap-2">
                      {hiddenProjects.map((p) => (
                        <ProjectItem key={p} name={p} />
                      ))}
                    </div>
                  )}
                  {compareMode && competitorProjects.length > 0 && (
                    <>
                      {hiddenProjects.length > 0 && (
                        <div className="my-2 h-[1px] bg-gray-200" />
                      )}
                      <div className="flex flex-col gap-2">
                        {competitorProjects.map((p) => (
                          <ProjectItem key={p} name={p} isCompetitor />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Popper>
            </div>
          </ClickAwayListener>
        )}
      </div>
    );
  }

  // 默认模式：全部展示
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
