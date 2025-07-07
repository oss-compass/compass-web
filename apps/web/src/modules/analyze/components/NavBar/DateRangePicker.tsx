import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { DatePicker, ConfigProvider } from 'antd';
import { getUnixTime, fromUnixTime } from 'date-fns';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Locale } from 'antd/es/locale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import getLocale from '@common/utils/getLocale';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';

const { RangePicker } = DatePicker;

const DateRangePicker: React.FC<{
  onClick: (t: string) => void;
}> = ({ onClick }) => {
  const FORMAT_YMD = 'YYYY-MM-DD';
  const [locale, setLocale] = useState<Locale>(enUS);

  useEffect(() => {
    const l = getLocale();
    if (l === 'zh') {
      setLocale(zhCN);
      dayjs.locale('zh-cn');
    } else {
      setLocale(enUS);
      dayjs.locale('en');
    }
  }, []);

  const { t } = useTranslation();
  const { timeStart, timeEnd } = useQueryDateRange();

  // 使用 date-fns 计算默认日期，然后转换为 dayjs
  const defaultStartDate =
    timeStart || fromUnixTime(getUnixTime(new Date()) - 8 * 3600 * 24);
  const defaultEndDate =
    timeEnd || fromUnixTime(getUnixTime(new Date()) - 1 * 3600 * 24);

  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    dayjs(defaultStartDate),
    dayjs(defaultEndDate),
  ]);

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      // 检查日期间隔是否至少 7 天
      const daysDiff = dates[1].diff(dates[0], 'day');
      if (daysDiff >= 7) {
        setDateRange(dates);
      }
    } else if (dates) {
      setDateRange(dates);
    }
  };

  const handleConfirm = () => {
    if (dateRange[0] && dateRange[1]) {
      const startStr = dateRange[0].format(FORMAT_YMD);
      const endStr = dateRange[1].format(FORMAT_YMD);
      onClick(`${startStr} ~ ${endStr}`);
    }
  };

  // 禁用日期的逻辑
  const disabledDate = (current: Dayjs) => {
    if (!current) return false;

    // 基本限制：不能选择今天之后的日期，不能选择 2000 年之前的日期
    const today = dayjs().subtract(1, 'day');
    const minDate = dayjs('2000-01-01');

    return current.isAfter(today, 'day') || current.isBefore(minDate, 'day');
  };

  return (
    <ConfigProvider locale={locale}>
      <div className="flex items-center text-xs">
        <RangePicker
          format={FORMAT_YMD}
          value={dateRange}
          onChange={handleDateChange}
          disabledDate={disabledDate}
          size="small"
          style={{ fontSize: '12px' }}
          className="text-xs"
          separator="~"
          inputReadOnly
          // 添加 onCalendarChange 来处理7天间隔限制
          onCalendarChange={(dates) => {
            if (dates && dates[0] && dates[1]) {
              const daysDiff = dates[1].diff(dates[0], 'day');
              if (daysDiff < 7) {
                // 如果间隔小于7天，自动调整结束日期
                const adjustedEndDate = dates[0].add(7, 'day');
                setDateRange([dates[0], adjustedEndDate]);
              }
            }
          }}
        />
        <div
          className="text-primary ml-2 h-6 w-12 cursor-pointer rounded-sm border border-[#3A5BEF] pt-1 text-center text-xs leading-none"
          onClick={handleConfirm}
        >
          {t('analyze:confirm')}
        </div>
      </div>
    </ConfigProvider>
  );
};

export default DateRangePicker;
