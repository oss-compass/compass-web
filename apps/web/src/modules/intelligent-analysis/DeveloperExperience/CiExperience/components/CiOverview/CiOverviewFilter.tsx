import React from 'react';
import { Select } from 'antd';
import type { SelectProps } from 'antd';

// 与社区入门总览的标签和下拉选项样式保持一致。
const selectClassName =
  '[&_.ant-select-arrow]:text-[var(--overview-slate)] [&_.ant-select-selection-item]:!text-sm [&_.ant-select-selection-item]:!font-semibold [&_.ant-select-selection-item]:!text-[var(--overview-text)] [&_.ant-select-selector]:!rounded-r-2xl [&_.ant-select-selector]:!rounded-l-none [&_.ant-select-selector]:!border [&_.ant-select-selector]:!border-l-0 [&_.ant-select-selector]:!border-[rgba(var(--overview-slateBorder-rgb),0.8)] [&_.ant-select-selector]:!bg-[linear-gradient(180deg,var(--overview-white)_0%,var(--overview-slateSoft)_100%)] [&_.ant-select-selector]:!px-3 [&_.ant-select-selector]:!shadow-[0_2px_6px_rgba(var(--overview-text-rgb),0.06)] [&_.ant-select-selection-item]:!flex [&_.ant-select-selection-item]:!items-center';

const CiOverviewFilter = <ValueType extends string>({
  label,
  className = '',
  ...props
}: SelectProps<ValueType> & { label: string }) => (
  <div className="inline-flex min-w-0 items-center">
    <span className="inline-flex h-8 shrink-0 items-center whitespace-nowrap rounded-l-2xl border border-r-0 border-[rgba(var(--overview-slateBorder-rgb),0.8)] bg-[var(--overview-slateSoft)] px-2.5 text-xs font-medium text-[var(--overview-slate)] shadow-[0_2px_6px_rgba(var(--overview-text-rgb),0.06)]">
      {label}
    </span>
    <Select<ValueType>
      {...props}
      style={{ height: 32 }}
      className={`${selectClassName} ${className}`}
      popupMatchSelectWidth={false}
      popupClassName="overview-select-dropdown"
      getPopupContainer={(node) => node.parentElement ?? node}
    />
  </div>
);

export default CiOverviewFilter;
