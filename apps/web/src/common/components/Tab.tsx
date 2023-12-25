import React from 'react';
import classnames from 'classnames';
import Tooltip from '@common/components/Tooltip';

const Tab: React.FC<{
  options: {
    value: string;
    label: string;
    disable?: boolean;
    tabCls?: string;
    tooltip?: string;
  }[];
  value: string;
  onChange: (v: string) => void;
}> = ({ options, value, onChange }) => (
  <div className="flex overflow-hidden ">
    <div className="flex flex-wrap rounded-md border border-[#DEE4EC] bg-[#f6f6f6] p-1 md:p-0">
      {options.map((option) => {
        return (
          <div
            key={option.label}
            className={classnames(
              'text-steel cursor-pointer px-3 py-1 text-sm md:px-2',
              option?.tabCls,
              { 'rounded bg-white text-black shadow': option.value === value },
              { 'cursor-not-allowed text-[#ABABAB]': option.disable === true }
            )}
            onClick={() => !option.disable && onChange(option.value)}
          >
            <a>
              <Tooltip arrow title={option.tooltip} placement="right">
                <div>{option.label}</div>
              </Tooltip>
            </a>
          </div>
        );
      })}
    </div>
  </div>
);

export default Tab;
