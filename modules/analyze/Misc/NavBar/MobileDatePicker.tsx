import React, { useState, useRef } from 'react';
import { BiCalendar } from 'react-icons/bi';
import { useDatePickerContext } from '@modules/analyze/context';
import { quickSelectRange, timeRange } from '@modules/analyze/constant';
import classnames from 'classnames';
import { useClickAway, useToggle } from 'react-use';

const MobileDatePicker = () => {
  const [show, toggle] = useToggle(false);
  const ref = useRef(null);
  useClickAway(ref, () => {
    toggle(false);
  });

  const [activeRange, setActiveRange] = useState('3M');
  const { update } = useDatePickerContext();

  return (
    <div className="relative >md:hidden">
      <div className="flex h-10 items-center " onClick={() => toggle()}>
        <span>{activeRange}</span>
        <BiCalendar className="ml-1 text-xl" />
      </div>
      <ul
        ref={ref}
        className={classnames(
          'absolute right-0 rounded bg-base-100 p-2 shadow',
          { hidden: !show }
        )}
      >
        {quickSelectRange.map((range) => {
          return (
            <li
              className={classnames(
                { 'bg-gray-100 ': activeRange === range },
                'h-full w-32 cursor-pointer rounded-3xl py-2 px-2 text-center text-sm'
              )}
              key={range}
              onClick={() => {
                setActiveRange(range);
                // @ts-ignore
                const { start, end } = timeRange[range];
                update({ startTime: start, endTime: end });

                toggle(false);
              }}
            >
              {range}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileDatePicker;
