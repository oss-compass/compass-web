import React from 'react';
import type { CiRepoData, CiRepoKey } from '../types';
import type { CiCatalogEntry } from '../api';
import LabeledReportSelect from '../../components/LabeledReportSelect';

type CiControlsProps = {
  repo: CiRepoKey;
  catalog: CiCatalogEntry[];
  onRepoChange: (repo: CiRepoKey) => void;
  data: CiRepoData;
  day: string;
  days: string[];
  onDayChange: (day: string) => void;
};

const CiControls: React.FC<CiControlsProps> = ({
  repo,
  catalog,
  onRepoChange,
  data,
  day,
  days,
  onDayChange,
}) => (
  <div className="flex flex-wrap items-center gap-2">
    <LabeledReportSelect
      label="组织"
      value={catalog.find((entry) => entry.repo === repo)?.org}
      options={Array.from(new Set(catalog.map((entry) => entry.org)))
        .filter(Boolean)
        .map((org) => ({ value: org, label: org }))}
      minWidth={110}
    />
    <LabeledReportSelect
      label="仓库"
      value={repo}
      onChange={(value) => onRepoChange(value as CiRepoKey)}
      options={catalog.map((entry) => ({
        value: entry.repo,
        label: entry.name,
      }))}
      minWidth={130}
    />
    <LabeledReportSelect
      label="Workflow"
      value={data.workflow}
      options={[{ value: data.workflow, label: data.workflow }]}
      minWidth={170}
      valueClassName="[&_.ant-select-selection-item]:!font-mono [&_.ant-select-selection-item]:!text-[13px]"
    />
    <LabeledReportSelect
      label="日期"
      value={day}
      onChange={onDayChange}
      options={days.map((d) => ({ value: d, label: d.slice(5) }))}
      minWidth={110}
    />
  </div>
);

export default CiControls;
