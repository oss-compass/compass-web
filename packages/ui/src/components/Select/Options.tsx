import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import BaseOption, { OptionProps, OptionOwnerState } from '@mui/base/Option';
// import useIsDarkMode from '../shared/useIsDarkMode';

const getOptionColorClasses = ({
  selected,
  highlighted,
  disabled,
}: Partial<OptionOwnerState<number>>) => {
  let classes = '';
  if (disabled) {
    classes += 'text-slate-400 ';
  } else {
    if (selected) {
      classes += '!bg-primary !text-white ';
    } else if (highlighted) {
      classes += 'bg-slate-100  text-slate-900 ';
    }
    classes += 'hover:bg-slate-100  hover:text-slate-900';
  }
  return classes;
};

export const SelectOption = React.forwardRef<HTMLLIElement, OptionProps<any>>(
  (props, ref) => {
    return (
      <BaseOption
        ref={ref}
        {...props}
        slotProps={{
          root: ({ selected, highlighted, disabled }) => ({
            className: twMerge(
              `list-none p-2 mb-1 cursor-pointer last-of-type:border-b-0 ${getOptionColorClasses(
                { selected, highlighted, disabled }
              )}`
            ),
          }),
        }}
      />
    );
  }
);

SelectOption.displayName = 'SelectOption';
