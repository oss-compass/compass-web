import React, { useState, useRef } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { rangeTags } from '@modules/analyze/constant';
import classnames from 'classnames';
import { useClickAway, useToggle } from 'react-use';
import useI18RangeTag from './useI18RangeTag';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';
import useSwitchRange from '@modules/analyze/components/NavBar/useSwitchRange';

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
    <div className="relative >md:hidden">
      <div className="flex h-10 items-center " onClick={() => toggleDropdown()}>
        <span>{range}</span>
        <BiCalendar className="ml-1 text-xl" />
      </div>
      <ul
        ref={ref}
        className={classnames(
          'absolute right-0 rounded bg-base-100 p-2 shadow',
          { hidden: !dropdownOpen }
        )}
      >
        {rangeTags.map((t) => {
          return (
            <li
              className={classnames(
                { 'bg-gray-200 ': range === t },
                'h-full w-32 cursor-pointer rounded-3xl py-2 px-2 text-center text-sm'
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
      </ul>
    </div>
  );
};

export default MobileDatePicker;
