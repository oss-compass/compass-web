import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { DatePicker, ConfigProvider } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Locale } from 'antd/es/locale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import getLocale from '@common/utils/getLocale';

const { RangePicker } = DatePicker;

interface DashboardDateRangePickerProps {
  start?: string;
  end?: string;
  onChange: (start: string, end: string) => void;
}

const DashboardDateRangePicker: React.FC<DashboardDateRangePickerProps> = ({
  start,
  end,
  onChange,
}) => {
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

  const [dateRange, setDateRange] = useState<[Dayjs | null, Dayjs | null]>([
    start ? dayjs(start) : null,
    end ? dayjs(end) : null,
  ]);

  useEffect(() => {
    setDateRange([start ? dayjs(start) : null, end ? dayjs(end) : null]);
  }, [start, end]);

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (dates && dates[0] && dates[1]) {
      setDateRange(dates);
    } else if (dates) {
      setDateRange(dates);
    } else {
      setDateRange([null, null]);
    }
  };

  const handleConfirm = () => {
    if (dateRange[0] && dateRange[1]) {
      const startStr = dateRange[0].format(FORMAT_YMD);
      const endStr = dateRange[1].format(FORMAT_YMD);
      onChange(startStr, endStr);
    }
  };

  const disabledDate = (current: Dayjs) => {
    if (!current) return false;
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

export default DashboardDateRangePicker;
