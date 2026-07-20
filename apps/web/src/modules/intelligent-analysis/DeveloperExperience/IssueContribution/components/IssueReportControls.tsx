import React from 'react';
import LabeledReportSelect, {
  type ReportSelectOption,
} from '../../components/LabeledReportSelect';

type IssueReportControlsProps = {
  community: string;
  period: string;
  version: string;
  communityOptions: ReportSelectOption[];
  periodOptions: ReportSelectOption[];
  versionOptions: ReportSelectOption[];
  onCommunityChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onVersionChange: (value: string) => void;
};

const IssueReportControls: React.FC<IssueReportControlsProps> = ({
  community,
  period,
  version,
  communityOptions,
  periodOptions,
  versionOptions,
  onCommunityChange,
  onPeriodChange,
  onVersionChange,
}) => (
  <div className=">xl:w-auto >xl:justify-end flex w-full flex-wrap items-center justify-start gap-2">
    <LabeledReportSelect
      label="社区"
      value={community}
      options={communityOptions}
      onChange={onCommunityChange}
      minWidth={180}
      className=">md:w-auto w-full [&_.ant-select]:flex-1"
    />
    <LabeledReportSelect
      label="时间"
      value={period}
      options={periodOptions}
      onChange={onPeriodChange}
      minWidth={205}
      className=">md:w-auto w-full [&_.ant-select]:flex-1"
    />
    <LabeledReportSelect
      label="报告版本"
      value={version}
      options={versionOptions}
      onChange={onVersionChange}
      minWidth={92}
      valueClassName="[&_.ant-select-selection-item]:!font-mono [&_.ant-select-selection-item]:!text-xs [&_.ant-select-selection-item]:!tracking-[0.08em]"
      className=">md:w-auto w-full [&_.ant-select]:flex-1"
    />
  </div>
);

export default IssueReportControls;
