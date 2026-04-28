import React, { useEffect, useMemo, useState } from 'react';
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Popover, Segmented, Select } from 'antd';
import {
  useRegistryData,
  filterRegistryEntriesFromRegistry,
} from '../hooks/useRegistryData';

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
  projectOptions: CompareProjectOption[];
  currentProjectKey: string;
  versionOptions: CompareProjectOption[];
  currentVersion?: string;
  compareProjectOptions: CompareProjectOption[];
  onSelectProject: (value: string) => void;
  onSelectVersion: (value: string) => void;
  onAddProject: (value: string) => void;
  onRemoveProject: (value: string) => void;
  hideDeveloperControls?: boolean;
  transparent?: boolean;
};

// ---------- helpers ----------

function uniq<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}

function toOptions(values: string[]) {
  return [...values]
    .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
    .map((v) => ({ value: v, label: v }));
}

// ---------- ProjectPill ----------

const ProjectPill: React.FC<{
  project: HeaderProject;
  removable: boolean;
  onRemove: (value: string) => void;
}> = ({ project, removable, onRemove }) => {
  return (
    <div className="group relative">
      <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] px-3.5 py-2 shadow-[0_2px_6px_rgba(15,23,42,0.06)]">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-slate-900">
            {project.name}
          </span>
          {project.version ? (
            <span className="text-xs font-medium tracking-[0.08em] text-slate-400">
              {`版本 ${project.version}`}
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

// ---------- CascadingSelects ----------

const SELECT_H = 32;

const selectCls =
  '[&_.ant-select-arrow]:text-slate-500 [&_.ant-select-selection-item]:!text-sm [&_.ant-select-selection-item]:!font-semibold [&_.ant-select-selection-item]:!text-slate-900 [&_.ant-select-selector]:!rounded-r-2xl [&_.ant-select-selector]:!rounded-l-none [&_.ant-select-selector]:!border [&_.ant-select-selector]:!border-l-0 [&_.ant-select-selector]:!border-slate-200/80 [&_.ant-select-selector]:!bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)] [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center';

const LabelTag: React.FC<{ text: string }> = ({ text }) => (
  <span
    style={{ height: SELECT_H, lineHeight: `${SELECT_H}px` }}
    className="inline-flex items-center whitespace-nowrap rounded-l-2xl border border-r-0 border-slate-200/80 bg-slate-50 px-2.5 text-xs font-medium text-slate-500 shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
  >
    {text}
  </span>
);

/**
 * Shared five-level cascading selects.
 * - mode="view"  : shows current selection, auto-syncs to currentFileKey
 * - mode="add"   : starts empty, calls onSelectFileKey as soon as version is chosen
 * excludeFileKeys: file keys that should be hidden from version options
 */
const CascadingSelects: React.FC<{
  mode: 'view' | 'add';
  currentFileKey?: string;
  excludeFileKeys?: string[];
  onSelectFileKey: (fileKey: string) => void;
}> = ({ mode, currentFileKey = '', excludeFileKeys = [], onSelectFileKey }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const registry = useRegistryData();
  const currentEntry = registry.entries[currentFileKey] ?? null;

  const initOrg = mode === 'view' ? currentEntry?.org ?? '' : '';
  const initSig = mode === 'view' ? currentEntry?.sig ?? '' : '';
  const initProjectKey = mode === 'view' ? currentEntry?.projectKey ?? '' : '';
  const initHardware =
    mode === 'view' ? currentEntry?.hardware_access ?? '' : '';

  const [org, setOrg] = useState<string>(initOrg);
  const [sig, setSig] = useState<string>(initSig);
  const [projectKey, setProjectKey] = useState<string>(initProjectKey);
  const [hardware, setHardware] = useState<string>(initHardware);

  // Sync state when external currentFileKey changes (view mode only)
  useEffect(() => {
    if (mode === 'view' && currentEntry) {
      setOrg(currentEntry.org);
      setSig(currentEntry.sig);
      setProjectKey(currentEntry.projectKey);
      setHardware(currentEntry.hardware_access);
    }
  }, [currentFileKey]); // eslint-disable-line react-hooks/exhaustive-deps

  // --- Derive options at each level ---

  const orgOptions = useMemo(() => {
    const orgs = uniq(
      filterRegistryEntriesFromRegistry(registry, {}).map(([, e]) => e.org)
    );
    return toOptions(orgs);
  }, [registry]);

  const sigOptions = useMemo(() => {
    const sigs = uniq(
      filterRegistryEntriesFromRegistry(registry, {
        org: org || undefined,
      }).map(([, e]) => e.sig)
    );
    return toOptions(sigs);
  }, [registry, org]);

  const projectOptions = useMemo(() => {
    const filtered = filterRegistryEntriesFromRegistry(registry, {
      org: org || undefined,
      sig: sig || undefined,
    });
    const seen = new Set<string>();
    const opts: { value: string; label: string }[] = [];
    for (const [, e] of filtered) {
      if (!seen.has(e.projectKey)) {
        seen.add(e.projectKey);
        opts.push({ value: e.projectKey, label: e.projectName });
      }
    }
    return opts.sort((a, b) =>
      a.label.localeCompare(b.label, 'en', { sensitivity: 'base' })
    );
  }, [registry, org, sig]);

  const hardwareOptions = useMemo(() => {
    const hws = uniq(
      filterRegistryEntriesFromRegistry(registry, {
        org: org || undefined,
        sig: sig || undefined,
        projectKey: projectKey || undefined,
      })
        .map(([, e]) => e.hardware_access)
        .filter(Boolean)
    );
    return toOptions(hws);
  }, [registry, org, sig, projectKey]);

  const versionOptions = useMemo(() => {
    return filterRegistryEntriesFromRegistry(registry, {
      org: org || undefined,
      sig: sig || undefined,
      projectKey: projectKey || undefined,
      hardware_access: hardware || undefined,
    })
      .filter(([fileKey]) => !excludeFileKeys.includes(fileKey))
      .map(([fileKey, e]) => ({
        value: fileKey,
        label: e.version.includes('@') ? e.version : `${e.version}@master`,
      }))
      .sort((a, b) => {
        // version 格式如 "20260413_1218@master"，取 @ 前部分按降序排列（最新在上）
        const dateA = a.label.split('@')[0] ?? '';
        const dateB = b.label.split('@')[0] ?? '';
        return dateB.localeCompare(dateA);
      });
  }, [registry, org, sig, projectKey, hardware, excludeFileKeys]);

  const currentFileKeyDerived = useMemo(() => {
    if (versionOptions.length === 0) return '';
    const found = versionOptions.find((o) => o.value === currentFileKey);
    return found ? found.value : versionOptions[0].value;
  }, [versionOptions, currentFileKey]);

  function handleOrgChange(value: string) {
    setOrg(value);
    setSig('');
    setProjectKey('');
    setHardware('');
  }
  function handleSigChange(value: string) {
    setSig(value);
    setProjectKey('');
    setHardware('');
  }
  function handleProjectChange(value: string) {
    setProjectKey(value);
    setHardware('');
  }
  function handleHardwareChange(value: string) {
    setHardware(value);
  }
  function handleVersionChange(fileKey: string) {
    onSelectFileKey(fileKey);
  }

  // view mode: propagate auto-derived key upward
  useEffect(() => {
    if (
      mode === 'view' &&
      currentFileKeyDerived &&
      currentFileKeyDerived !== currentFileKey &&
      versionOptions.length > 0
    ) {
      onSelectFileKey(currentFileKeyDerived);
    }
  }, [currentFileKeyDerived]); // eslint-disable-line react-hooks/exhaustive-deps

  const getContainer = () => containerRef.current ?? document.body;

  return (
    <div
      ref={containerRef}
      className="flex items-center gap-2"
      style={{ position: 'relative' }}
    >
      <div className="flex items-center">
        <LabelTag text="组织" />
        <Select
          value={org || undefined}
          placeholder="全部"
          onChange={handleOrgChange}
          options={orgOptions}
          style={{ height: SELECT_H }}
          className={`${selectCls} min-w-[90px]`}
          dropdownStyle={{ minWidth: 120 }}
          getPopupContainer={getContainer}
        />
      </div>
      <div className="flex items-center">
        <LabelTag text="SIG" />
        <Select
          value={sig || undefined}
          placeholder="全部"
          onChange={handleSigChange}
          options={sigOptions}
          style={{ height: SELECT_H }}
          className={`${selectCls} min-w-[130px]`}
          dropdownStyle={{ minWidth: 160 }}
          getPopupContainer={getContainer}
        />
      </div>
      <div className="flex items-center">
        <LabelTag text="项目" />
        <Select
          value={projectKey || undefined}
          placeholder="全部"
          onChange={handleProjectChange}
          options={projectOptions}
          style={{ height: SELECT_H }}
          className={`${selectCls} min-w-[150px]`}
          dropdownStyle={{ minWidth: 180 }}
          getPopupContainer={getContainer}
        />
      </div>
      <div className="flex items-center">
        <LabelTag text="硬件环境" />
        <Select
          value={hardware || undefined}
          placeholder="全部"
          onChange={handleHardwareChange}
          options={hardwareOptions}
          style={{ height: SELECT_H }}
          className={`${selectCls} min-w-[140px]`}
          dropdownStyle={{ minWidth: 200 }}
          getPopupContainer={getContainer}
        />
      </div>
      <div className="flex items-center">
        <LabelTag text="版本" />
        <Select
          value={
            mode === 'view' ? currentFileKeyDerived || undefined : undefined
          }
          placeholder={mode === 'add' ? '选择版本' : '全部'}
          onChange={handleVersionChange}
          options={versionOptions}
          style={{ height: SELECT_H }}
          className={`${selectCls} min-w-[130px] [&_.ant-select-selection-item]:!text-xs [&_.ant-select-selection-item]:!tracking-[0.08em] [&_.ant-select-selection-item]:!text-slate-500`}
          dropdownStyle={{ minWidth: 160 }}
          getPopupContainer={getContainer}
        />
      </div>
    </div>
  );
};

// ---------- CascadingProjectSelector (view mode wrapper) ----------

const CascadingProjectSelector: React.FC<{
  currentFileKey: string;
  onSelectFileKey: (fileKey: string) => void;
}> = ({ currentFileKey, onSelectFileKey }) => (
  <CascadingSelects
    mode="view"
    currentFileKey={currentFileKey}
    onSelectFileKey={onSelectFileKey}
  />
);

// ---------- PageHeader ----------

const PageHeader: React.FC<PageHeaderProps> = ({
  developerType,
  developerTypeOptions,
  journeyMode,
  journeyModeOptions,
  onDeveloperTypeChange,
  onJourneyModeChange,
  projects,
  currentProjectKey,
  currentVersion,
  compareProjectOptions,
  onSelectProject,
  onSelectVersion,
  onAddProject,
  onRemoveProject,
  hideDeveloperControls = false,
  transparent = false,
}) => {
  const [showAddSelector, setShowAddSelector] = useState(false);
  const registry = useRegistryData();
  const compareMode = projects.length > 1;

  // The file keys already in the compare list (to exclude from add options)
  const existingFileKeys = useMemo(
    () => projects.map((p) => p.queryKey),
    [projects]
  );

  useEffect(() => {
    if (!compareProjectOptions.length) {
      setShowAddSelector(false);
    }
  }, [compareProjectOptions.length]);

  const currentFileKey = currentVersion ?? currentProjectKey;

  function handleFileKeySelect(fileKey: string) {
    onSelectVersion(fileKey);
    const entry = registry.entries[fileKey];
    if (entry && entry.projectKey !== currentProjectKey) {
      onSelectProject(entry.projectKey);
    }
  }

  function handleAddFileKey(fileKey: string) {
    onAddProject(fileKey);
    setShowAddSelector(false);
  }

  const addPopoverContent = (
    <div className="py-1">
      <p className="mb-3 text-xs font-medium text-slate-500">选择对比项目</p>
      <CascadingSelects
        mode="add"
        excludeFileKeys={existingFileKeys}
        onSelectFileKey={handleAddFileKey}
      />
    </div>
  );

  return (
    <nav
      className={`flex h-14 items-center justify-between px-6 md:h-12 md:px-4 ${
        transparent ? 'pt-5' : 'border-b border-t bg-white/90'
      }`}
    >
      {!hideDeveloperControls && (
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
      )}

      <div className="flex flex-shrink-0 items-center gap-3 md:flex">
        {compareMode ? (
          projects.map((project, index) => (
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
          ))
        ) : (
          <CascadingProjectSelector
            currentFileKey={currentFileKey}
            onSelectFileKey={handleFileKeySelect}
          />
        )}

        {!compareMode && compareProjectOptions.length ? (
          <Popover
            open={showAddSelector}
            onOpenChange={(open) => setShowAddSelector(open)}
            content={addPopoverContent}
            trigger="click"
            placement="bottomRight"
            arrow={false}
            overlayInnerStyle={{ padding: '12px 16px' }}
          >
            <button
              type="button"
              className="inline-flex h-8 w-8 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-slate-500 transition hover:border-slate-400 hover:text-slate-700"
              aria-label="添加对比项目"
            >
              <PlusOutlined />
            </button>
          </Popover>
        ) : null}
      </div>
    </nav>
  );
};

export default PageHeader;
