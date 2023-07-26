import React, { PropsWithChildren, forwardRef } from 'react';
import SelectBase, { SelectProps, SelectSlots } from '@mui/base/Select';
import useIsDarkMode from '../shared/useIsDarkMode';

export const Select = forwardRef(function Select<
  OptionValue,
  Multiple extends boolean
>(
  props: SelectProps<OptionValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { children } = props;
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <SelectBase
        ref={ref}
        slotProps={{
          root: ({ focusVisible, open }) => ({
            className: `text-sm box-border w-80 px-3 py-2  text-left bg-white  border border-solid border-[#ccc] text-slate-900  transition-all hover:bg-slate-50  outline-0  ${
              focusVisible ? 'border-[#ccc] shadow-outline-purple' : ''
            } ${
              open ? 'after:content-["▴"]' : 'after:content-["▾"]'
            } after:float-right`,
          }),
          listbox: {
            className: `text-sm p-1.5 my-1.5 w-80 overflow-auto outline-0 bg-white  border border-solid border-slate-200  text-slate-900  shadow shadow-slate-200 `,
          },
          popper: { className: `${isDarkMode ? 'dark' : ''} z-10` },
        }}
        {...props}
      >
        {children}
      </SelectBase>
    </div>
  );
}) as <OptionValue, Multiple extends boolean>(
  props: SelectProps<OptionValue, Multiple> &
    React.RefAttributes<HTMLUListElement>
) => JSX.Element;

export * from './Options';
