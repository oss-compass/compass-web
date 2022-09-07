import React, { useState } from 'react';
import { useDatePickerContext } from '@modules/analyze/context';
import classnames from 'classnames';

const quickSelectRange = [
  '3M',
  '6M',
  '1Y',
  '2Y',
  '3Y',
  '5Y',
  '10Y',
  'Since 2000',
];

const DatePicker = () => {
  const [activeRange, setActiveRange] = useState('3M');
  const { value, update } = useDatePickerContext();
  const { startTime, endTime } = value;

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
              update({ startTime: '222', endTime: '1111' });
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
