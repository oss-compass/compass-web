import React, { type ReactNode } from 'react';
import { Select } from 'antd';

export type ReportSelectOption = {
  label: ReactNode;
  value: string;
  disabled?: boolean;
};

type LabeledReportSelectProps = {
  label: string;
  value?: string;
  options: ReportSelectOption[];
  onChange?: (value: string) => void;
  minWidth?: number;
  placeholder?: string;
  valueClassName?: string;
  className?: string;
};

const SELECT_HEIGHT = 32;

const selectClassName =
  '[&_.ant-select-arrow]:text-slate-500 [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center [&_.ant-select-selection-item]:!text-sm [&_.ant-select-selection-item]:!font-semibold [&_.ant-select-selection-item]:!text-slate-900 [&_.ant-select-selector]:!rounded-l-none [&_.ant-select-selector]:!rounded-r-2xl [&_.ant-select-selector]:!border [&_.ant-select-selector]:!border-l-0 [&_.ant-select-selector]:!border-slate-200/80 [&_.ant-select-selector]:!bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(15,23,42,0.06)]';

/**
 * Compact labeled selector shared by developer-experience reports.
 * Its split pill mirrors the filters in the community-onboarding report.
 */
const LabeledReportSelect: React.FC<LabeledReportSelectProps> = ({
  label,
  value,
  options,
  onChange,
  minWidth = 120,
  placeholder = '请选择',
  valueClassName = '',
  className = '',
}) => (
  <label className={`flex items-center ${className}`}>
    <span
      style={{ height: SELECT_HEIGHT, lineHeight: `${SELECT_HEIGHT}px` }}
      className="inline-flex items-center whitespace-nowrap rounded-l-2xl border border-r-0 border-slate-200/80 bg-slate-50 px-2.5 text-xs font-medium text-slate-500 shadow-[0_2px_6px_rgba(15,23,42,0.06)]"
    >
      {label}
    </span>
    <Select
      aria-label={label}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      options={options}
      disabled={!options.length}
      style={{ height: SELECT_HEIGHT, minWidth }}
      popupMatchSelectWidth={false}
      className={`${selectClassName} ${valueClassName}`}
    />
  </label>
);

export default LabeledReportSelect;
