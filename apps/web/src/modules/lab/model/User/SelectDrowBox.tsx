import React, { PropsWithChildren, useState, useRef } from 'react';
import classNames from 'classnames';
import { useClickAway } from 'react-use';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

const SelectDrowBox: React.FC<
  PropsWithChildren<{
    roles: {
      canExecute: boolean;
      canUpdate: boolean;
    };
    options?: { name: string; desc: string; id: string; disable?: boolean }[];
    onChange?: (id: string) => void;
    onShowDrowBox?: (value: boolean) => void;
  }>
> = ({ roles, options, onChange, onShowDrowBox, children }) => {
  const { t } = useTranslation();
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
          'absolute w-52 overflow-auto border border-solid border-slate-200 bg-white pt-1 text-sm text-slate-900  shadow  shadow-slate-200 outline-0',
          { hidden: !open }
        )}
      >
        <div className="h-6 py-1 pl-[14px] text-xs text-[#868690]">
          {t('lab:user.multiple')}
        </div>
        {options.map(({ name, desc, id, disable }) => {
          if (disable) {
            return (
              <div
                key={id}
                className="flex cursor-not-allowed border-t border-[#eff0f0] py-3 pl-[14px] hover:bg-[#E7E7E7]"
              >
                <div className="mt-0.5 mr-2 flex w-[14px] flex-shrink-0 text-[#939393]">
                  <BsFillCheckCircleFill />
                </div>
                <div className="flex flex-col">
                  <div className="font-medium text-[#000000]">{name}</div>
                  <div className="mt-1 text-xs text-[#868690]">{desc}</div>
                </div>
              </div>
            );
          } else {
            return (
              <div
                onClick={() => {
                  onChange(id);
                }}
                key={id}
                className="flex cursor-pointer border-t border-[#eff0f0] py-3 pl-[14px] hover:bg-[#E7E7E7]"
              >
                <div className="mt-0.5 mr-2 flex w-[14px] flex-shrink-0 text-[#3a5bef]">
                  {roles[id] && <BsFillCheckCircleFill />}
                </div>
                <div className="flex flex-col">
                  <div className="font-medium text-[#000000]">{name}</div>
                  <div className="mt-1 text-xs text-[#868690]">{desc}</div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default SelectDrowBox;
