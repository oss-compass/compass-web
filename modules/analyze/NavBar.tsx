import React, { useContext, useState } from 'react';
import { useTimePickerContext } from '@modules/analyze/context';
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

const Compares = () => {
  return (
    <div className="flex">
      <div>React</div>
      <div className="px-2 text-slate-300">vs</div>
      <div>Vue</div>
    </div>
  );
};
const TimePicker = () => {
  const [activeRange, setActiveRange] = useState('3M');
  const { value, update } = useTimePickerContext();
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

const NavBar = () => {
  return (
    <nav className="flex h-14 flex-shrink-0 items-center justify-between border-b border-t px-6">
      <Compares />
      <TimePicker />
    </nav>
  );
};

export default NavBar;
