import React, { useEffect, useState } from 'react';
import { useDatePickerContext } from '@modules/analyze/context';
import classnames from 'classnames';
import { quickSelectRange, timeRange } from '@modules/analyze/constant';

const DatePicker = () => {
  const [activeRange, setActiveRange] = useState('3M');
  const { update } = useDatePickerContext();

  return (
    <div className="flex h-8 items-center rounded-3xl border">
      {quickSelectRange.map((range) => {
        return (
          <div
            className={classnames(
              { 'bg-gray-100 ': activeRange === range },
              'flex h-full cursor-pointer items-center rounded-3xl px-4 text-sm'
            )}
            key={range}
            onClick={() => {
              setActiveRange(range);
              // @ts-ignore
              const { start, end } = timeRange[range];
              update({ startTime: start, endTime: end });
            }}
          >
            {range}
          </div>
        );
      })}
    </div>
  );
};

export default DatePicker;
