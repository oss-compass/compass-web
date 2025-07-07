import React, { useState, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { DatePicker, ConfigProvider, Button } from 'antd';
import { getUnixTime, fromUnixTime } from 'date-fns';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import getLocale from '@common/utils/getLocale';
import useQueryDateRange from '@modules/developer/hooks/useQueryDateRange';

const { RangePicker } = DatePicker;
type RangeValue = [Dayjs | null, Dayjs | null] | null;

const DateRangePicker: React.FC<{
  onClick: (t: string) => void;
}> = ({ onClick }) => {
  const FORMAT_YMD = 'YYYY-MM-DD';
  const [local, setLocale] = useState(enUS);

  useEffect(() => {
    const l = getLocale();
    setLocale(l === 'zh' ? zhCN : enUS);
  }, []);

  const { t } = useTranslation();
  const { timeStart, timeEnd } = useQueryDateRange();

  // 将 Date 转换为 dayjs 对象
  const [dateRange, setDateRange] = useState<RangeValue>(() => {
    const defaultStart =
      timeStart || fromUnixTime(getUnixTime(new Date()) - 8 * 3600 * 24);
    const defaultEnd =
      timeEnd || fromUnixTime(getUnixTime(new Date()) - 1 * 3600 * 24);
    return [dayjs(defaultStart), dayjs(defaultEnd)];
  });

  // 禁用日期的逻辑
  const disabledDate = (current: Dayjs) => {
    if (!current) return false;

    // 最小日期：2000-01-01
    const minDate = dayjs('2000-01-01');
    // 最大日期：当前日期的前一天
    const maxDate = dayjs().subtract(1, 'day');

    return current.isBefore(minDate) || current.isAfter(maxDate);
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
      <ConfigProvider locale={local}>
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
        {t('analyze:confirm')}
      </Button>
    </div>
  );
};

export default DateRangePicker;
