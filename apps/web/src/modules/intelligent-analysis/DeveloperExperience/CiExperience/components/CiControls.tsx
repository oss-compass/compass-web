import React from 'react';
import type { CiRepoData, CiRepoKey } from '../types';
import LabeledReportSelect from '../../components/LabeledReportSelect';

type CiControlsProps = {
  repo: CiRepoKey;
  onRepoChange: (repo: CiRepoKey) => void;
  data: CiRepoData;
};

const CiControls: React.FC<CiControlsProps> = ({
  repo,
  onRepoChange,
  data,
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
  </div>
);

export default CiControls;
