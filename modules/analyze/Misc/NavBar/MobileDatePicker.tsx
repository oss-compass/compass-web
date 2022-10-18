import React, { useState, useRef } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { rangeTags, timeRange } from '@modules/analyze/constant';
import classnames from 'classnames';
import { useClickAway, useToggle } from 'react-use';
import qs from 'query-string';
import { useRouter } from 'next/router';
import useQueryDateRange from '@modules/analyze/hooks/useQueryDateRange';

const MobileDatePicker = () => {
  const route = useRouter();
  const [dropdownOpen, toggleDropdown] = useToggle(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    toggleDropdown(false);
  });

  const { range } = useQueryDateRange();

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
              onClick={() => {
                const result = qs.parse(window.location.search);
                result.range = t;
                route.replace(`/analyze?${qs.stringify(result)}`);
                toggleDropdown(false);
              }}
            >
              {t}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileDatePicker;
