import React from 'react';
import type { CiRepoData, CiRepoKey } from '../types';
import LabeledReportSelect from '../../components/LabeledReportSelect';

type CiControlsProps = {
  repo: CiRepoKey;
  onRepoChange: (repo: CiRepoKey) => void;
  data: CiRepoData;
  day: string;
  days: string[];
  onDayChange: (day: string) => void;
};

const CiControls: React.FC<CiControlsProps> = ({
  repo,
  onRepoChange,
  data,
  day,
  days,
  onDayChange,
}) => (
  <div className="flex flex-wrap items-center gap-2">
    <LabeledReportSelect
      label="组织"
      value="cann"
      options={[{ value: 'cann', label: 'cann' }]}
      minWidth={110}
    />
    <LabeledReportSelect
      label="仓库"
      value={repo}
      onChange={(value) => onRepoChange(value as CiRepoKey)}
      options={[
        { value: 'runtime', label: 'runtime' },
        { value: 'opsnn', label: 'ops-nn' },
      ]}
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
