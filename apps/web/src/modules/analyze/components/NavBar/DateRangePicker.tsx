import React, { useState, useRef, useEffect } from 'react';
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import { useTranslation } from 'next-i18next';
import DatePicker from 'react-datepicker';
import { format, getUnixTime, fromUnixTime } from 'date-fns';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enGB, zhCN } from 'date-fns/locale';
import getLocale from '@common/utils/getLocale';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';

const DateRangePicker: React.FC<{
  onClick: (t: string) => void;
}> = ({ onClick }) => {
  const FORMAT_YMD = 'yyyy-MM-dd';
  const [local, setLocale] = useState('en');
  useEffect(() => {
    const l = getLocale();
    setLocale(l);
  }, []);
  const { t } = useTranslation();

  registerLocale('en', enGB);
  registerLocale('zh', zhCN);
  const { timeStart, timeEnd } = useQueryDateRange();

  const [startDate, setStartDate] = useState<Date | null>(
    timeStart || fromUnixTime(getUnixTime(new Date()) - 8 * 3600 * 24)
  );
  const [endDate, setEndDate] = useState<Date | null>(
    timeEnd || fromUnixTime(getUnixTime(new Date()) - 1 * 3600 * 24)
  );

  return (
    <div className="flex text-xs">
      <div className="flex items-center justify-between py-2">
        <DatePicker
          locale={local}
          dateFormat={FORMAT_YMD}
          renderCustomHeader={({
            monthDate,
            decreaseMonth,
            increaseMonth,
            decreaseYear,
            increaseYear,
          }) => (
            <div className="m-2 flex select-none">
              <div className="flex">
                <BsChevronDoubleLeft
                  className="hover:text-primary mr-2 hover:cursor-pointer"
                  onClick={decreaseYear}
                />
                <BsChevronLeft
                  className="hover:text-primary hover:cursor-pointer"
                  onClick={decreaseMonth}
                />
              </div>
              <div className="flex-auto ">
                {monthDate.toLocaleString(local, {
                  year: 'numeric',
                  month: 'long',
                })}
              </div>
              <div className="flex">
                <BsChevronRight
                  className="hover:text-primary mr-2 hover:cursor-pointer"
                  onClick={increaseMonth}
                />
                <BsChevronDoubleRight
                  className="hover:text-primary hover:cursor-pointer"
                  onClick={increaseYear}
                />
              </div>
            </div>
          )}
          showPopperArrow={false}
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          minDate={new Date('2000/01/01')}
          maxDate={fromUnixTime(getUnixTime(endDate!) - 7 * 3600 * 24)}
          className="flex h-6 w-[84px] border px-2"
        />
      </div>
      <div className="flex w-6 items-center justify-center"> ~ </div>
      <div className="flex items-center text-xs">
        <DatePicker
          locale={local}
          dateFormat={FORMAT_YMD}
          renderCustomHeader={({
            monthDate,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            decreaseYear,
            increaseYear,
          }) => (
            <div className="m-2 flex">
              <span className="flex">
                <BsChevronDoubleLeft
                  className="hover:text-primary mr-2 hover:cursor-pointer"
                  onClick={decreaseYear}
                />
                <BsChevronLeft
                  className="hover:text-primary hover:cursor-pointer"
                  onClick={decreaseMonth}
                />
              </span>
              <span className="flex-auto">
                {monthDate.toLocaleString(local, {
                  year: 'numeric',
                  month: 'long',
                })}
              </span>
              <span className="flex">
                <BsChevronRight
                  className="hover:text-primary mr-2 hover:cursor-pointer"
                  onClick={increaseMonth}
                />
                <BsChevronDoubleRight
                  className="hover:text-primary hover:cursor-pointer"
                  onClick={increaseYear}
                />
              </span>
            </div>
          )}
          showPopperArrow={false}
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={fromUnixTime(getUnixTime(startDate!) + 7 * 3600 * 24)}
          maxDate={fromUnixTime(getUnixTime(new Date()) - 1 * 3600 * 24)}
          className="h-6 w-[84px] border px-2"
        />
      </div>
      <div
        className="text-primary mt-2 ml-2 h-6 w-12 cursor-pointer rounded-sm border border-[#3A5BEF] pt-1 text-center"
        onClick={() =>
          onClick(
            format(startDate!, FORMAT_YMD) +
              ' ~ ' +
              format(endDate!, FORMAT_YMD)
          )
        }
      >
        {t('analyze:confirm')}
      </div>
    </div>
  );
};
export default DateRangePicker;
