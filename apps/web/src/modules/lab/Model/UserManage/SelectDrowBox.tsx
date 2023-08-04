import React, { PropsWithChildren, useState, useRef } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { CustomRadio, Select, SelectOption, Input } from '@oss-compass/ui';
import classNames from 'classnames';
import { useClickAway } from 'react-use';
import { BsFillCheckCircleFill } from 'react-icons/bs';

const SelectDrowBox: React.FC<
  PropsWithChildren<{
    rolesList?: string[];
    options?: { name: string; desc: string }[];
    cls?: string;
    onChange?: (value: string) => void;
    onShowDrowBox?: (value: boolean) => void;
  }>
> = ({ rolesList, options, cls, onChange, onShowDrowBox, children }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickAway(ref, () => {
    setOpen(false);
    onShowDrowBox && onShowDrowBox(false);
  });

  return (
    <div ref={ref} className="relative">
      <div
        onClick={() => {
          setOpen(!open);
          onShowDrowBox && onShowDrowBox(!open);
        }}
      >
        {children}
      </div>
      <div
        className={classNames(
          'absolute top-11 w-52 overflow-auto border border-solid border-slate-200 bg-white pt-1 text-sm text-slate-900  shadow  shadow-slate-200 outline-0',
          { hidden: !open }
        )}
      >
        <div className="h-6 py-1 pl-[14px] text-xs text-[#868690]">可多选</div>
        {options.map(({ name, desc }) => {
          return (
            <div
              onClick={() => {
                onChange(name);
              }}
              key={name}
              className="flex h-[60px]  cursor-pointer border-t border-[#eff0f0] py-3 pl-[14px] hover:bg-[#E7E7E7]"
            >
              <div
                className={classNames('mt-0.5 mr-2 flex ', [
                  rolesList.includes(name)
                    ? 'text-[#3a5bef]'
                    : 'text-[#939393]',
                ])}
              >
                <BsFillCheckCircleFill />
              </div>
              <div className="flex flex-col">
                <div className="font-medium text-[#000000]">{name}</div>
                <div className="mt-1 text-xs text-[#868690]">{desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SelectDrowBox;
