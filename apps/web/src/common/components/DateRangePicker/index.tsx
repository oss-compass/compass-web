import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { DatePicker, ConfigProvider, Button } from 'antd';
import { BiCalendar, BiCaretDown, BiCheck } from 'react-icons/bi';
import classnames from 'classnames';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import Popper from '@mui/material/Popper';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import getLocale from '@common/utils/getLocale';
import 'dayjs/locale/zh-cn';

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

export type DateRangeType =
  | '7d'
  | '30d'
  | '90d'
  | '1y'
  | '1M'
  | '3M'
  | '6M'
  | '1Y'
  | '3Y'
  | '5Y'
  | 'Since 2000'
  | 'custom';

interface CommonDateRangePickerProps {
  value: DateRangeType;
  onChange: (
    range: DateRangeType,
    customDates?: { start: string; end: string }
  ) => void;
  className?: string;
  size?: 'small' | 'middle' | 'large';
  showCustom?: boolean; // 是否显示自定义选项
  presetOptions?: Array<{ key: DateRangeType; label: string }>; // 自定义预设选项
}

const defaultPresetOptions = [
  { key: '1M' as DateRangeType, label: '最近1个月' },
  { key: '3M' as DateRangeType, label: '最近3个月' },
  { key: '6M' as DateRangeType, label: '最近6个月' },
  { key: '1Y' as DateRangeType, label: '最近1年' },
  { key: '3Y' as DateRangeType, label: '最近3年' },
  { key: '5Y' as DateRangeType, label: '最近5年' },
  { key: 'Since 2000' as DateRangeType, label: '成立以来' },
];

const FORMAT_YMD = 'YYYY-MM-DD';

// 自定义日期范围选择器组件
const CustomDateRangePicker: React.FC<{
  onClick: (dateRange: string) => void;
  defaultStart?: Date;
  defaultEnd?: Date;
}> = ({ onClick, defaultStart, defaultEnd }) => {
  const { t } = useTranslation();
  const [locale, setLocale] = useState(enUS);

  useEffect(() => {
    const l = getLocale();
    setLocale(l === 'zh' ? zhCN : enUS);
  }, []);

  const [dateRange, setDateRange] = useState<RangeValue>(() => {
    const start = defaultStart
      ? dayjs(defaultStart)
      : dayjs().subtract(7, 'day');
    const end = defaultEnd ? dayjs(defaultEnd) : dayjs().subtract(1, 'day');
    return [start, end];
  });

  // 禁用日期的逻辑
  const disabledDate = (current: Dayjs) => {
    if (!current) return false;
    const today = dayjs();
    const minDate = dayjs('2000-01-01');
    return current.isAfter(today, 'day') || current.isBefore(minDate, 'day');
  };

  // 自定义范围选择逻辑
  const onCalendarChange = (dates: RangeValue) => {
    if (dates && dates[0] && dates[1]) {
      // 确保至少有 7 天的间隔
      const diffDays = dates[1].diff(dates[0], 'day');
      if (diffDays < 7) {
        return; // 不更新状态，保持原有日期
      }
    }
    setDateRange(dates);
  };

  const handleConfirm = () => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDateStr = dateRange[0].format(FORMAT_YMD);
      const endDateStr = dateRange[1].format(FORMAT_YMD);
      onClick(`${startDateStr} ~ ${endDateStr}`);
    }
  };

  return (
    <div className="flex items-center py-2 text-xs">
      <ConfigProvider locale={locale}>
        <RangePicker
          value={dateRange}
          onChange={setDateRange}
          onCalendarChange={onCalendarChange}
          format={FORMAT_YMD}
          disabledDate={disabledDate}
          size="small"
          className="h-6"
          style={{ fontSize: '12px' }}
          placeholder={['开始日期', '结束日期']}
        />
      </ConfigProvider>
      <Button
        type="primary"
        size="small"
        className="ml-2 h-6 text-xs"
        onClick={handleConfirm}
      >
        {t('analyze:confirm') || '确认'}
      </Button>
    </div>
  );
};

// 日期标签面板组件
const DateTagPanel: React.FC<{
  value: DateRangeType;
  onChange: (
    range: DateRangeType,
    customDates?: { start: string; end: string }
  ) => void;
  togglePickerPanel: (v: boolean) => void;
  showCustom: boolean;
  presetOptions: Array<{ key: DateRangeType; label: string }>;
}> = ({ value, onChange, togglePickerPanel, showCustom, presetOptions }) => {
  const { t } = useTranslation();
  const [showRangePicker, setShowRangePicker] = useState(value === 'custom');

  return (
    <div className="bg-base-100 right-0 w-[288px] rounded text-xs drop-shadow-md">
      <div className="flex flex-wrap justify-between px-4 pt-4">
        {presetOptions.map((option) => {
          return (
            <div
              className={classnames(
                {
                  'bg-primary text-white':
                    value === option.key && !showRangePicker,
                },
                'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs'
              )}
              key={option.key}
              onClick={() => {
                onChange(option.key);
                togglePickerPanel(false);
                setShowRangePicker(false);
              }}
            >
              {option.label}
              {value === option.key && !showRangePicker && (
                <div className="h-3.5 w-3.5 rounded-full bg-white">
                  <BiCheck className="text-primary text-sm" />
                </div>
              )}
            </div>
          );
        })}
        {showCustom && (
          <div
            className={classnames(
              'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs',
              {
                'bg-primary text-white': showRangePicker,
                'mb-4': !showRangePicker,
              }
            )}
            onClick={() => {
              setShowRangePicker(true);
            }}
          >
            {t('analyze:custom') || '自定义'}
            {showRangePicker && (
              <div className="h-3.5 w-3.5 rounded-full bg-white">
                <BiCheck className="text-primary text-sm" />
              </div>
            )}
          </div>
        )}
      </div>
      {showCustom && showRangePicker && (
        <div className="h-10 bg-[#F7F7F7] px-4">
          <CustomDateRangePicker
            onClick={(dateRange) => {
              const [start, end] = dateRange.split(' ~ ');
              onChange('custom', { start, end });
              togglePickerPanel(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

// 主组件
const CommonDateRangePicker: React.FC<CommonDateRangePickerProps> = ({
  value,
  onChange,
  className = '',
  size = 'middle',
  showCustom = true,
  presetOptions = defaultPresetOptions,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [pickerPanelOpen, setPickerPanelOpen] = useState(false);

  const currentLabel = (() => {
    if (value === 'custom') {
      return '自定义';
    }
    return (
      presetOptions.find((option) => option.key === value)?.label || '最近1个月'
    );
  })();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setPickerPanelOpen((prev) => !prev);
  };

  const togglePickerPanel = (open: boolean) => {
    setPickerPanelOpen(open);
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        if (!pickerPanelOpen) return;
        setPickerPanelOpen(false);
      }}
    >
      <div className={className}>
        <div
          className={classnames(
            'flex cursor-pointer items-center rounded border px-3 py-1 hover:bg-gray-50',
            {
              'h-6': size === 'small',
              'h-8': size === 'middle',
              'h-10': size === 'large',
            }
          )}
          onClick={handleClick}
        >
          <BiCalendar className="mr-2 text-base" />
          <span className="text-sm">{currentLabel}</span>
          <BiCaretDown className="ml-1 text-sm" />
        </div>
        <Popper
          open={pickerPanelOpen}
          style={{ zIndex: 1000 }}
          placement="bottom-end"
          anchorEl={anchorEl}
          modifiers={[
            {
              name: 'offset',
              options: {
                offset: [0, 5],
              },
            },
          ]}
        >
          <DateTagPanel
            value={value}
            onChange={onChange}
            togglePickerPanel={togglePickerPanel}
            showCustom={showCustom}
            presetOptions={presetOptions}
          />
        </Popper>
      </div>
    </ClickAwayListener>
  );
};

export default CommonDateRangePicker;
export { CustomDateRangePicker };
