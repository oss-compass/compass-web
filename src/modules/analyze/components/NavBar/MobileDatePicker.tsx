import React, { useState, useRef, useEffect } from 'react';
import { BiCalendar, BiCaretDown } from 'react-icons/bi';
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import { rangeTags } from '@modules/analyze/constant';
import classnames from 'classnames';
import { useClickAway, useToggle } from 'react-use';
import useI18RangeTag from './useI18RangeTag';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import useSwitchRange from '@modules/analyze/components/NavBar/useSwitchRange';
import DatePicker from 'react-datepicker';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enGB, zhCN } from 'date-fns/locale';
import { format, getUnixTime, fromUnixTime } from 'date-fns';
import getLocale from '@common/utils/getLocale';
import { useTranslation } from 'next-i18next';

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
    <div className="pl-3.5 pt-3 text-xs">
      <span className="font-bold text-gray-900">{t('analyze:pick_date')}</span>
      <div className="flex items-center justify-between py-2">
        {t('analyze:from')}
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
            <div className="m-2 flex select-none">
              <div className="flex">
                <BsChevronDoubleLeft
                  className="mr-2 hover:cursor-pointer hover:text-primary"
                  onClick={decreaseYear}
                />
                <BsChevronLeft
                  className="hover:cursor-pointer hover:text-primary"
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
                  className="mr-2 hover:cursor-pointer hover:text-primary"
                  onClick={increaseMonth}
                />
                <BsChevronDoubleRight
                  className="hover:cursor-pointer hover:text-primary"
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
          className="float-right ml-1 mr-2 flex h-6 w-[100px]  border px-2"
        />
      </div>
      <div className="flex items-center text-xs">
        {t('analyze:to')}
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
                  className="mr-2 hover:cursor-pointer hover:text-primary"
                  onClick={decreaseYear}
                />
                <BsChevronLeft
                  className="hover:cursor-pointer hover:text-primary"
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
                  className="mr-2 hover:cursor-pointer hover:text-primary"
                  onClick={increaseMonth}
                />
                <BsChevronDoubleRight
                  className="hover:cursor-pointer hover:text-primary"
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
          className="float-right ml-1 mr-2 h-6 w-[100px] border px-2"
        />
      </div>
      <div
        className="mt-2 flex h-6 w-12 cursor-pointer items-center border border-[#3A5BEF] px-2.5 text-primary"
        onClick={() =>
          onClick(
            format(startDate!, FORMAT_YMD) +
              ' ~ ' +
              format(endDate!, FORMAT_YMD)
          )
        }
      >
        确定
      </div>
    </div>
  );
};

const MobileDatePicker = () => {
  const i18RangeTag = useI18RangeTag();
  const [dropdownOpen, toggleDropdown] = useToggle(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    toggleDropdown(false);
  });

  const { range } = useQueryDateRange();
  const { switchRange } = useSwitchRange();

  return (
    <div className="relative">
      <div
        className="flex h-10 cursor-pointer items-center"
        onClick={() => toggleDropdown()}
      >
        <BiCalendar className="mr-2.5 text-xl" />
        <span className="text-sm">{range}</span>
        <BiCaretDown className="ml-1 text-sm" />
      </div>
      <ul
        ref={ref}
        style={{ boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.1)' }}
        className={classnames(
          'absolute right-0 z-[200] w-[150px] rounded bg-base-100 py-2',
          { hidden: !dropdownOpen }
        )}
      >
        {rangeTags.map((t, index) => {
          return (
            <li
              className={classnames(
                { 'text-primary ': range === t },
                { 'border-b ': index !== rangeTags.length - 1 },
                'h-full cursor-pointer py-2 pl-3.5 text-xs'
              )}
              key={t}
              onClick={async () => {
                await switchRange(t);
                toggleDropdown(false);
              }}
            >
              {i18RangeTag[t]}
            </li>
          );
        })}
        <DateRangePicker
          onClick={async (t) => {
            await switchRange(t);
            toggleDropdown(false);
          }}
        />
      </ul>
    </div>
  );
};

export default MobileDatePicker;
