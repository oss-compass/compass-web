import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { DatePicker, ConfigProvider } from 'antd';
import classnames from 'classnames';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import type { Dayjs } from 'dayjs';
import type { DatePickerProps } from 'antd';

type RangeValue = [Dayjs | null, Dayjs | null] | null;
const FORMAT_YMD = 'YYYY-MM-DD';

const DateRangePicker = ({
  value,
  onChange,
  inputClass,
  disabledDate,
}: {
  value?: RangeValue;
  onChange?: (value: RangeValue) => void;
  disabledDate?: (value: Dayjs) => boolean;
  inputClass?: string;
}) => {
  const { t, i18n } = useTranslation();
  const inputRef = useRef(null);
  const { RangePicker } = DatePicker;
  const [local, setLocale] = useState(zhCN);
  useEffect(() => {
    setLocale(i18n.language === 'zh' ? zhCN : enUS);
  }, [i18n]);

  const [dates, setDates] = useState<RangeValue>(null);
  const [datesValue, setDatesValue] = useState<RangeValue>(value || null);

  const onOpenChange = (open: boolean) => {
    if (!open) {
      setDates(null);
    }
  };
  const setToNow = () => {
    setDates([dates[0], dayjs('2099/01/01', FORMAT_YMD)]);
    setDatesValue([dates[0], dayjs('2099/01/01', FORMAT_YMD)]);
    onChange([dates[0], dayjs('2099/01/01', FORMAT_YMD)]);
    inputRef.current!.blur();
  };
  const customFormat: DatePickerProps['format'] = (value) => {
    const date = value.format(FORMAT_YMD);
    if (date.startsWith('2099')) {
      return t('common:up_to_now');
    }
    return date;
  };

  return (
    <ConfigProvider locale={local}>
      <RangePicker
        ref={inputRef}
        className={classnames(inputClass ? inputClass : 'ant-org-input')}
        value={dates || value}
        onOpenChange={onOpenChange}
        onCalendarChange={(val) => {
          setDates(val);
        }}
        disabledDate={disabledDate}
        onChange={(val) => {
          setDatesValue(val);
          onChange(val);
        }}
        format={customFormat}
        renderExtraFooter={() => (
          <div
            className={classnames(
              'cursor-pointer pr-4 text-right text-[#1677ff]',
              { hidden: !dates?.[0] }
            )}
          >
            <span className="text-[#1677ff]" onClick={setToNow}>
              {t('common:up_to_now')}
            </span>
          </div>
        )}
      />
    </ConfigProvider>
  );
};
export default DateRangePicker;
