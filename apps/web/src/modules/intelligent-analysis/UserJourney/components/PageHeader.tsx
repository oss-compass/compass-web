import React, { useEffect, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Segmented, Select } from 'antd';

type HeaderProject = {
  queryKey: string;
  name: string;
  version?: string;
};

type CompareProjectOption = {
  value: string;
  label: string;
};

type PageHeaderProps = {
  developerType: string;
  developerTypeOptions: string[];
  journeyMode: string;
  journeyModeOptions: string[];
  onDeveloperTypeChange: (value: string) => void;
  onJourneyModeChange: (value: string) => void;
  projects: HeaderProject[];
  compareProjectOptions: CompareProjectOption[];
  onAddProject: (value: string) => void;
  onRemoveProject: (value: string) => void;
};

const ProjectPill: React.FC<{
  project: HeaderProject;
  removable: boolean;
  onRemove: (value: string) => void;
}> = ({ project, removable, onRemove }) => {
  return (
    <div className="group relative">
      <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3.5 py-2 shadow-[0_8px_18px_rgba(15,23,42,0.05)]">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-900">
            {project.name}
          </span>
          {project.version ? (
            <span className="text-xs font-medium uppercase tracking-[0.08em] text-slate-400">
              {project.version}
            </span>
          ) : null}
        </div>
      </div>
      {removable ? (
        <button
          type="button"
          onClick={() => onRemove(project.queryKey)}
          className="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-[11px] text-slate-500 opacity-0 shadow-[0_6px_16px_rgba(15,23,42,0.12)] transition hover:border-slate-300 hover:text-slate-700 group-hover:opacity-100"
          aria-label={`移除 ${project.name}`}
        >
          <CloseOutlined />
        </button>
      ) : null}
    </div>
  );
};

const PageHeader: React.FC<PageHeaderProps> = ({
  developerType,
  developerTypeOptions,
  journeyMode,
  journeyModeOptions,
  onDeveloperTypeChange,
  onJourneyModeChange,
  projects,
  compareProjectOptions,
  onAddProject,
  onRemoveProject,
}) => {
  const [showAddSelector, setShowAddSelector] = useState(false);
  const compareMode = projects.length > 1;

  useEffect(() => {
    if (!compareProjectOptions.length) {
      setShowAddSelector(false);
    }
  }, [compareProjectOptions.length]);

  return (
    <nav className="flex h-14 items-center justify-between border-b border-t bg-white/90 px-6 backdrop-blur md:h-12 md:px-4">
      <div className="relative flex h-10 flex-1 items-center gap-3 overflow-hidden pl-4 text-xl font-semibold">
        <Select
          value={developerType}
          onChange={onDeveloperTypeChange}
          bordered={false}
          options={developerTypeOptions.map((item) => ({
            label: item,
            value: item,
          }))}
          className="min-w-[185px] [&_.ant-select-arrow]:text-slate-700 [&_.ant-select-selection-item]:!text-xl [&_.ant-select-selection-item]:!font-bold [&_.ant-select-selection-item]:!leading-10 [&_.ant-select-selector]:!border-0 [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!shadow-none"
          dropdownStyle={{ minWidth: 200 }}
        />
        <div className="ml-4 mt-2">
          <Segmented
            value={journeyMode}
            onChange={(value) => onJourneyModeChange(String(value))}
            style={{ marginBottom: 8 }}
            options={journeyModeOptions}
          />
        </div>
      </div>

      <div className="ml-4 flex flex-shrink-0 items-center gap-3 md:flex">
        {projects.map((project, index) => (
          <React.Fragment key={project.queryKey}>
            {index > 0 ? (
              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">
                vs
              </span>
            ) : null}
            <ProjectPill
              project={project}
              removable={compareMode}
              onRemove={onRemoveProject}
            />
          </React.Fragment>
        ))}

        {!compareMode && compareProjectOptions.length ? (
          showAddSelector ? (
            <Select
              open
              autoFocus
              value={undefined}
              placeholder="选择对比项目"
              options={compareProjectOptions}
              className="w-[220px]"
              onSelect={(value) => {
                onAddProject(String(value));
                setShowAddSelector(false);
              }}
              onOpenChange={(open) => {
                if (!open) {
                  setShowAddSelector(false);
                }
              }}
            />
          ) : (
            <button
              type="button"
              onClick={() => setShowAddSelector(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
              aria-label="添加对比项目"
            >
              <PlusOutlined />
            </button>
          )
        ) : null}
      </div>
    </nav>
  );
};

export default PageHeader;
