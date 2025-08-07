import React, { useState } from 'react';
import { BiCalendar, BiCaretDown, BiCheck } from 'react-icons/bi';
import { Button, Dropdown, Space } from 'antd';
import type { MenuProps } from 'antd';

export type DateRangeType = '7d' | '30d' | '90d' | '1y';

interface MonitorDatePickerProps {
  value: DateRangeType;
  onChange: (range: DateRangeType) => void;
}

const dateRangeOptions = [
  { key: '7d', label: '最近7天' },
  { key: '30d', label: '最近30天' },
  { key: '90d', label: '最近90天' },
  { key: '1y', label: '最近1年' },
];

const MonitorDatePicker: React.FC<MonitorDatePickerProps> = ({
  value,
  onChange,
}) => {
  const currentLabel =
    dateRangeOptions.find((option) => option.key === value)?.label ||
    '最近30天';

  const menuItems: MenuProps['items'] = dateRangeOptions.map((option) => ({
    key: option.key,
    label: (
      <div className="flex w-full items-center justify-between">
        <span>{option.label}</span>
        {value === option.key && <BiCheck className="text-sm text-blue-500" />}
      </div>
    ),
    onClick: () => onChange(option.key as DateRangeType),
  }));

  return (
    <Dropdown
      menu={{ items: menuItems }}
      trigger={['click']}
      placement="bottomLeft"
    >
      <Button size="small" className="flex items-center">
        <BiCalendar className="mr-1" />
        <span>{currentLabel}</span>
        <BiCaretDown className="ml-1" />
      </Button>
    </Dropdown>
  );
};

export default MonitorDatePicker;
