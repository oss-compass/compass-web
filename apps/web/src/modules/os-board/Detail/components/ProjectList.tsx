import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import classnames from 'classnames';
import Popper from '@mui/material/Popper';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { BsThreeDots } from 'react-icons/bs';
import ProviderIcon from '@modules/analyze/components/ProviderIcon';
import { getRepoOrigin, getRepoPath, getRepoUrlByName } from '@common/utils';

interface ProjectListProps {
  projects: readonly string[];
  competitorProjects: readonly string[];
  compareMode: boolean;
  origin?: string | null;
  compact?: boolean;
}

const ProjectItem: React.FC<{
  name: string;
  origin?: string | null;
  isCompetitor?: boolean;
}> = ({ name, origin, isCompetitor }) => {
  const { t } = useTranslation();
  const fallbackOrigin = origin?.toLowerCase() || 'gitcode';
  const host = getRepoOrigin(name, fallbackOrigin);
  const projectUrl = getRepoUrlByName(name, host);
  const displayName = getRepoPath(name) || name;

  return (
    <div className={classnames('flex items-center')}>
      <ProviderIcon provider={host} />
      <a
        className="ml-1 mr-1 whitespace-nowrap font-semibold hover:underline"
        href={projectUrl}
        target="_blank"
        rel="noreferrer"
      >
        {displayName}
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
  origin,
  compact = false,
}) => {
  const [moreOpen, setMoreOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMoreClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMoreOpen((prev) => !prev);
  };

  if (compact) {
    const visibleProjects = projects.slice(0, 3);
    const hiddenProjects = projects.slice(3);
    const hasHiddenItems =
      hiddenProjects.length > 0 ||
      (compareMode && competitorProjects.length > 0);

    return (
      <div className="flex items-center gap-3">
        {visibleProjects.map((project) => (
          <ProjectItem key={project} name={project} origin={origin} />
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
                      {hiddenProjects.map((project) => (
                        <ProjectItem
                          key={project}
                          name={project}
                          origin={origin}
                        />
                      ))}
                    </div>
                  )}
                  {compareMode && competitorProjects.length > 0 && (
                    <>
                      {hiddenProjects.length > 0 && (
                        <div className="my-2 h-[1px] bg-gray-200" />
                      )}
                      <div className="flex flex-col gap-2">
                        {competitorProjects.map((project) => (
                          <ProjectItem
                            key={project}
                            name={project}
                            origin={origin}
                            isCompetitor
                          />
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

  return (
    <div className="mb-6 flex flex-wrap items-center gap-4 rounded-lg bg-white p-4 drop-shadow-sm">
      <div className="flex flex-wrap gap-4">
        {projects.map((project) => (
          <ProjectItem key={project} name={project} origin={origin} />
        ))}
      </div>

      {compareMode && competitorProjects.length > 0 && (
        <>
          <div className="h-4 w-[1px] bg-gray-300" />
          <div className="flex flex-wrap gap-4">
            {competitorProjects.map((project) => (
              <ProjectItem
                key={project}
                name={project}
                origin={origin}
                isCompetitor
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectList;
