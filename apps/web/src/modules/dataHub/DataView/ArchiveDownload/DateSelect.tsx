import React, { useState } from 'react';
import { DatePicker, Select, ConfigProvider } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

const { Option } = Select;

const DateSelect: React.FC<{ onChange: (value: string) => void }> = ({
  onChange,
}) => {
  const { t, i18n } = useTranslation();
  const [type, setType] = useState<'quarter' | 'year'>('quarter');
  const [date, setDate] = useState(dayjs('2025-01-01'));

  const handleDateChange = (selectedDate, type) => {
    setDate(selectedDate);
    if (!selectedDate) return onChange('');

    const year = selectedDate.year();
    if (type === 'quarter') {
      const quarter = Math.ceil((selectedDate.month() + 1) / 3);
      const endMonth = quarter * 3;
      onChange(`${year}${String(endMonth).padStart(2, '0')}`);
      // console.log(`${year}${String(endMonth).padStart(2, '0')}`);
    } else {
      onChange(String(year));
      // console.log(String(year) + ',');
    }
  };

  return (
    <div className="flex gap-4">
      <span className="text-lg font-semibold">{t('open_api:date_select')}</span>
      <Select
        value={type}
        style={{ width: 100 }}
        onChange={(e) => {
          setType(e);
          if (date) handleDateChange(date, e);
        }}
      >
        <Option value="quarter">{t('open_api:quarter')}</Option>
        <Option value="year">{t('open_api:year')}</Option>
      </Select>
      <ConfigProvider locale={i18n.language === 'zh' ? zhCN : enUS}>
        <DatePicker
          picker={type}
          value={date}
          onChange={(e) => {
            handleDateChange(e, type);
          }}
          disabledDate={(current) =>
            current &&
            (current < dayjs('2022-01-01') || current > dayjs('2025-03-31'))
          }
        />
      </ConfigProvider>
    </div>
  );
};

export default DateSelect;
