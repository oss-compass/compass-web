import React from 'react';
import classnames from 'classnames';

const Tab: React.FC<{
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="flex">
    <div className="flex rounded-md border border-[#DEE4EC] bg-[#f6f6f6] p-1">
      {options.map((option) => {
        return (
          <div
            key={option.label}
            className={classnames(
              'cursor-pointer px-4 py-1 text-sm text-gray58 ',
              { 'rounded bg-white text-black shadow': option.value === value }
            )}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </div>
        );
      })}
    </div>
  </div>
);

export default Tab;
