import React, { useState, useRef, useEffect } from 'react';
import { BiCalendar, BiCaretDown, BiCheck } from 'react-icons/bi';
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
          className="h-6 w-[84px] border px-2"
        />
      </div>
      <div
        className="mt-2 ml-2 h-6 w-12 cursor-pointer rounded-sm border border-[#3A5BEF] pt-1 text-center text-primary"
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

const NewDatePicker = () => {
  const { t } = useTranslation();
  const i18RangeTag = useI18RangeTag();
  const [dropdownOpen, toggleDropdown] = useToggle(false);
  const [custom, toggleCustom] = useToggle(false);
  const ref = useRef(null);

  useClickAway(ref, () => {
    toggleDropdown(false);
    toggleCustom(!rangeTags.includes(range));
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
        <span className="text-sm">{i18RangeTag[range] || range}</span>
        <BiCaretDown className="ml-1 text-sm" />
      </div>
      <ul
        ref={ref}
        style={{ boxShadow: '0px 1px 4px 1px rgba(0,0,0,0.1)' }}
        className={classnames(
          'absolute right-0 z-[200] w-[280px] rounded bg-base-100 text-xs',
          { hidden: !dropdownOpen }
        )}
      >
        <div className="flex flex-wrap justify-between px-4 pt-4">
          {rangeTags.map((t, index) => {
            return (
              <li
                className={classnames(
                  { 'bg-primary text-white': range === t && !custom },
                  'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs'
                )}
                key={t}
                onClick={async () => {
                  await switchRange(t);
                  toggleDropdown(false);
                  toggleCustom(false);
                }}
              >
                {i18RangeTag[t]}
                {range === t && !custom && (
                  <div className="h-3.5 w-3.5 rounded-full bg-white">
                    <BiCheck className="text-sm text-primary" />
                  </div>
                )}
              </li>
            );
          })}
          <li
            className={classnames(
              'mb-2 flex h-8 w-[120px] cursor-pointer justify-between border py-2 pl-3 pr-2 text-xs',
              { 'bg-primary text-white': custom, 'mb-4': !custom }
            )}
            onClick={async () => {
              toggleCustom(true);
            }}
          >
            {t('analyze:custom')}
            {custom && (
              <div className="h-3.5 w-3.5 rounded-full bg-white">
                <BiCheck className="text-sm text-primary" />
              </div>
            )}
          </li>
        </div>
        <div
          className={classnames('h-10 bg-[#F7F7F7] px-4', { hidden: !custom })}
        >
          <DateRangePicker
            onClick={async (t) => {
              await switchRange(t);
              toggleDropdown(false);
            }}
          />
        </div>
      </ul>
    </div>
  );
};

export default NewDatePicker;
